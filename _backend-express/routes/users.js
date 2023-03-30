const express = require("express");
const { CRUDReturn } = require("../modules/crud-return-interface");
const { UserModule } = require("../modules/users.module");

class UserRoute {
  constructor() {}
  userModule = new UserModule();

  #router = express.Router();

  get routes() {
    this.#router.get("/all", async (req, res, next) => {
      try {
        var result = await this.userModule.getAll();
        res.status(200).send(new CRUDReturn(true, { result }, "get").json());
      } catch (error) {
        next(error);
      }
    });

    // Get a specific user by id
    this.#router.get("/", async (req, res, next) => {
      try {
        const { id } = req.query;
        var result = await this.userModule.getSingle(id);
        res.status(200).send(new CRUDReturn(true, { result }, "get").json());
      } catch (error) {
        next(error);
      }
    });

    // Update a user by id
    this.#router.patch("/", async (req, res, next) => {
      try {
        const { body } = req.body;
        //  Code to update a user by id

        res.status(200).send(new CRUDReturn(true, { body }, "patch").json());
      } catch (error) {
        next(error);
      }
    });

    return this.#router;
  }
}

module.exports = { UserRoute };
