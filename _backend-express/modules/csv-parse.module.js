const csv = require("csv-parser");
const fs = require("fs");

class CSVParser {
  constructor(filePath) {
    this.filePath = filePath;
  }

  //   async parse() {
  //     const results = [];

  //     return new Promise((resolve, reject) => {
  //       fs.createReadStream(this.filePath)
  //         .pipe(csv())
  //         .on("data", (data) => results.push(data))
  //         .on("end", () => {
  //           resolve(results);
  //         })
  //         .on("error", (err) => {
  //           reject(err);
  //         });
  //     });
  //   }
  // }

  async parse(filePath,validTables, validColumns) {
    const results = [];

    const validateTable = (table) => {
      return validTables.includes(table);
    };

    const validateRow = (table, row) => {
      const validColumnsForTable = validColumns[table];
      const rowColumns = Object.keys(row);
      if (rowColumns.length !== validColumnsForTable.length) {
        return false;
      }
      for (const column of rowColumns) {
        if (!validColumnsForTable.includes(column)) {
          return false;
        }
      }
      return true;
    };

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => {
          const table = Object.keys(data)[0];
          if (!validateTable(table)) {
            reject(`Invalid table name: ${table}`);
            return;
          }
          if (!validateRow(table, data)) {
            reject(`   row in table ${table}: ${JSON.stringify(data)}`);
            return;
          }
          results.push(data);
        })
        .on("end", () => {
          resolve(results);
        })
        .on("error", (err) => {
          reject(err);
        });
    });

    return results;
  }
}
module.exports = { CSVParser };
