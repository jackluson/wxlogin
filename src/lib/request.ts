import ky from 'ky';

export const request = ky.extend({
  fetch: fetch,
  hooks: {
    beforeRequest: [
      (...args: any[]) => {
        // console.log('beforeRequest->args', args);
      },
    ],
    afterResponse: [
      (...args: any[]) => {
        // console.log('afterResponse->args', args.length);
      },
    ],
  },
});
