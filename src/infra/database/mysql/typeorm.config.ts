import { resolve } from "path";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export default {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "development",
  database:
    process.env.NODE_ENV === "test" ? "partner-gis-test" : "partner-gis",
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [
    resolve(
      __dirname,
      "..",
      "..",
      "repositories",
      "mysql",
      "**",
      "*.entity.ts"
    ),
  ],
  migrations: [resolve(__dirname, "migrations", "*.ts")],
  seeds: [resolve(__dirname, "seeds", "*.ts")],
  cli: {
    migrationsDir: resolve(__dirname, "migrations"),
    seedsDir: [resolve(__dirname, "seeds")],
  },
};
