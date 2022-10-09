import { resolve } from "path";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const database = process.env.DB_DATABASE || "partner-gis";
export default {
  type: "mysql",
  host: process.env.DB_HOSTNAME || "localhost",
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "development",
  database: process.env.NODE_ENV === "test" ? `${database}-test` : database,
  logging: process.env.NODE_ENV === "development",
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
    resolve(
      __dirname,
      "..",
      "..",
      "repositories",
      "mysql",
      "**",
      "*.entity.js"
    ),
  ],
  migrations: [
    resolve(__dirname, "migrations", "*.ts"),
    resolve(__dirname, "migrations", "*.js"),
  ],
  seeds: [
    resolve(__dirname, "seeds", "*.js"),
    resolve(__dirname, "seeds", "*.js"),
  ],
  cli: {
    migrationsDir: resolve(__dirname, "migrations"),
    seedsDir: [resolve(__dirname, "seeds")],
  },
};
