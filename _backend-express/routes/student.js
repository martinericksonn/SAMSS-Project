const express = require("express");
const router = express.Router();
const { CRUDReturn } = require("../modules/crud-return-interface");
router.post("/add", async (req, res) => {
  try {
    const { test } = req.body;
    console.log(test);
    // add code to add a new student
    res.status(200).send(new CRUDReturn(true, {}, "post").json());
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new CRUDReturn( "post").json());
  }
});

router.post("/students/subjects", async (req, res) => {
  const { studentNo, subject } = req.body;
  // add code to add a new subject for a student
  res
    .status(500)
    .send(new CRUDReturn(true, { studentNo, subject }, "post").json());
});

router.delete("/students/subjects", async (req, res) => {
  const { studentNo, subject } = req.body;
  // add code to remove a subject from a student
  res
    .status(500)
    .send(new CRUDReturn(true, { studentNo, subject }, "delete").json());
});

router.delete("/students", async (req, res) => {
  const id = req.params.id;

  res.status(500).send(new CRUDReturn(true, { id }, "delete").json());
  // add code to delete a student
});

router.get("/students", async (req, res) => {
  const id = req.params.id;
  // add code to get a student by id
  res.status(500).send(new CRUDReturn(true, { id }, "get").json());
});

router.get("/students", async (req, res) => {
  // add code to get all students
  res.status(500).send(new CRUDReturn(true, {}, "get").json());
});

router.get("/", (req, res) => {
  res.send("this is student");
});

module.exports = router;
