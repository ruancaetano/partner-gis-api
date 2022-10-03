import { FindPartnerUseCase } from "./find-partner.usecase";

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
  const mockedPartners = [createPartnerMock()];
  return {
    mockedPartners,
    findPartner: jest.fn().mockReturnValue(Promise.resolve(mockedPartners[0])),
    savePartner: jest.fn(),
  };
};

describe("Find Partner unit tests", () => {
  it("should find a new partner", async () => {
    const partnerRepository = MockRepository();
    const usecase = new FindPartnerUseCase(partnerRepository);

    const partnerMock = partnerRepository.mockedPartners[0];

    const input = {
      id: "valid-id",
    };

    const output = await usecase.execute(input);

    expect(output).toEqual(partnerMock);
  });

  it("should throw an error if user not found", async () => {
    const partnerRepository = MockRepository();
    partnerRepository.findPartner.mockImplementationOnce(() => {
      throw new Error("Partner not found");
    });

    const usecase = new FindPartnerUseCase(partnerRepository);

    const input = {
      id: "invalid-id",
    };

    await expect(async () => {
      await usecase.execute(input);
    }).rejects.toThrow("Partner not found");
  });
});
