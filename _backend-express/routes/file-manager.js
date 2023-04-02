const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { CSVParser } = require("../modules/csv-parse.module");

class FileManagerRoute {
  constructor() {}

  static get baseRoute() {
    return "/parse";
  }
  #router = express.Router();

  get routes() {
    this.#router.get("/", (req, res, next) => {
      res.send("this is attendance result");
    });

    this.#router.post("/csv", upload.single("csvfile"), async (req, res) => {
      try {
        const filePath = req.file.path;
        const parser = new CSVParser(filePath);
        const data = await parser.parse();
        res.json(data);
      } catch (err) {
        res.status(500).json({ message: "Error parsing CSV data" });
      }
    });

    return this.#router;
  }
}

module.exports = { FileManagerRoute };
