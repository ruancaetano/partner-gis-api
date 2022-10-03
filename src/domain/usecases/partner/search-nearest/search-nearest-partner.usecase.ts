import { PartnerRepositoryInterface } from "../../../repositories/partner/partner.repository";
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
      throw new Error("No partners found near this location");
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
