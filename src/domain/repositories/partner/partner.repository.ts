import { Partner } from "../../entities/partner/partner.entity";

export interface PartnerRepositoryInterface {
    savePartner(partner: Partner): Promise<void>
}