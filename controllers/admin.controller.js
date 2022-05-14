const { response } = require("express");
const User = require("../models/user.model");

const getAdminPage = async (req, res, next) => {
  res.render("admin.template/master");
};
module.exports = {
  getAdminPage,
};
