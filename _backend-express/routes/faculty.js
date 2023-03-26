const express = require("express");
const router = express.Router();
const { CRUDReturn } = require("../modules/crud-return-interface");

// Get all faculties
router.get("/faculties", async (req, res) => {
  try {
    const faculties = await getFaculties();
    res.status(200).send(new CRUDReturn(true, {}, "post").json());
  } catch (error) {
    next(error);
  }
});

// Get a specific faculty by id
router.get("/id", async (req, res) => {
  try {
    const { id } = req.params;

    res.status(200).send(new CRUDReturn(true, { id }, "post").json());
  } catch (error) {
    next(error);
  }
});

// Add a new faculty
router.post("/add", async (req, res) => {
  try {
    const { body } = req;

    res.status(200).json(new CRUDReturn(true, { body }, "post"));
  } catch (error) {
    next(error);
  }
});

// Delete a faculty by id
router.delete("/id", async (req, res) => {
  try {
    const { id } = req.params;

    res.status(200).send(new CRUDReturn(true, { id }, "delete").json());
  } catch (error) {
    next(error);
  }
});

// Update a faculty by id
router.patch("/faculties/:id", async (req, res) => {
  try {
    const { body } = req.body;

    res
      .status(200)
      .json(new CRUDReturn(true, { body }, "Update a faculty by id"));
  } catch (error) {
    next(error);
  }
});

// Remove subjects from a faculty by facultyId and subjectIds
router.patch("/faculties/:facultyId/removeSubjects", async (req, res) => {
  try {
    const { body } = req.body;

    res
      .status(200)
      .json(
        new CRUDReturn(
          true,
          { body },
          "Remove subjects from a faculty by facultyId and subjectIds"
        )
      );
  } catch (error) {
    next(error);
  }
});

// Remove subjects from a faculty by
