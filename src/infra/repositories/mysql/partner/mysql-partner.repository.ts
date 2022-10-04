import { PartnerFactory } from "@domain/factories/partner/partner.factory";
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
        id: partner.id,
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

  async findPartner(id: string): Promise<Partner> {
    const result = await this.repository
      .createQueryBuilder()
      .select([
        "id as id",
        "trading_name as tradingName",
        "owner_name as ownerName",
        "document as document",
        "ST_AsGeoJSON(coverage_area) as coverageArea",
        "ST_AsGeoJSON(address) as address",
      ])
      .where("id = :id", { id })
      .getRawOne();

    if (!result) {
      throw new Error("Partner not found");
    }

    return PartnerFactory.createWithId(
      result.id,
      result.tradingName,
      result.ownerName,
      result.document,
      JSON.parse(result.coverageArea).coordinates || [],
      JSON.parse(result.address).coordinates || []
    );
  }

  searchNearestPartner(latitude: number, longitude: number): Promise<Partner> {
    throw new Error("Method not implemented.");
  }
}
