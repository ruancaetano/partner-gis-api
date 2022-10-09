import { ValidationError } from "@domain/@shared/errors/validation.error";
import { SearchNearestPartnerUseCase } from "@domain/partner/usecases/search-nearest/search-nearest-partner.usecase";
import { Controller } from "@presentation/protocols/controller.protocol";
import {
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from "@presentation/protocols/http.protocol";

export class SearchNearestPartnerController implements Controller {
  constructor(private usecase: SearchNearestPartnerUseCase) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const { latitude, longitude } = req.query;

    const parsedLatitude = Number(latitude);
    const parsedLongitude = Number(longitude);

    if (Number.isNaN(parsedLatitude) || Number.isNaN(parsedLongitude)) {
      return {
        status: 400,
        body: new ValidationError("Invalid latitude/longitude query params"),
      };
    }

    const foundParter = await this.usecase.execute({
      latitude: parsedLatitude,
      longitude: parsedLongitude,
    });

    return {
      status: HttpStatusCode.OK,
      body: foundParter,
    };
  }
}
