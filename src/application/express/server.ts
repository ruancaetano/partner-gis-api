import { mysqlDatabase } from "@infra/database/mysql/mysql.connection";
import app from "./app";

const port = process.env.PORT || 3000;


mysqlDatabase.connect().then(() => {
  app.listen(port, () => {
    console.log("Listening on port " + port);
  });
});
