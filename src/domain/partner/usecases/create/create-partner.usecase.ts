import { PartnerFactory } from "../../factories/partner.factory";
import { PartnerRepositoryInterface } from "../../repositories/partner.repository";
import {
  InputCreatePartnerUseCaseDto,
  OutputCreatePartnerUseCaseDto,
} from "./create-partner.usecase.dto";

export class CreatePartnerUseCase {
  constructor(private partnerReposity: PartnerRepositoryInterface) {}

  async execute(
    input: InputCreatePartnerUseCaseDto
  ): Promise<OutputCreatePartnerUseCaseDto> {
    const partner = PartnerFactory.create(
      input.tradingName,
      input.ownerName,
      input.document,
      input.coverageArea.coordinates,
      input.address.coordinates
    );

    await this.partnerReposity.savePartner(partner);

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
