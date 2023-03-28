const pool = require("./db-connection");

class UserModule {
  constructor() {}

  async getAll() {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  }

  async getSingle(id) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ? `, [id]);
    return rows;
  }
}

module.exports = { UserModule };
