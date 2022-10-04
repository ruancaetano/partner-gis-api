type CoverageArea = {
  type: string;
  coordinates: number[][][][];
};

type Address = {
  type: string;
  coordinates: number[];
};

export interface InputCreatePartnerUseCaseDto {
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: CoverageArea;
  address: Address;
}

export interface OutputCreatePartnerUseCaseDto {
  id: string;
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: CoverageArea;
  address: Address;
}
