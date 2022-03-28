const bcrypt = require("bcrypt");

const UserModel = require("../models/user.model");

let errs = [];

function renderRegisterPage(req, res, next) {
  res.render("../views/components/register", { title: "Register page", errs: errs });
}

async function renderUserRegister(req, res, next) {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password, salt);
  let username = req.body.username;
  let email = req.body.email;
  let password = hashed;
  errs = [];

  // console.log(req.body);
  UserModel.findOne({
    username: username,
  }).then((data) => {
    if (data) {
      errs.push("Username already exist!");
    }
  });

  UserModel.findOne({
    email: email,
  }).then((data) => {
    if (data) {
      errs.push("Email already exist!");
    }
  });

  if (errs.length > 0) {
    res.render("component/register", {
      title: "Register page",
      errs: errs,
    });
  }

  if (errs.length === 0) {
    UserModel.create({
      username: username,
      email: email,
      password: password,
    })
      .then((data) => {
        //redirect login form
        res.redirect("/login");
      })
      .catch((err) => {
        // res.json('Tạo tài khoản thất bại');
        res.render("../views/components/register", {
          title: "Register page",
          errs: errs,
        });
      });
  }
}

module.exports = { renderRegisterPage, renderUserRegister };