import { CrawlerSDK } from '../core';
import { PathUtil } from '../paths';
import ExpiryMap from 'expiry-map';
import { pMemoizeDecorator } from '../../p-memoize';

export interface SecurityResponse {
  result: any;
  code: number;
  message: string;
  success: boolean;
  version: string;
}

enum SecurityScopeEnum {
  terms = 'terms',
}

export const SecurityCache = new ExpiryMap(3600 * 8 * 1000);

export class Security {


  constructor(private core: CrawlerSDK) {}

  static cachePrefix = 'securities-';

  static cache = SecurityCache

  commonHeaders = {
    'Host': 'datacenter.eastmoney.com',
    'Origin': 'https://emweb.eastmoney.com',
    'Referer': 'https://emweb.eastmoney.com/',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36 Choice/9.4.0.1 (Connect:hz; Skin:Black)'
  }

  getInfoByScope(scope: string, ...args: any[]) {
    if (scope === SecurityScopeEnum.terms) {
      console.log("args", args);
      return this.getSecurities(args[0], args[1]);
    }
    throw new Error(`Unsupported scope: ${scope}`);
  }
  
  @pMemoizeDecorator({
    cacheKey: (arguments_: unknown[]) => Security.cachePrefix + arguments_[0],
    cache: SecurityCache,
    shouldCache: (value:any) => {return value && value.success === true && value.result !== null && value.code === 0},
  })
  async getSecurities(code: string, market?: 'SH' | 'SZ') {
    const path = PathUtil.GetSecurities();
    const realMarket = market || code.startsWith('11') ? 'SH' : 'SZ';
    const searchParams = {
      reportName:'RPT_BOND_CB_KEYFOCUS',
      columns: "SECUCODE,SECURITY_CODE,BOND_NAME_ABBR,SECURITY_INNER_CODE,DUR_SDATE,DUR_EDATE,TRANSFER_SDATE,TRANSFER_EDATE,REPAIR_SDATE,REPAIR_EDATE,REDEEM_SDATE,REDEEM_EDATE,RESALE_SDATE,RESALE_EDATE,SELLBACK_TRIGGER,SELLBACK_PROCESS,REDEEM_TRIGGER,REDEEM_PROCESS,REPAIR_TRIGGER,REPAIR_PROCESS,TRANSFER_PRICE,RESALE_TRIGGER_PRICE,REDEEM_TRIGGER_PRICE,TRANSFER_TRIGGER_PRICE,LATEST_RESALE_DATE,LATEST_REDEEM_DATE",
      quoteColumns: "",
      filter: `(SECUCODE="${code}.${realMarket}")`,
      sortTypes: '',
      sortColumns: '',
      pageNumber: 1,
      pageSize: '',
      source: 'ZZF10',
      client: 'PC'
    }
    const data = await this.core.request(path, {
      method: 'get',
      headers: this.commonHeaders,
      searchParams: searchParams
    }, true);
    console.log('Fetched securities data:', data);
    return data as SecurityResponse;
  }
}
