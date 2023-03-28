const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const ErrorHandler = require("./middlewares/error-handler");
const { UserRoute } = require("./routes/users");
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
const userRoute = new UserRoute();
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
// const attendance = require("./routes/attendance");
// const student = require("./routes/student");

// app.use("/attendance", attendance);
// app.use("/student", student);
app.use("/user", userRoute.routes);
// app.set("port", process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
