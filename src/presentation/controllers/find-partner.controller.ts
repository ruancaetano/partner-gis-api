import { FindPartnerUseCase } from "@domain/partner/usecases/find/find-partner.usecase";
import { Controller } from "@presentation/protocols/controller.protocol";
import {
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from "@presentation/protocols/http.protocol";

export class FindPartnerController implements Controller {
  constructor(private usecase: FindPartnerUseCase) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const { id } = req.params;
    const foundParter = await this.usecase.execute({ id: id as string });
    return {
      status: HttpStatusCode.OK,
      body: foundParter,
    };
  }
}
