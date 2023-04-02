const express = require("express");
const router = express.Router();

class AttendanceRoute {
  constructor() {}

  static get baseRoute() {
    return "/attendance";
  }
  #router = express.Router();

  get routes() {
    this.#router.get("/", (req, res, next) => {
      res.send("this is attendance result");
    });

    return this.#router;
  }
}

module.exports = { AttendanceRoute };
