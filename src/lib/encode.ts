import { ApiResponse } from '@/modules/proto';
import { NextApiRequest, NextApiResponse } from 'next';
import pako from 'pako';

async function concatUint8Arrays(uint8arrays: ArrayBuffer[]) {
  const blob = new Blob(uint8arrays);
  const buffer = await blob.arrayBuffer();
  return new Uint8Array(buffer);
}


/**
 * Compress a string into a Uint8Array.
 * @param byteArray
 * @param method
 * @returns Promise<ArrayBuffer>
 */
export const compress = async (byteArray: Uint8Array, method: CompressionFormat = 'gzip'): Promise<Uint8Array> => {
  const compressedBuf = pako.deflate(byteArray);

  const stream = new Blob([compressedBuf]).stream();
  // const compressedBuf: Uint8Array = new TextEncoder().encode(string);
  const compressedStream = stream.pipeThrough(new CompressionStream(method)) as unknown as ArrayBuffer[];
  const chunks: ArrayBuffer[] = [];
  for await (const chunk of compressedStream) {
    chunks.push(chunk);
  }
  return await concatUint8Arrays(chunks);
};

/**
 * Compress a string into a Uint8Array.
 * @param byteArray
 * @param method
 * @returns Promise<ArrayBuffer>
 */
export const compressBuffer = async (byteArray: Uint8Array, method: CompressionFormat = 'gzip', useCompression = true): Promise<ArrayBuffer> => {
  const compressedBuf = pako.deflate(byteArray, {
    level: 7,
    memLevel: 8,
    strategy: 1
  });

  if(useCompression) {
    const stream = new Blob([compressedBuf]).stream();
    const compressedStream = stream.pipeThrough(new CompressionStream(method)) as unknown as ArrayBuffer[];
    const chunks: ArrayBuffer[] = [];
    for await (const chunk of compressedStream) {
      chunks.push(chunk);
    }
    const buffer = await concatUint8Arrays(chunks);
    return Buffer.from(buffer)
    // const compressedBuf: Uint8Array = new TextEncoder().encode(string);
    // const buffer = await blob.arrayBuffer();
  } else {
    return Buffer.from(compressedBuf)
  }
};

export interface IResponseInfoResult {
  success: boolean;
  code: number;
  message?: string;
  result?: string;
}

export interface IResponseInfoError {
  status: number;
  error: string;
}

export function withEncode(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<IResponseInfoResult | IResponseInfoError>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const responseInfo =  await handler(req, res);
      if((responseInfo as IResponseInfoError).status) {
        const temp = responseInfo as IResponseInfoError
        return res.status(temp.status).json({ error: temp.error });``
      }
      const temp = responseInfo as IResponseInfoResult
      const invalid = ApiResponse.verify(responseInfo);
      const statusCode = temp.code === 0 && temp.success ? 200 : 500
      if (invalid) {
        console.error('verify error try return json')
        return res.status(statusCode).json(temp);
        // return res.status(500).json({ error: 'Internal Server Error(verify error)' });
      } else {
        const message = ApiResponse.create(temp);
        const buffer = ApiResponse.encode(message).finish();
        console.log("buffer", buffer, buffer.length);
        const nonce = Math.random()
        res.setHeader('Content-Nonce', nonce > 0.5 ? 1 : 0)
        const str = await compressBuffer(buffer, 'gzip', nonce > 0.5)
        console.log('CompressionStr', str, str.byteLength)
        res.setHeader('Content-Type', 'application/octet-stream');
        return res.status(statusCode).send(str);
      }
    } catch (error) {
      console.error('Auth error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
} 
