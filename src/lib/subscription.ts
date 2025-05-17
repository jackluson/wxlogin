import { SubscriptionSDK } from '@imflow/subscription-sdk';


export const SDK = new SubscriptionSDK({
  appKey: 'anchor-arbitrage-toolbox',
  baseUrl: process.env.SUBSCRIBE_URL,
});