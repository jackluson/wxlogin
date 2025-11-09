import { Options } from 'ky';
import { request } from './request';
import { SDKOptions } from './type';
import { Security } from './modules/securites';
// import {ProxyAgent} from 'undici';

// const proxyAgent = new ProxyAgent('http://localhost:8888');


export class CrawlerSDK {
  private baseUrl: string;

  security!: Security;

  /**
   * 初始化订阅SDK
   * @param options - 配置选项
   */
  constructor(options: SDKOptions) {
    const { baseUrl } = options;
    this.baseUrl = baseUrl;
    this.init();
  }

  init() {
    this.security = new Security(this);
  }

  async request(path: string, options: Options, random?:boolean) {
    let url = `${this.baseUrl}${path}`;
    const headers = {
      ...options.headers,
    };
    let searchParams: Options['searchParams'] = options.searchParams;
    if (
      searchParams &&
      typeof searchParams === 'object' &&
      !Array.isArray(searchParams) &&
      !(searchParams instanceof URLSearchParams)
    ) {
      const tempSearchParams: Record<string, string | number | boolean | undefined> = {};
      const sp = searchParams as Record<string, string | number | boolean | undefined>;
      for (const key in sp) {
        if (sp[key] !== undefined) {
          tempSearchParams[key] = sp[key];
        }
      }
      // searchParams = tempSearchParams;
      searchParams = new URLSearchParams(searchParams as Record<string, string>);
    }
    if(random) {
      url = this.appendRandom(url);
    }
    const newOptions = { ...options, headers, searchParams };
    return request(url, newOptions).json();
  }

  appendRandom(url:string) {
    const v = Math.random().toString().replace('.', '');
    if (url.includes('?')) {
      return `${url}&v=${v}`;
    } else {
      return `${url}?v=${v}`;
    }
  }
}
