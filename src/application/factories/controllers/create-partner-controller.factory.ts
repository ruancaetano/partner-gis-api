import { CreatePartnerController } from "@application/controllers/create-partner.controller";
import { CreatePartnerUseCase } from "@domain/partner/usecases/create/create-partner.usecase";
import { MysqlPartnerRepository } from "@infra/repositories/mysql/partner/mysql-partner.repository";

export class CreatePartnerControllerFactory {
    static create(){
        const mysqlRepository = new MysqlPartnerRepository();
        const createPartnerUseCase = new CreatePartnerUseCase(mysqlRepository);
        return new CreatePartnerController(createPartnerUseCase);
    }
}