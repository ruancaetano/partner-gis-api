import { HttpRequest, HttpResponse } from "./http.protocol";

export interface Controller<> {
  handle: (request: HttpRequest) => Promise<HttpResponse>
}