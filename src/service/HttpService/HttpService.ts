type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  data?: Record<string, unknown> | string | null;
  timeout?: number;
}

interface QueryStringData {
  [key: string]: string | number | boolean;
}

enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

function queryStringify(data: QueryStringData): string {
  if (typeof data !== "object" || data === null) {
    throw new Error("Data must be an object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    const value = encodeURIComponent(data[key]);
    return `${result}${key}=${value}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

export default class HTTPService {
  get<T = unknown>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: METHODS.GET });
  }

  post<T = unknown>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: METHODS.POST });
  }

  put<T = unknown>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: METHODS.PUT });
  }

  delete<T = unknown>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: METHODS.DELETE });
  }

  request<T = unknown>(
    url: string,
    options: RequestOptions = {},
    timeout = 5000
  ): Promise<T> {
    const { headers = {}, method, data } = options;

    return new Promise<T>((resolve, reject) => {
      if (!method) {
        reject(new Error("No method"));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data && typeof data === "object"
          ? `${url}${queryStringify(data as QueryStringData)}`
          : url
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        try {
          const response = JSON.parse(xhr.responseText) as T;
          resolve(response);
        } catch (e) {
          reject(e);
        }
      };

      xhr.onabort = () => reject(new Error("Request aborted"));
      xhr.onerror = () => reject(new Error("Network error"));
      xhr.ontimeout = () => reject(new Error("Request timed out"));

      xhr.timeout = timeout;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(typeof data === "string" ? data : JSON.stringify(data));
      }
    });
  }
}
