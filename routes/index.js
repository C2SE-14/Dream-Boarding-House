const registerRouter = require("./register");

function route(app) {
  app.use("/register", registerRouter);
}

module.exports = route;
