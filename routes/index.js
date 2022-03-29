const registerRouter = require("./register");
const authRouter = require("./auth")
function route(app) {
  app.use("/register", registerRouter);
  app.use("/login", authRouter);
}

module.exports = route;
