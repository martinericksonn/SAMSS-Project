const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const ErrorHandler = require("./middlewares/error-handler");
const { UserRoute } = require("./routes/users");
const { StudentRoute } = require("./routes/student");
const { FileManagerRoute } = require("./routes/file-manager");
const { AttendanceRoute } = require("./routes/attendance");
const { ConfigRoute } = require("./routes/config");

const userRoute = new UserRoute();
const studentRoute = new StudentRoute();
const fileManagerRoute = new FileManagerRoute();
const attendanceRoute = new AttendanceRoute();
const configRoute = new ConfigRoute();
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

app.use(ConfigRoute.baseRoute, configRoute.routes);
app.use(FileManagerRoute.baseRoute, fileManagerRoute.routes);
app.use(AttendanceRoute.baseRoute, attendanceRoute.routes);
app.use(StudentRoute.baseRoute, studentRoute.routes);
app.use(UserRoute.baseRoute, userRoute.routes);
// app.set("port", process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
