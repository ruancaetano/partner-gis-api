import { Partner } from "@domain/partner/entities/partner.entity";
import partnersMock from "./partners.mock.json";

type PartnerMock = {
  id: string;
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: {
    type: "MultiPolygon";
    coordinates: number[][][][];
  };
  address: {
    type: "Point";
    coordinates: number[];
  };
};

export const getPartnerMock = (index = 0) => {
  return partnersMock[index] as Partner;
};
