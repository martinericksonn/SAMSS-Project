const { CRUDReturn } = require("../modules/crud-return-interface");

const ErrorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  console.log(errMsg);
  console.log("adfsasfafasdfdf");
  res.status(errStatus).send(new CRUDReturn(false, {}, errMsg).json());
};

module.exports = ErrorHandler;
