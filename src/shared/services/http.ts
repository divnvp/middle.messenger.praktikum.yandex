import { DocumentOrRequestBodyOrNull } from '../models/types';
import { HOST } from '../const/api';
import { Method } from '../const/method';
import { queryStringify } from '../utils/query-string';

type Options = {
  method: Method;
  timeout?: number;
  data?: unknown;
  headers?: Record<string, string>;
};

export class HTTPTransport {
  apiUrl: string;

  constructor(apiPath: string) {
    this.apiUrl = `${HOST}${apiPath}`;
  }

  get(url: string, data?: unknown) {
    return this.request(url, {
      data,
      method: Method.Get
    });
  }

  put(url: string, data: unknown) {
    return this.request(url, {
      data,
      method: Method.Put
    });
  }

  post(url: string, data?: unknown) {
    return this.request(url, {
      data,
      method: Method.Post
    });
  }

  delete(url: string, data: unknown) {
    return this.request(url, {
      data,
      method: Method.Delete
    });
  }

  request = (url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> => {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      if (method === Method.Get && data) {
        url = `${this.apiUrl}?${queryStringify(data as Record<string, unknown>)}`;
      } else {
        url = `${this.apiUrl}${url}`;
      }

      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);

      xhr.onload = function () {
        resolve(xhr);
      };

      this.setHeaders(data, xhr);

      xhr.responseType = 'json';
      xhr.withCredentials = true;

      xhr.ontimeout = reject;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;

      if (data instanceof FormData) {
        xhr.send(data as DocumentOrRequestBodyOrNull);
        return;
      }

      if (method === Method.Get || !data) {
        xhr.send();
        return;
      }

      xhr.send(JSON.stringify(data));
    });
  };

  private setHeaders(data: unknown, xhr: XMLHttpRequest) {
    if (!(data instanceof FormData)) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }
  }
}
