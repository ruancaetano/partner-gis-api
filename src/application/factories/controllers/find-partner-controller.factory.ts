import { FindPartnerController } from "@application/controllers/find-partner.controller";
import { FindPartnerUseCase } from "@domain/partner/usecases/find/find-partner.usecase";
import { MysqlPartnerRepository } from "@infra/repositories/mysql/partner/mysql-partner.repository";

export class FindPartnerControllerFactory {
    static create() {
        const mysqlRepository = new MysqlPartnerRepository();
        const findPartnerUseCase = new FindPartnerUseCase(mysqlRepository);
        return new FindPartnerController(findPartnerUseCase);
    }
}