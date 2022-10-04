import { mysqlDatabase } from "@infra/database/mysql/mysql.connection";
import { MysqlPartnerEntity } from "@infra/repositories/mysql/partner/mysql-partner.entity";
import { MysqlPartnerRepository } from "@infra/repositories/mysql/partner/mysql-partner.repository";
import { PartnerFactory } from "@domain/factories/partner/partner.factory";
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

      const partnerMock = createPartnerMock();
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
        document: partnerMock.document,
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
