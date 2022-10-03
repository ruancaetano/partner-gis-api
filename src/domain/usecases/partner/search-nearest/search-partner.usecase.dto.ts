type CoverageArea = {
  type: string;
  coordinates: number[][][][];
};

type Address = {
  type: string;
  coordinates: number[];
};

export interface InputSearchNearestPartnerUseCaseDto {
  latitude: number;
  longitude: number;
}

export interface OutputSearchNearestPartnerUseCaseDto {
  id: string;
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: CoverageArea;
  address: Address;
}
