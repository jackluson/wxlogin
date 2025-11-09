import ky from 'ky';

// import {ProxyAgent} from 'undici';

// const proxyAgent = new ProxyAgent('http://localhost:8888');

export const request = ky.extend({
  // dispatcher: proxyAgent,

  hooks: {
    beforeRequest: [
      (request, ...args: any[]) => {
        // console.log("request", request.headers)
        // console.log('beforeRequest->args', args);
      },
    ],
    afterResponse: [
      (...args: any[]) => {
        // console.log('afterResponse->args', args[2]);
      },
    ],
  },
});
