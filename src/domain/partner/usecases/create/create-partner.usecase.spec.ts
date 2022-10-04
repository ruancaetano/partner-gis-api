import { Partner } from "@domain/partner/entities/partner.entity";
import { CreatePartnerUseCase } from "./create-partner.usecase";

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

const MockRepository = () => ({
  findPartner: jest.fn(),
  savePartner: jest
    .fn()
    .mockImplementation((partner: Partner) => Promise.resolve(partner)),
  searchNearestPartner: jest.fn(),
});

describe("Create Partner unit tests", () => {
  it("should create a new partner", async () => {
    const partnerRepository = MockRepository();
    const usecase = new CreatePartnerUseCase(partnerRepository);

    const inputMock = createPartnerMock();

    const partner = await usecase.execute(inputMock);

    expect(partner).toEqual({
      ...inputMock,
      id: expect.any(String),
    });
  });

  it("should throw an error if fails", async () => {
    const partnerRepository = MockRepository();
    partnerRepository.savePartner.mockImplementationOnce(() => {
      throw new Error("Connection error");
    });

    const usecase = new CreatePartnerUseCase(partnerRepository);

    const inputMock = createPartnerMock();

    const partner = await expect(async () => {
      await usecase.execute(inputMock);
    }).rejects.toThrow("Connection error");
  });
});
