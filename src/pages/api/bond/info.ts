import { IResponseInfoError, IResponseInfoResult, withEncode } from '@/lib/encode';
import { CrawlerSDK } from '@/modules/crawler';
import type { NextApiRequest, NextApiResponse } from 'next';

const baseUrl = 'https://datacenter.eastmoney.com';
const sdk = new CrawlerSDK({
  baseUrl,
});

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<IResponseInfoResult | IResponseInfoError> {
  if (req.method !== 'GET') {
    return  { status: 405, error: 'Method Not Allowed' }
  }
  const code = req.query.code as string;
  const scope = req.query.scope as string || 'bond';
  const scopes = scope.split(',');
  console.log("scopes", scopes);
  if (!code && scopes.length === 0) {
    return { status: 400, error: 'Bond code is required' };
  }
  const resultMap: Record<string,any> = {};
  for (const sc of scopes) {
    const result = await sdk.security.getInfoByScope(sc, code);
    if(result?.code !== 0) {
      return {
        code: result.code,
        success: false,
        message: 'Failed to fetch bond info',
      }
    }
    const data = result.result.data[0];
    resultMap[sc] = data;
  }
  const response = {
    success: true,
    code: 0,
    result: JSON.stringify(resultMap),
  }
  return response;
}

export default withEncode(handler);
