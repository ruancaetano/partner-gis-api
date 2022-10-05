import { ValidationError } from "@domain/@shared/errors/validation.error";
import { PartnerRepositoryInterface } from "../../../partner/repositories/partner.repository";
import {
  InputSearchNearestPartnerUseCaseDto,
  OutputSearchNearestPartnerUseCaseDto,
} from "./search-partner.usecase.dto";

export class SearchNearestPartnerUseCase {
  constructor(private partnerReposity: PartnerRepositoryInterface) {}

  async execute(
    input: InputSearchNearestPartnerUseCaseDto
  ): Promise<OutputSearchNearestPartnerUseCaseDto> {
    const partner = await this.partnerReposity.searchNearestPartner(
      input.latitude,
      input.longitude
    );

    if (!partner) {
      throw new ValidationError("No partners found near this location");
    }

    return {
      id: partner.id,
      tradingName: partner.tradingName,
      ownerName: partner.ownerName,
      document: partner.document,
      coverageArea: {
        type: partner.coverageArea.type,
        coordinates: partner.coverageArea.coordinates,
      },
      address: {
        type: partner.address.type,
        coordinates: partner.address.coordinates,
      },
    };
  }
}
