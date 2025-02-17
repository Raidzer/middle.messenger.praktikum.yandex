enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface RequestOptions {
  method?: METHODS;
  headers?: Record<string, string>;
  data?: unknown;
  timeout?: number;
}

interface QueryStringData {
  [key: string]: string | number | boolean;
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

type HTTPMethod = (
  url: string,
  options?: RequestOptions
) => Promise<{ data: unknown; status: number }>;
export default class HTTPService {
  private _endpoint: string;
  private _baseUrl: string = "https://ya-praktikum.tech/api/v2";

  constructor(endpoint: string) {
    this._endpoint = this._baseUrl + endpoint;
  }

  get: HTTPMethod = (url, options = {}) => {
    return this.request(this._endpoint + url, {
      ...options,
      method: METHODS.GET,
    });
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(this._endpoint + url, {
      ...options,
      method: METHODS.POST,
    });
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(this._endpoint + url, {
      ...options,
      method: METHODS.PUT,
    });
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(this._endpoint + url, {
      ...options,
      method: METHODS.DELETE,
    });
  };

  request<T = unknown>(
    url: string,
    options: RequestOptions = {},
    timeout = 5000
  ): Promise<{ data: T; status: number }> {
    const { method, data } = options;
    return new Promise<{ data: T; status: number }>((resolve, reject) => {
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
          : url,
        true
      );

      xhr.onload = function () {
        const status = xhr.status;

        const contentType = xhr.getResponseHeader("Content-Type");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let responseData: any;

        if (contentType && contentType.includes("application/json")) {
          try {
            responseData = JSON.parse(xhr.responseText) as T;
          } catch (e) {
            reject(new Error("Failed to parse JSON"));
            return e;
          }
        } else {
          responseData = xhr.responseText;
        }

        if (status >= 200 && status < 300) {
          resolve({ data: responseData, status });
        } else {
          reject({ status, message: "Request failed", data: responseData });
        }
      };

      xhr.onabort = () => reject(new Error("Request aborted"));
      xhr.onerror = () => reject(new Error("Network error"));
      xhr.ontimeout = () => reject(new Error("Request timed out"));

      xhr.timeout = timeout;
      xhr.withCredentials = true;

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(typeof data === "string" ? data : JSON.stringify(data));
      }
    });
  }
}
