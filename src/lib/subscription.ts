import { SubscriptionSDK } from '@jackluson/subscription-sdk';


export const SDK = new SubscriptionSDK({
  appKey: process.env.APPKEY,
  baseUrl: process.env.SUBSCRIBE_URL,
});
