import { mysqlDatabase } from "@infra/database/mysql/mysql.connection";

const port = process.env.PORT || 3000;

mysqlDatabase.connect().then(async () => {
  const app = await import("./app");
  app.default.listen(port, () => {
    console.log("Listening on port " + port);
  });
});
