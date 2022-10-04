import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({
  name: "partners",
})
export class MysqlPartnerEntity {
  @PrimaryGeneratedColumn("uuid")
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
