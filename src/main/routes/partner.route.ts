import { HttpExpressAdapter } from "@main/adapters/express-http.adapter";
import { CreatePartnerControllerFactory } from "@main/factories/controllers/create-partner-controller.factory";
import { FindPartnerControllerFactory } from "@main/factories/controllers/find-partner-controller.factory";
import { SearchNearestPartnerControllerFactory } from "@main/factories/controllers/search-nearest-partner-controller.factory";
import { Router } from "express";

export const partnerRoutes = Router();

partnerRoutes.get(
  "/partners/search-nearest",
  HttpExpressAdapter.create(SearchNearestPartnerControllerFactory.create())
);

partnerRoutes.get(
  "/partners/:id",
  HttpExpressAdapter.create(FindPartnerControllerFactory.create())
);

partnerRoutes.post(
  "/partners",
  HttpExpressAdapter.create(CreatePartnerControllerFactory.create())
);
