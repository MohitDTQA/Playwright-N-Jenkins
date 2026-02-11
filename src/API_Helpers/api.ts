import * as _ from '@Index';
import { generateRandomUser } from './RandomUser';

export type ApiHelperOptions = {
  baseURL?: string;
  headers?: Record<string, string>;
};

export type RequestOptions = {
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
};

export class Api {
  private readonly request: _.APIRequestContext;
  private readonly baseURL: string;
  private readonly defaultHeaders: Record<string, string>;

  constructor(request: _.APIRequestContext, options: ApiHelperOptions = {}) {
    this.request = request;
    this.baseURL =
      options.baseURL ?? process.env.API_URL!;

    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    };
  }

  async get(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<_.APIResponse> {
    return this.request.get(`${this.baseURL}${endpoint}`, {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      params: options.params,
    });
  }

  async post<T = unknown>(
    endpoint: string,
    data?: T,
    options: RequestOptions = {}
  ): Promise<_.APIResponse> {
    return this.request.post(`${this.baseURL}${endpoint}`, {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      data,
      params: options.params,
    });
  }

  async put<T = unknown>(
    endpoint: string,
    data?: T,
    options: RequestOptions = {}
  ): Promise<_.APIResponse> {
    return this.request.put(`${this.baseURL}${endpoint}`, {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      data,
      params: options.params,
    });
  }

  async delete(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<_.APIResponse> {
    return this.request.delete(`${this.baseURL}${endpoint}`, {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      params: options.params,
    });
  }
}


export class CheckStatus {
  static async ok(response: _.APIResponse, expectedStatus = 200): Promise<void> {
    _.expect(response.status()).toBe(expectedStatus);

    const body = await response.json();
    _.expect(body).toBeDefined();

    return body;
  }

}
