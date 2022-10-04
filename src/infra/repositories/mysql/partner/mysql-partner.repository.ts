import { mysqlDatabase } from "@infra/database/mysql/mysql.connection";
import { Repository } from "typeorm";
import { Partner } from "../../../../domain/entities/partner/partner.entity";
import { PartnerRepositoryInterface } from "../../../../domain/repositories/partner/partner.repository";
import { MysqlPartnerEntity } from "./mysql-partner.entity";

export class MysqlPartnerRepository implements PartnerRepositoryInterface {
  private repository: Repository<MysqlPartnerEntity>;

  constructor() {
    this.repository =
      mysqlDatabase.connection.getRepository(MysqlPartnerEntity);
  }

  async savePartner(partner: Partner): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .insert()
      .values({
        tradingName: partner.tradingName,
        ownerName: partner.ownerName,
        document: partner.document,
        coverageArea: () =>
          `ST_GeomFromGeoJSON('${JSON.stringify({
            type: partner.coverageArea.type,
            coordinates: partner.coverageArea.coordinates,
          })}')`,
        address: () =>
          `ST_GeomFromGeoJSON('${JSON.stringify({
            type: partner.address.type,
            coordinates: partner.address.coordinates,
          })}')`,
      })
      .execute();
  }

  findPartner(id: string): Promise<Partner> {
    throw new Error("Method not implemented.");
  }

  searchNearestPartner(latitude: number, longitude: number): Promise<Partner> {
    throw new Error("Method not implemented.");
  }
}
