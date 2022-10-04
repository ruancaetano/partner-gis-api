import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({
  name: "partners",
})
export class MysqlPartnerEntity {
  @PrimaryColumn({
    type: "uuid",
  })
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    default: true,
  })
  isActive: boolean;

  @Column()
  tradingName: string;

  @Column()
  ownerName: string;

  @Column()
  document: string;

  @Column({
    type: "multipolygon",
  })
  coverageArea: string;

  @Column({
    type: "point",
  })
  address: string;
}
