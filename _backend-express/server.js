const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const ErrorHandler = require("./middlewares/error-handler");
const { UserRoute } = require("./routes/users");
const { StudentRoute } = require("./routes/student");
const { FileManagerRoute } = require("./routes/file-manager");
const { AttendanceRoute } = require("./routes/attendance");
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
const userRoute = new UserRoute();
const studentRoute = new StudentRoute();
const fileManagerRoute = new FileManagerRoute();
const attendanceRoute = new AttendanceRoute();

// Start server

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(ErrorHandler);
app.use(cors());

const port = process.env.PORT || 3000;

app.use("/parse", fileManagerRoute.routes);
app.use("/attendance", attendanceRoute.routes);
app.use("/student", studentRoute.routes);
app.use("/user", userRoute.routes);
// app.set("port", process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
