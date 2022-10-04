import { PartnerFactory } from "@domain/partner/factories/partner.factory";
import { mysqlDatabase } from "@infra/database/mysql/mysql.connection";
import { MysqlPartnerEntity } from "@infra/repositories/mysql/partner/mysql-partner.entity";
import { MysqlPartnerRepository } from "@infra/repositories/mysql/partner/mysql-partner.repository";
import { getPartnerMock } from "@mocks/partner/get-partner.mock";

describe("Mysql partner repository integration test", () => {
  beforeAll(async () => {
    await mysqlDatabase.connect();
    await mysqlDatabase.clearEntityRepository(MysqlPartnerEntity);
  });

  afterEach(async () => {
    await mysqlDatabase.clearEntityRepository(MysqlPartnerEntity);
  });

  afterAll(async () => {
    await mysqlDatabase.clearEntityRepository(MysqlPartnerEntity);
    await mysqlDatabase.disconnect();
  });

  describe("Create partner", () => {
    it("should create a new partner", async () => {
      const partnerRepository = new MysqlPartnerRepository();

      const inputMock = getPartnerMock();

      const partner = await partnerRepository.savePartner(inputMock);

      expect(partner).toEqual(partner);
    });
  });

  describe("Find partner", () => {
    it("should find a partner", async () => {
      const partnerRepository = new MysqlPartnerRepository();

      const partnerMock = getPartnerMock();
      const partner = PartnerFactory.create(
        partnerMock.tradingName,
        partnerMock.ownerName,
        partnerMock.document,
        partnerMock.coverageArea.coordinates,
        partnerMock.address.coordinates
      );

      await expect(
        partnerRepository.savePartner(partner)
      ).resolves.not.toThrowError();

      const foundPartner = await partnerRepository.findPartner(partner.id);

      expect(foundPartner).toEqual(partner);
    });

    it("should not found a partner", async () => {
      const partnerRepository = new MysqlPartnerRepository();

      await expect(partnerRepository.findPartner("invalid id")).rejects.toThrow(
        "Partner not found"
      );
    });
  });

  describe("Search nearest partner", () => {
    it("should return nearest partner", async () => {
      const partnerRepository = new MysqlPartnerRepository();

      const partnerMock1 = getPartnerMock();
      const partner1 = PartnerFactory.create(
        partnerMock1.tradingName,
        partnerMock1.ownerName,
        partnerMock1.document,
        partnerMock1.coverageArea.coordinates,
        partnerMock1.address.coordinates
      );

      const partnerMock2 = getPartnerMock(1);
      const partner2 = PartnerFactory.create(
        partnerMock2.tradingName,
        partnerMock2.ownerName,
        partnerMock2.document,
        partnerMock2.coverageArea.coordinates,
        partnerMock2.address.coordinates
      );

      await expect(
        Promise.all([
          partnerRepository.savePartner(partner1),
          partnerRepository.savePartner(partner2),
        ])
      ).resolves.not.toThrowError();

      const foundPartner1 = await partnerRepository.searchNearestPartner(
        -43.297337,
        -23.013538
      );

      expect(foundPartner1).toEqual(partner1);

      const foundPartner2 = await partnerRepository.searchNearestPartner(
        -49.3342,
        -25.38099
      );

      expect(foundPartner2).toEqual(partner2);
    });

    it("should not found a partner", async () => {
      const partnerRepository = new MysqlPartnerRepository();

      await expect(async () => {
        await partnerRepository.searchNearestPartner(0, 0);
      }).rejects.toThrow("Partner not found");
    });
  });
});
