import { CreatePartnerUseCase } from "@domain/partner/usecases/create/create-partner.usecase";
import { FindPartnerUseCase } from "@domain/partner/usecases/find/find-partner.usecase";
import { SearchNearestPartnerUseCase } from "@domain/partner/usecases/search-nearest/search-nearest-partner.usecase";
import { MysqlPartnerRepository } from "@infra/repositories/mysql/partner/mysql-partner.repository";
import { Router } from "express";
import { CreatePartnerController } from "../controllers/create-partner.controller";
import { FindPartnerController } from "../controllers/find-partner.controller";
import { SearchNearestPartnerController } from "../controllers/search-nearest-partner.controller";

export const partnerRoutes = Router();

partnerRoutes.get("/partners/search-nearest", (req, res) => {
  const mysqlRepository = new MysqlPartnerRepository();
  const findPartnerUseCase = new SearchNearestPartnerUseCase(mysqlRepository);
  const controller = new SearchNearestPartnerController(findPartnerUseCase);
  return controller.handle(req, res);
});

partnerRoutes.get("/partners/:id", (req, res) => {
  const mysqlRepository = new MysqlPartnerRepository();
  const findPartnerUseCase = new FindPartnerUseCase(mysqlRepository);
  const controller = new FindPartnerController(findPartnerUseCase);
  return controller.handle(req, res);
});

partnerRoutes.post("/partners", (req, res) => {
  const mysqlRepository = new MysqlPartnerRepository();
  const createPartnerUseCase = new CreatePartnerUseCase(mysqlRepository);
  const controller = new CreatePartnerController(createPartnerUseCase);
  return controller.handle(req, res);
});
