const csv = require("csv-parser");
const fs = require("fs");

class CSVParser {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async parse() {
    const results = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(this.filePath)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
          resolve(results);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }
}

module.exports = { CSVParser };
