const registerRouter = require("./register");
const authRouter = require("./auth");
const homeRouter = require("./home");
function route(app) {
  app.use("/register", registerRouter);
  app.use("/login", authRouter);
  app.use("/", homeRouter);
}

module.exports = route;
