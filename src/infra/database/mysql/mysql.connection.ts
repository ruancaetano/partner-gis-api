import { getConnectionManager, ConnectionOptions } from "typeorm";

import typeormConfig from "./typeorm.config";

const connectionManager = getConnectionManager();

class MysqlDatabase {
  private _connection = connectionManager.create(
    typeormConfig as ConnectionOptions
  );

  async connect(): Promise<void> {
    if (this._connection.isConnected) {
      return;
    }

    await this._connection.connect();
  }

  async disconnect(): Promise<void> {
    await this._connection.close();
  }

  async clearEntityRepository(entity: any) {
    // It's can run only on test enverioment
    if (
      process.env.NODE_ENV === "test" &&
      typeormConfig.database.includes("test")
    ) {
      const repository = this._connection.getRepository(entity);

      if (repository) {
        await repository.clear();
      }
    }
  }

  get connection() {
    return this._connection;
  }
}

export const mysqlDatabase = new MysqlDatabase();
