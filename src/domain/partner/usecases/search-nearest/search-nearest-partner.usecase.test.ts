import { mysqlDatabase } from "@infra/database/mysql/mysql.connection";
import { MysqlPartnerEntity } from "@infra/repositories/mysql/partner/mysql-partner.entity";
import { MysqlPartnerRepository } from "@infra/repositories/mysql/partner/mysql-partner.repository";
import { PartnerFactory } from "@domain/partner/factories/partner.factory";
import { SearchNearestPartnerUseCase } from "./search-nearest-partner.usecase";
import { getPartnerMock } from "@mocks/partner/get-partner.mock";

describe("Search Nearest partner use case integration test", () => {
  beforeAll(async () => {
    await mysqlDatabase.connect();
    await mysqlDatabase.clearEntityRepository(MysqlPartnerEntity);
  });

  afterAll(async () => {
    await mysqlDatabase.clearEntityRepository(MysqlPartnerEntity);
    await mysqlDatabase.disconnect();
  });

  describe("Integrated with mysql repository", () => {
    it("should return nearest partner", async () => {
      const partnerRepository = new MysqlPartnerRepository();
      const usecase = new SearchNearestPartnerUseCase(partnerRepository);

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

      const foundPartner1 = await usecase.execute({
        latitude: -43.297337,
        longitude: -23.013538,
      });

      expect(foundPartner1).toEqual({
        id: partner1.id,
        tradingName: partnerMock1.tradingName,
        ownerName: partnerMock1.ownerName,
        document: partnerMock1.document.trim().replace(/(\.|\/)/g, ""),
        coverageArea: partnerMock1.coverageArea,
        address: partnerMock1.address,
      });

      const foundPartner2 = await usecase.execute({
        latitude: -49.33420,
        longitude: -25.380990,
      });

      expect(foundPartner2).toEqual({
        id: partner2.id,
        tradingName: partnerMock2.tradingName,
        ownerName: partnerMock2.ownerName,
        document: partnerMock2.document.trim().replace(/(\.|\/)/g, ""),
        coverageArea: partnerMock2.coverageArea,
        address: partnerMock2.address,
      });
    });

    it("should not found a partner", async () => {
      const partnerRepository = new MysqlPartnerRepository();
      const usecase = new SearchNearestPartnerUseCase(partnerRepository);

      await expect(async () => {
        await usecase.execute({
          latitude: 0,
          longitude: 0,
        });
      }).rejects.toThrow("Partner not found");
    });
  });
});
