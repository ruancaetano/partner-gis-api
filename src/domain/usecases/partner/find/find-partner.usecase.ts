import { PartnerFactory } from "../../../factories/partner/partner.factory";
import { PartnerRepositoryInterface } from "../../../repositories/partner/partner.repository";
import {
  InputFindPartnerUseCaseDto,
  OutputFindPartnerUseCaseDto,
} from "./find-partner.usecase.dto";

export class FindPartnerUseCase {
  constructor(private partnerReposity: PartnerRepositoryInterface) {}

  async execute(
    input: InputFindPartnerUseCaseDto
  ): Promise<OutputFindPartnerUseCaseDto> {
    const partner = await this.partnerReposity.findPartner(input.id);

    if(!partner) {
      throw new Error("Partner not found");
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
