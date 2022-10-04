import { getPartnerMock } from "@mocks/partner/get-partner.mock";
import { Address } from "./address";
import { CoverageArea } from "./coverage-area";
import { Partner } from "./partner.entity";

describe("Partner entity unit tests", () => {
  it("should return partner", () => {
    const partnerMock = getPartnerMock();

    const partner = new Partner(
      partnerMock.id,
      partnerMock.tradingName,
      partnerMock.ownerName,
      partnerMock.document,
      new CoverageArea(partnerMock.coverageArea.coordinates),
      new Address(partnerMock.address.coordinates)
    );

    expect(partner.id).toBe(partnerMock.id);
    expect(partner.tradingName).toBe(partnerMock.tradingName);
    expect(partner.ownerName).toBe(partnerMock.ownerName);
    expect(partner.document).toBe(
      partnerMock.document.trim().replace(/(\.|\/)/g, "")
    );

    expect(partner.coverageArea.type).toBe(partnerMock.coverageArea.type);
    expect(partner.coverageArea.coordinates).toEqual(
      partnerMock.coverageArea.coordinates
    );

    expect(partner.address.type).toBe(partnerMock.address.type);
    expect(partner.address.coordinates).toEqual(
      partnerMock.address.coordinates
    );
  });

  it("should throw an error if id is empty", () => {
    const partnerMock = getPartnerMock();

    expect(() => {
      new Partner(
        null,
        partnerMock.tradingName,
        partnerMock.ownerName,
        partnerMock.document,
        new CoverageArea(partnerMock.coverageArea.coordinates),
        new Address(partnerMock.address.coordinates)
      );
    }).toThrow("Id is required");
  });

  it("should throw an error trading name is empty", () => {
    const partnerMock = getPartnerMock();

    expect(() => {
      new Partner(
        partnerMock.id,
        null,
        partnerMock.ownerName,
        partnerMock.document,
        new CoverageArea(partnerMock.coverageArea.coordinates),
        new Address(partnerMock.address.coordinates)
      );
    }).toThrow("Trading name is required");
  });

  it("should throw an error owner name is empty", () => {
    const partnerMock = getPartnerMock();

    expect(() => {
      new Partner(
        partnerMock.id,
        partnerMock.tradingName,
        null,
        partnerMock.document,
        new CoverageArea(partnerMock.coverageArea.coordinates),
        new Address(partnerMock.address.coordinates)
      );
    }).toThrow("Owner name is required");
  });

  it("should throw an error if document is invalid", () => {
    const partnerMock = getPartnerMock();

    expect(() => {
      new Partner(
        partnerMock.id,
        partnerMock.tradingName,
        partnerMock.ownerName,
        null,
        new CoverageArea(partnerMock.coverageArea.coordinates),
        new Address(partnerMock.address.coordinates)
      );
    }).toThrow("Document is invalid");

    expect(() => {
      new Partner(
        partnerMock.id,
        partnerMock.tradingName,
        partnerMock.ownerName,
        "invalid-document",
        new CoverageArea(partnerMock.coverageArea.coordinates),
        new Address(partnerMock.address.coordinates)
      );
    }).toThrow("Document is invalid");
  });

  it("should throw an error if coverage area is empty", () => {
    const partnerMock = getPartnerMock();

    expect(() => {
      new Partner(
        partnerMock.id,
        partnerMock.tradingName,
        partnerMock.ownerName,
        partnerMock.document,
        null,
        new Address(partnerMock.address.coordinates)
      );
    }).toThrow("Coverage area is required");
  });

  it("should throw an error if address is empty", () => {
    const partnerMock = getPartnerMock();

    expect(() => {
      new Partner(
        partnerMock.id,
        partnerMock.tradingName,
        partnerMock.ownerName,
        partnerMock.document,
        new CoverageArea(partnerMock.coverageArea.coordinates),
        null
      );
    }).toThrow("Address is required");
  });
});
