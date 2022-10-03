type CoverageArea = {
  type: string;
  coordinates: number[][][][];
};

type Address = {
  type: string;
  coordinates: number[];
};

export interface InputFindPartnerUseCaseDto {
  id: string;
}

export interface OutputFindPartnerUseCaseDto {
  id: string;
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: CoverageArea;
  address: Address;
}
