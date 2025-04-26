import ExpiryMap from "expiry-map";

const cache = new ExpiryMap<string, any>(1000 * 60 * 5); // 5 minutes

export function setCache(key: string, value: any) {
  cache.set(key, value);
}

export function getCache(key: string) {
  return cache.get(key);
}