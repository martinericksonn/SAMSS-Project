const express = require("express");
const router = express.Router();
const { CRUDReturn } = require("../modules/crud-return-interface");

class StudentRoute {
  constructor() {}

  #router = express.Router();

  get routes() {
    this.#router.post("/add", async (req, res, next) => {
      try {
        console.log(req.body);
        const { test } = req.body;
        // add code to add a new student

        res.status(200).send(new CRUDReturn(true, {}, "post").json());
      } catch (error) {
        next(error);
      }
    });

    this.#router.post("/add-subject", async (req, res, next) => {
      try {
        const { studentNo, subject } = req.body;
        // add code to add a new subject for a student
        res
          .status(200)
          .send(new CRUDReturn(true, { studentNo, subject }, "post").json());
      } catch (error) {
        next(error);
      }
    });

    this.#router.delete("/remove-subject", async (req, res, next) => {
      try {
        const { studentNo, subject } = req.body;
        // add code to remove a subject from a student
        res
          .status(200)
          .send(new CRUDReturn(true, { studentNo, subject }, "delete").json());
      } catch (error) {
        next(error);
      }
    });

    this.#router.delete("/", async (req, res, next) => {
      try {
        const id = req.params.id;

        res.status(200).send(new CRUDReturn(true, { id }, "delete").json());
      } catch (error) {
        next(error);
      }
      // add code to delete a student
    });

    this.#router.get("/", async (req, res, next) => {
      try {
        const id = req.params.id;
        // add code to get a student by id
        res.status(200).send(new CRUDReturn(true, { id }, "get").json());
      } catch (error) {
        next(error);
      }
    });

    this.#router.get("/all", async (req, res, next) => {
      try {
        // add code to get all students
        res.status(200).send(new CRUDReturn(true, {}, "get").json());
      } catch (error) {
        next(error);
      }
    });

    router.get("/", (req, res, next) => {
      res.send("this is student");
    });
  }
}

module.exports = { StudentRoute };
