/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const ApiResponse = $root.ApiResponse = (() => {

    /**
     * Properties of an ApiResponse.
     * @exports IApiResponse
     * @interface IApiResponse
     * @property {boolean|null} [success] ApiResponse success
     * @property {number|Long|null} [code] ApiResponse code
     * @property {string|null} [message] ApiResponse message
     * @property {string|null} [result] ApiResponse result
     */

    /**
     * Constructs a new ApiResponse.
     * @exports ApiResponse
     * @classdesc Represents an ApiResponse.
     * @implements IApiResponse
     * @constructor
     * @param {IApiResponse=} [properties] Properties to set
     */
    function ApiResponse(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ApiResponse success.
     * @member {boolean} success
     * @memberof ApiResponse
     * @instance
     */
    ApiResponse.prototype.success = false;

    /**
     * ApiResponse code.
     * @member {number|Long} code
     * @memberof ApiResponse
     * @instance
     */
    ApiResponse.prototype.code = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ApiResponse message.
     * @member {string} message
     * @memberof ApiResponse
     * @instance
     */
    ApiResponse.prototype.message = "";

    /**
     * ApiResponse result.
     * @member {string} result
     * @memberof ApiResponse
     * @instance
     */
    ApiResponse.prototype.result = "";

    /**
     * Creates a new ApiResponse instance using the specified properties.
     * @function create
     * @memberof ApiResponse
     * @static
     * @param {IApiResponse=} [properties] Properties to set
     * @returns {ApiResponse} ApiResponse instance
     */
    ApiResponse.create = function create(properties) {
        return new ApiResponse(properties);
    };

    /**
     * Encodes the specified ApiResponse message. Does not implicitly {@link ApiResponse.verify|verify} messages.
     * @function encode
     * @memberof ApiResponse
     * @static
     * @param {IApiResponse} message ApiResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ApiResponse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.success != null && Object.hasOwnProperty.call(message, "success"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
        if (message.code != null && Object.hasOwnProperty.call(message, "code"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.code);
        if (message.message != null && Object.hasOwnProperty.call(message, "message"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.message);
        if (message.result != null && Object.hasOwnProperty.call(message, "result"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.result);
        return writer;
    };

    /**
     * Encodes the specified ApiResponse message, length delimited. Does not implicitly {@link ApiResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ApiResponse
     * @static
     * @param {IApiResponse} message ApiResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ApiResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ApiResponse message from the specified reader or buffer.
     * @function decode
     * @memberof ApiResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ApiResponse} ApiResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ApiResponse.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ApiResponse();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.success = reader.bool();
                    break;
                }
            case 2: {
                    message.code = reader.int64();
                    break;
                }
            case 3: {
                    message.message = reader.string();
                    break;
                }
            case 5: {
                    message.result = reader.string();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an ApiResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ApiResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ApiResponse} ApiResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ApiResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ApiResponse message.
     * @function verify
     * @memberof ApiResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ApiResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.success != null && message.hasOwnProperty("success"))
            if (typeof message.success !== "boolean")
                return "success: boolean expected";
        if (message.code != null && message.hasOwnProperty("code"))
            if (!$util.isInteger(message.code) && !(message.code && $util.isInteger(message.code.low) && $util.isInteger(message.code.high)))
                return "code: integer|Long expected";
        if (message.message != null && message.hasOwnProperty("message"))
            if (!$util.isString(message.message))
                return "message: string expected";
        if (message.result != null && message.hasOwnProperty("result"))
            if (!$util.isString(message.result))
                return "result: string expected";
        return null;
    };

    /**
     * Creates an ApiResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ApiResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ApiResponse} ApiResponse
     */
    ApiResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.ApiResponse)
            return object;
        let message = new $root.ApiResponse();
        if (object.success != null)
            message.success = Boolean(object.success);
        if (object.code != null)
            if ($util.Long)
                (message.code = $util.Long.fromValue(object.code)).unsigned = false;
            else if (typeof object.code === "string")
                message.code = parseInt(object.code, 10);
            else if (typeof object.code === "number")
                message.code = object.code;
            else if (typeof object.code === "object")
                message.code = new $util.LongBits(object.code.low >>> 0, object.code.high >>> 0).toNumber();
        if (object.message != null)
            message.message = String(object.message);
        if (object.result != null)
            message.result = String(object.result);
        return message;
    };

    /**
     * Creates a plain object from an ApiResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ApiResponse
     * @static
     * @param {ApiResponse} message ApiResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ApiResponse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.success = false;
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.code = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.code = options.longs === String ? "0" : 0;
            object.message = "";
            object.result = "";
        }
        if (message.success != null && message.hasOwnProperty("success"))
            object.success = message.success;
        if (message.code != null && message.hasOwnProperty("code"))
            if (typeof message.code === "number")
                object.code = options.longs === String ? String(message.code) : message.code;
            else
                object.code = options.longs === String ? $util.Long.prototype.toString.call(message.code) : options.longs === Number ? new $util.LongBits(message.code.low >>> 0, message.code.high >>> 0).toNumber() : message.code;
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = message.message;
        if (message.result != null && message.hasOwnProperty("result"))
            object.result = message.result;
        return object;
    };

    /**
     * Converts this ApiResponse to JSON.
     * @function toJSON
     * @memberof ApiResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ApiResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for ApiResponse
     * @function getTypeUrl
     * @memberof ApiResponse
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    ApiResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/ApiResponse";
    };

    return ApiResponse;
})();

export { $root as default };
