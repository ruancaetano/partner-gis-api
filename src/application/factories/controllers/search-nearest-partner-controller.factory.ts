import { SearchNearestPartnerController } from "@application/controllers/search-nearest-partner.controller";
import { SearchNearestPartnerUseCase } from "@domain/partner/usecases/search-nearest/search-nearest-partner.usecase";
import { MysqlPartnerRepository } from "@infra/repositories/mysql/partner/mysql-partner.repository";

export class SearchNearestPartnerControllerFactory {
  static create() {
    const mysqlRepository = new MysqlPartnerRepository();
    const findPartnerUseCase = new SearchNearestPartnerUseCase(mysqlRepository);
    return new SearchNearestPartnerController(findPartnerUseCase);
  }
}
