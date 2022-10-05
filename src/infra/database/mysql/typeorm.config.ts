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
