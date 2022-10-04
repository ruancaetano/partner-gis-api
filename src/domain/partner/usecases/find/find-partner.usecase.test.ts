import { mysqlDatabase } from "@infra/database/mysql/mysql.connection";
import { MysqlPartnerEntity } from "@infra/repositories/mysql/partner/mysql-partner.entity";
import { MysqlPartnerRepository } from "@infra/repositories/mysql/partner/mysql-partner.repository";
import { PartnerFactory } from "@domain/partner/factories/partner.factory";
import { FindPartnerUseCase } from "./find-partner.usecase";
import { getPartnerMock } from "@mocks/partner/get-partner.mock";



describe("Find partner use case integration test", () => {
  beforeAll(async () => {
    await mysqlDatabase.connect();
    await mysqlDatabase.clearEntityRepository(MysqlPartnerEntity);
  });

  afterAll(async () => {
    await mysqlDatabase.clearEntityRepository(MysqlPartnerEntity);
    await mysqlDatabase.disconnect();
  });

  describe("Integrated with mysql repository", () => {
    it("should find a partner", async () => {
      const partnerRepository = new MysqlPartnerRepository();
      const usecase = new FindPartnerUseCase(partnerRepository);

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

      const foundPartner = await usecase.execute({
        id: partner.id,
      });

      expect(foundPartner).toEqual({
        id: partner.id,
        tradingName: partnerMock.tradingName,
        ownerName: partnerMock.ownerName,
        document: partnerMock.document.trim().replace(/(\.|\/)/g, ""),
        coverageArea: partnerMock.coverageArea,
        address: partnerMock.address,
      });
    });

    it("should not found a partner", async () => {
      const partnerRepository = new MysqlPartnerRepository();
      const usecase = new FindPartnerUseCase(partnerRepository);

      await expect(async () => {
        await usecase.execute({
          id: "invalid id",
        });
      }).rejects.toThrow("Partner not found");
    });
  });
});
