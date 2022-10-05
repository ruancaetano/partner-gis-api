import { ValidationError } from "@domain/@shared/errors/validation.error";
import { Partner } from "@domain/partner/entities/partner.entity";
import { getPartnerMock } from "@mocks/partner/get-partner.mock";
import { CreatePartnerUseCase } from "./create-partner.usecase";

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

    const inputMock = getPartnerMock();

    const partner = await usecase.execute(inputMock);

    expect(partner).toEqual({
      ...inputMock,
      id: expect.any(String),
      document: inputMock.document.trim().replace(/(\.|\/)/g, ""),
    });
  });

  it("should throw an error if fails", async () => {
    const partnerRepository = MockRepository();
    partnerRepository.savePartner.mockImplementationOnce(() => {
      throw new ValidationError("Connection error");
    });

    const usecase = new CreatePartnerUseCase(partnerRepository);

    const inputMock = getPartnerMock();

    await expect(async () => {
      await usecase.execute(inputMock);
    }).rejects.toThrow("Connection error");
  });
});
