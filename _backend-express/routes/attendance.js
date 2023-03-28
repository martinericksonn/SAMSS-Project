const express = require("express");
const router = express.Router();

class AttendanceRoute {
  constructor() {}

  #router = express.Router();

  get routes() {
    this.#router.get("/", (req, res, next) => {
      res.send("this is attendance result");
    });
  }
}

module.exports = { AttendanceRoute };
