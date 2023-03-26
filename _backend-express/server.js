const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const ErrorHandler = require("./middlewares/error-handler")

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
const  attendanceRouter = require("./routes/attendance");
const studentRouter = require("./routes/student");

app.use(cors());

app.use("/attendance",attendanceRouter)
app.use("/student",studentRouter)
app.use(ErrorHandler)

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
