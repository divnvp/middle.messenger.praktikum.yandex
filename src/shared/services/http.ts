import { Method } from '@/shared/const/method';
import { queryStringify } from '@/shared/utils/query-string';

type Options = {
  method: Method;
  timeout?: number;
  data?: Record<string, unknown>;
  headers?: Record<string, string>;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

class HTTPTransport {
  get(url: string, options: OptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: Method.Get });
  }

  post(url: string, options: OptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: Method.Post });
  }

  put(url: string, options: OptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: Method.Put });
  }

  delete(url: string, options: OptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: Method.Delete });
  }

  request(url: string, options: Options = { method: Method.Get }) {
    const { method, headers, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (method === Method.Get && data) {
        url = `${url}?${queryStringify(data)}`;
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

// Строка будет убрана после того, как HTTPTransport будет где-либо использован
console.log(HTTPTransport);
