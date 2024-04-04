import { API_URL } from './config'

// Extends the return of the HTTPError class
class HTTPError<T = unknown> extends Error {
  readonly response: T;
  readonly status: number;
  readonly statusText: string;

  constructor(status: number, statusText: string, response: any) {
    super(statusText);
    this.status = status;
    this.statusText = statusText;
    this.response = response;
  }
}

const createQuery =
  (apiURL: RequestInfo | URL = '', baseInit?: RequestInit) =>
    <TResponse = unknown>(url: RequestInfo | URL, init?: RequestInit) =>
      fetch(`${apiURL}${url}`, { ...baseInit, ...init }).then(async (res) => {
        const response = await res.json()

        if (!res.ok)
          throw new HTTPError(res.status, res.statusText, response);

         return response as TResponse
       })

const query = createQuery(
  API_URL,
  {
    headers: {
      'Content-Type': 'application/json',
    },
  })


const makeRequest = (method: RequestInit['method']) =>
  <TResponse = unknown, TBody = Record<string, unknown>>(url: RequestInfo | URL, body: TBody) =>
    query<TResponse>(url, {
      method,
      body: JSON.stringify(body),
     })

export const api = {
  get: query,
  post: makeRequest('POST'),
  delete: makeRequest('DELETE'),
  put: makeRequest('PUT'),
  patch: makeRequest('PATCH'),
}
