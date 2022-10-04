import { getPartnerMock } from "@mocks/partner/get-partner.mock";
import { FindPartnerUseCase } from "./find-partner.usecase";

const MockRepository = () => {
  const mockedPartners = [getPartnerMock()];
  return {
    mockedPartners,
    findPartner: jest.fn().mockReturnValue(Promise.resolve(mockedPartners[0])),
    savePartner: jest.fn(),
    searchNearestPartner: jest.fn(),
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
