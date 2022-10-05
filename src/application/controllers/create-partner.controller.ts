import { CreatePartnerUseCase } from "@domain/partner/usecases/create/create-partner.usecase";
import { Controller } from "@presentation/protocols/controller.protocol";
import {
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from "@presentation/protocols/http.protocol";
import { InputCreatePartnerUseCaseDto } from "@domain/partner/usecases/create/create-partner.usecase.dto";

export class CreatePartnerController implements Controller {
  constructor(private usecase: CreatePartnerUseCase) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const body = req.body;
    const createdPartner = await this.usecase.execute(
      body as InputCreatePartnerUseCaseDto
    );
    return {
      status: HttpStatusCode.CREATED,
      body: createdPartner,
    };
  }
}
