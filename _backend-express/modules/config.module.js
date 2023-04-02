const pool = require("./db-connection");

class ConfigModule {
  constructor() {}

  async getSchemaAttributes() {
    const [rows] = await pool.query(
      "SELECT table_name, column_name  FROM information_schema.columns WHERE table_schema = 'db'"
    );

    const resultMap = {};

    for (const item of rows) {
      if (!resultMap[item.TABLE_NAME]) resultMap[item.TABLE_NAME] = [];

      resultMap[item.TABLE_NAME].push(item.COLUMN_NAME);
    }

    return resultMap;
  }
}

module.exports = { ConfigModule };
