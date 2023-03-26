const express = require("express");
const router = express.Router();
const { CRUDReturn } = require("../modules/crud-return-interface");

// Get all users
router.get("/all", async (req, res) => {
  try {
    // Code to fetch all users
    res.status(200).send(new CRUDReturn(true, {}, "get").json());
  } catch (error) {
    next(error);
  }
});

// Get a specific user by id
router.get("/", async (req, res) => {
  try {
    const { id } = req.query;
    // Code to fetch a user by id
    res.status(200).send(new CRUDReturn(true, { id }, "get").json());
  } catch (error) {
    next(error);
  }
});

// Update a user by id
router.patch("/", async (req, res) => {
  try {
    const { body } = req.body;
    //  Code to update a user by id

    res.status(200).send(new CRUDReturn(true, { body }, "patch").json());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
