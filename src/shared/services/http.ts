import { Method } from '@/shared/const/method';
import { queryStringify } from '@/shared/utils/query-string';

type Options = {
  method: Method;
  timeout?: number;
  data?: unknown;
  headers?: Record<string, string>;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

declare const HOST = 'ya-praktikum.tech/api/v2';

export default class HTTPTransport {
  private apiUrl = '';

  constructor(localApiUrl: string) {
    this.apiUrl = `${HOST}${localApiUrl}`;
  }

  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: Method.Get });
  }

  post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: Method.Post });
  }

  put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: Method.Put });
  }

  delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: Method.Delete });
  }

  request(url: string, options: Options = { method: Method.Get }): Promise<XMLHttpRequest> {
    const { method, headers, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (method === Method.Get && data) {
        url = `${this.apiUrl}?${queryStringify(data as Record<string, unknown>)}`;
      } else {
        url = this.apiUrl;
      }

      if (headers) {
        for (const header of Object.entries(headers)) {
          xhr.setRequestHeader(header[0], header[1]);
        }
      }

      xhr.open(method, url);

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === Method.Get || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
