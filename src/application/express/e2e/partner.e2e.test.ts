import app from "@application/express/app";
import { mysqlDatabase } from "@infra/database/mysql/mysql.connection";
import { MysqlPartnerEntity } from "@infra/repositories/mysql/partner/mysql-partner.entity";
import { getPartnerMock } from "@mocks/partner/get-partner.mock";
import request from "supertest";

describe("Partner e2e tests", () => {
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

  describe("Create", () => {
    it("should create a new partner", async () => {
      const mockPartner = getPartnerMock();

      const response = await request(app).post("/partners").send(mockPartner);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        ...mockPartner,
        document: response.body.document.trim().replace(/(\.|\/)/g, ""),
        id: expect.any(String),
      });
    });
  });

  describe("Find", () => {
    it("should return a partner", async () => {
      const mockPartner = getPartnerMock();

      const createResponse = await request(app)
        .post("/partners")
        .send(mockPartner);

      expect(createResponse.status).toBe(201);

      const getResponse = await request(app)
        .get(`/partners/${createResponse.body.id}`)
        .send();

      expect(getResponse.status).toBe(200);
      expect(getResponse.body).toEqual(createResponse.body);
    });

    it("should not return a partner", async () => {
      const mockPartner = getPartnerMock();

      const getResponse = await request(app).get(`/partners/invalid-id`).send();

      expect(getResponse.status).toBe(400);
      expect(getResponse.body.message).toEqual("Partner not found");
    });
  });

  describe("Search", () => {
    it("should throw error if params are not valid", async () => {
      const latitude = 'invalid';
      const longitude = 'invalid';
      const getResponse = await request(app)
        .get(
          `/partners/search-nearest?latitude=${latitude}&longitude=${longitude}`
        )
        .send();

      expect(getResponse.status).toBe(400);
      expect(getResponse.body.message).toEqual("Invalid latitude/longitude query params");
    });

    it("should return the nearest partner", async () => {
      const mockPartner1 = getPartnerMock();
      const mockPartner2 = getPartnerMock(1);

      const [createResponse1, createResponse2] = await Promise.all([
        request(app).post("/partners").send(mockPartner1),
        request(app).post("/partners").send(mockPartner2),
      ]);
      expect(createResponse1.status).toBe(201);
      expect(createResponse2.status).toBe(201);

      // extracted from mock file (mockos/partner/partners.mock.json)
      const latitude1 = -43.297337;
      const longigute1 = -23.013538;
      const getResponse = await request(app)
        .get(
          `/partners/search-nearest?latitude=${latitude1}&longitude=${longigute1}`
        )
        .send();

      expect(getResponse.status).toBe(200);
      expect(getResponse.body).toEqual(createResponse1.body);

      // extracted from mock file (mockos/partner/partners.mock.json)
      const latitude2 = -49.3342;
      const longitude = -25.38099;
      const getResponse2 = await request(app)
        .get(
          `/partners/search-nearest?latitude=${latitude2}&longitude=${longitude}`
        )
        .send();

      expect(getResponse2.status).toBe(200);
      expect(getResponse2.body).toEqual(createResponse2.body);
    });

    it("should not return a partner", async () => {
      const latitude = 0;
      const longitude = 0;
      const getResponse = await request(app)
        .get(
          `/partners/search-nearest?latitude=${latitude}&longitude=${longitude}`
        )
        .send();

      expect(getResponse.status).toBe(400);
      expect(getResponse.body.message).toEqual("Partner not found");
    });
  });
});
