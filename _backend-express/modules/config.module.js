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

  async editAll(config) {
    const { current_term, current_year, late_minutes, absent_minutes } = config;
    const [result] = await pool.query(
      "UPDATE config SET current_term = ?, current_year = ?, late_minutes = ?, absent_minutes = ? WHERE id = 1",
      [current_term, current_year, late_minutes, absent_minutes]
    );
    return result.affectedRows === 1;
  }

  async getAll() {
    const [rows] = await pool.query("SELECT * FROM config");
    return rows;
  }

  async add(config) {
    const { current_term, current_year, late_minutes, absent_minutes } = config;
    const [result] = await pool.query(
      "INSERT INTO config (current_term, current_year, late_minutes, absent_minutes) VALUES (?, ?, ?, ?)",
      [current_term, current_year, late_minutes, absent_minutes]
    );
    return result.insertId;
  }
}

module.exports = { ConfigModule };
