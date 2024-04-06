import { Method } from '@/shared/const/method';
import { queryStringify } from '@/shared/utils/query-string';

type Options = {
  method: Method;
  timeout?: number;
  data?: unknown;
  headers?: Record<string, string>;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export default class HTTPTransport {
  private readonly HOST = 'https://ya-praktikum.tech/api/v2';

  private readonly apiUrl: string = '';

  constructor(apiPath: string) {
    this.apiUrl = `${this.HOST}${apiPath}`;
  }
  get(url: string, options: OptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: Method.Get });
  }

  post(url: string, options: OptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: Method.Post });
  }

  put(url: string, options: OptionsWithoutMethod = {}, binary?: boolean) {
    return this.request(url, { ...options, method: Method.Put }, 5000, binary);
  }

  delete(url: string, options: OptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: Method.Delete });
  }

  request = (
    url: string,
    options: Options,
    timeout = 5000,
    binary?: boolean
  ): Promise<XMLHttpRequest> => {
    const { method, data } = options;
    return new Promise((resolve, reject) => {
      if (method === Method.Get && data) {
        url = `${this.apiUrl}?${queryStringify(data as Record<string, unknown>)}`;
      } else {
        url = `${this.apiUrl}${url}`;
      }

      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);

      xhr.withCredentials = true;

      if (!binary) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.onload = function () {
        resolve(xhr);
      };
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;

      if (method === Method.Get || !data) {
        xhr.send();
      } else if (binary) {
        xhr.send(data as Document | XMLHttpRequestBodyInit | null | undefined);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
