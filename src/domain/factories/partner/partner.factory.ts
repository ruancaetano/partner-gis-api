import { randomUUID } from "crypto";
import { Address } from "../../entities/partner/address";
import { CoverageArea } from "../../entities/partner/coverage-area";
import { Partner } from "../../entities/partner/partner.entity";

export class PartnerFactory {
  static create(
    tradingName: string,
    ownerName: string,
    document: string,
    coverageAreaCoordinates: number[][][][],
    addressCoordinates: number[]
  ) {
    return new Partner(
      randomUUID(),
      tradingName,
      ownerName,
      document,
      new CoverageArea(coverageAreaCoordinates),
      new Address(addressCoordinates)
    );
  }

  static createWithId(
    id: string,
    tradingName: string,
    ownerName: string,
    document: string,
    coverageAreaCoordinates: number[][][][],
    addressCoordinates: number[]
  ) {
    return new Partner(
      id,
      tradingName,
      ownerName,
      document,
      new CoverageArea(coverageAreaCoordinates),
      new Address(addressCoordinates)
    );
  }
}
