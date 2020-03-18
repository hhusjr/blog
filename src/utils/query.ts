import APIConfig from '../config/api.config';
export type QueriedData = {
  code: number;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export enum PARAMS_TO {
  BODY = 'body',
  QUERY = 'query',
  HEADER = 'header'
}

export type QueryOption = {
  url: string,
  method: 'GET'|'POST',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>,
  to?: PARAMS_TO,
}

export default async function query(option: QueryOption): Promise<QueriedData> {
  const url = new URL('http://a');
  url.protocol = APIConfig.https ? 'https:' : 'http:';
  url.hostname = APIConfig.host;
  url.port = APIConfig.port.toString();
  url.pathname = option.url;
  if (option.to === PARAMS_TO.QUERY && option.params) {
    Object.entries(option.params).forEach(([k, v]) => {
      url.searchParams.append(k, v);
    });
  }
  const res = await fetch(url.toString(), {
    method: option.method,
    credentials: 'include',
    mode: 'cors',
    cache: 'no-cache',
    headers: (option.to === PARAMS_TO.HEADER && option.params) ? option.params : undefined,
    body: (option.to === PARAMS_TO.BODY && option.params) ? JSON.stringify(option.params) : undefined
  });
  return await res.json()
}