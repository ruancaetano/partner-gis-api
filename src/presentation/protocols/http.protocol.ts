export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
export interface HttpRequest {
    params: Record<string, unknown>
    query: Record<string, unknown>
    body: unknown
}

export interface HttpResponse {
  status: HttpStatusCode;
  body: unknown
}
