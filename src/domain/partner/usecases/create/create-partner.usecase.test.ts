import { mysqlDatabase } from "@infra/database/mysql/mysql.connection";
import { MysqlPartnerEntity } from "@infra/repositories/mysql/partner/mysql-partner.entity";
import { MysqlPartnerRepository } from "@infra/repositories/mysql/partner/mysql-partner.repository";
import { getPartnerMock } from "@mocks/partner/get-partner.mock";
import { CreatePartnerUseCase } from "./create-partner.usecase";


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

      const inputMock = getPartnerMock();

      const partner = await usecase.execute(inputMock);

      expect(partner).toEqual({
        ...inputMock,
        id: expect.any(String),
        document: inputMock.document.trim().replace(/(\.|\/)/g, ""),
      });
    });
  });
});
