import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of an ApiResponse. */
export interface IApiResponse {

    /** ApiResponse success */
    success?: (boolean|null);

    /** ApiResponse code */
    code?: (number|Long|null);

    /** ApiResponse message */
    message?: (string|null);

    /** ApiResponse result */
    result?: (string|null);
}

/** Represents an ApiResponse. */
export class ApiResponse implements IApiResponse {

    /**
     * Constructs a new ApiResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: IApiResponse);

    /** ApiResponse success. */
    public success: boolean;

    /** ApiResponse code. */
    public code: (number|Long);

    /** ApiResponse message. */
    public message: string;

    /** ApiResponse result. */
    public result: string;

    /**
     * Creates a new ApiResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ApiResponse instance
     */
    public static create(properties?: IApiResponse): ApiResponse;

    /**
     * Encodes the specified ApiResponse message. Does not implicitly {@link ApiResponse.verify|verify} messages.
     * @param message ApiResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IApiResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ApiResponse message, length delimited. Does not implicitly {@link ApiResponse.verify|verify} messages.
     * @param message ApiResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IApiResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an ApiResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ApiResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ApiResponse;

    /**
     * Decodes an ApiResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ApiResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ApiResponse;

    /**
     * Verifies an ApiResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an ApiResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ApiResponse
     */
    public static fromObject(object: { [k: string]: any }): ApiResponse;

    /**
     * Creates a plain object from an ApiResponse message. Also converts values to other types if specified.
     * @param message ApiResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ApiResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ApiResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for ApiResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}
