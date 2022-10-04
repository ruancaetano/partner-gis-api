import {MigrationInterface, QueryRunner} from "typeorm";

export class addPartnerEntity1664853596025 implements MigrationInterface {
    name = 'addPartnerEntity1664853596025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`partners\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_active\` tinyint NOT NULL DEFAULT 1, \`trading_name\` varchar(255) NOT NULL, \`owner_name\` varchar(255) NOT NULL, \`document\` varchar(255) NOT NULL, \`coverage_area\` multipolygon NOT NULL, \`address\` point NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`partners\``);
    }

}
