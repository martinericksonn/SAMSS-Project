const express = require("express");
const router = express.Router();
const { Config } = require("../models");
const { IConfigService } = require("../services/interface");

router.post("/config", async (req, res, next) => {
  const config = req.body;
  try {
    res.status(200).send(new CRUDReturn(true, { config }, "post").json());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
