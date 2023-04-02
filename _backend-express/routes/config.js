const express = require("express");
const router = express.Router();
const { CRUDReturn } = require("../modules/crud-return-interface");
const { ConfigModule } = require("../modules/config.module");
class ConfigRoute {
  constructor() {}

  configModule = new ConfigModule();
  static get baseRoute() {
    return "/config";
  }

  #router = express.Router();

  get routes() {
    this.#router.get("/information-schema", async (req, res, next) => {
      try {
        const result = await this.configModule.getSchemaAttributes();

        res.status(200).send(new CRUDReturn(true, { result }, "post").json());
      } catch (error) {
        next(error);
      }
    });

    router.get("/", (req, res, next) => {
      res.send("this is student");
    });

    return this.#router;
  }
}

module.exports = { ConfigRoute };
