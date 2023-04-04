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

  async getByEmailAndPassword(email, password) {
    const [rows] = await pool.query(
      `SELECT * FROM users WHERE email = ? AND password = ?`,
      [email, password]
    );
    return rows;
  }

  async getByRFID(rfID) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE rfID = ?`, [
      rfID,
    ]);
    return rows;
  }

  async getBySchoolYear(schoolYear) {
    const [rows] = await pool.query(
      `SELECT * FROM users WHERE school_year = ?`,
      [schoolYear]
    );
    return rows;
  }
}

module.exports = { UserModule };
