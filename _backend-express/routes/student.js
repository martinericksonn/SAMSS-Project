const express = require("express");
const router = express.Router();
const { CRUDReturn } = require("../modules/crud-return-interface");

router.post("/add", async (req, res, next) => {
  try {
    console.log(req.body);
    const { test } = req.body;
    // add code to add a new student

    res.status(200).send(new CRUDReturn(true, {}, "post").json());
  } catch (error) {
    next(error);
  }
});

router.post("/add-subject", async (req, res) => {
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

router.delete("/remove-subject", async (req, res) => {
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

router.delete("/", async (req, res) => {
  try {
    const id = req.params.id;

    res.status(200).send(new CRUDReturn(true, { id }, "delete").json());
  } catch (error) {
    next(error);
  }
  // add code to delete a student
});

router.get("/", async (req, res) => {
  try {
    const id = req.params.id;
    // add code to get a student by id
    res.status(200).send(new CRUDReturn(true, { id }, "get").json());
  } catch (error) {
    next(error);
  }
});

router.get("/all", async (req, res) => {
  try {
    // add code to get all students
    res.status(200).send(new CRUDReturn(true, {}, "get").json());
  } catch (error) {
    next(error);
  }
});

router.get("/", (req, res) => {
  res.send("this is student");
});

module.exports = router;
