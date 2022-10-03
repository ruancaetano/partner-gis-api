import { Partner } from "../../entities/partner/partner.entity";

export interface PartnerRepositoryInterface {
  findPartner(id: string): Promise<Partner>;
  savePartner(partner: Partner): Promise<void>;
  searchNearestPartner(latitude: number, longitude: number): Promise<Partner>;
}
