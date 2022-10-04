import { SearchNearestPartnerUseCase } from "./search-nearest-partner.usecase";

const createPartnerMock = () => ({
  tradingName: "Adega da Cerveja - Pinheiros",
  ownerName: "Zé da Silva",
  document: "1432132123891/0001",
  coverageArea: {
    type: "MultiPolygon",
    coordinates: [
      [
        [
          [30, 20],
          [45, 40],
          [10, 40],
          [30, 20],
        ],
      ],
      [
        [
          [15, 5],
          [40, 10],
          [10, 20],
          [5, 10],
          [15, 5],
        ],
      ],
    ],
  },
  address: {
    type: "Point",
    coordinates: [-46.57421, -21.785741],
  },
});

const MockRepository = () => {
  const mockedPartners = [createPartnerMock(), createPartnerMock()];
  return {
    mockedPartners,
    findPartner: jest.fn(),
    savePartner: jest.fn(),
    searchNearestPartner: jest.fn().mockReturnValue(null),
  };
};

describe("Search nearest partner unit tests", () => {
  it("should return a nearest partner", async () => {
    const partnerRepository = MockRepository();
    const usecase = new SearchNearestPartnerUseCase(partnerRepository);

    const { mockedPartners } = partnerRepository;

    partnerRepository.searchNearestPartner.mockReturnValueOnce(
      mockedPartners[0]
    );
    const output1 = await usecase.execute({
      latitude: mockedPartners[0].address.coordinates[0],
      longitude: mockedPartners[0].address.coordinates[1],
    });

    expect(output1).toEqual(mockedPartners[1]);

    partnerRepository.searchNearestPartner.mockReturnValueOnce(
      mockedPartners[1]
    );
    const output2 = await usecase.execute({
      latitude: mockedPartners[1].address.coordinates[0],
      longitude: mockedPartners[1].address.coordinates[1],
    });

    expect(output2).toEqual(mockedPartners[1]);
  });

  it("should throw an error if user not found", async () => {
    const partnerRepository = MockRepository();
    partnerRepository.searchNearestPartner.mockReturnValueOnce(null);

    const usecase = new SearchNearestPartnerUseCase(partnerRepository);

    await expect(async () => {
      await usecase.execute({
        latitude: -1000,
        longitude: -1000,
      });
    }).rejects.toThrow("No partners found near this location");
  });
});
