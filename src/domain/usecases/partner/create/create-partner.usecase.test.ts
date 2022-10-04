import { mysqlDatabase } from "@infra/database/mysql/mysql.connection";
import { MysqlPartnerEntity } from "@infra/repositories/mysql/partner/mysql-partner.entity";
import { MysqlPartnerRepository } from "@infra/repositories/mysql/partner/mysql-partner.repository";
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

describe("Create partner use case integration test", () => {
  beforeAll(async () => {
    await mysqlDatabase.connect();
    await mysqlDatabase.clearEntityRepository(MysqlPartnerEntity);
  });

  afterAll(async () => {
    await mysqlDatabase.clearEntityRepository(MysqlPartnerEntity);
    await mysqlDatabase.disconnect();
  });

  describe("Integrated with mysql repository", () => {
    it("should create a new partner", async () => {
      const partnerRepository = new MysqlPartnerRepository();
      const usecase = new CreatePartnerUseCase(partnerRepository);

      const inputMock = createPartnerMock();

      const partner = await usecase.execute(inputMock);

      expect(partner).toEqual({
        ...inputMock,
        id: expect.any(String),
      });
    });
  });
});
