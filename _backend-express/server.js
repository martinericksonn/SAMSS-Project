const express = require('express');
const app = express();
const cors = require("cors");

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
const port = process.env.PORT || 3000;

const  attendanceRouter = require("./routes/attendance");
const studentRouter = require("./routes/student");
app.use("/attendance",attendanceRouter)
app.use("/student",studentRouter)
app.use(cors());

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
