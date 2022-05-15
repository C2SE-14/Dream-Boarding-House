const User = require("../models/user.model");

const renderAdminPage = async (req, res, next) => {
  res.render("admin.template/master", {
    title: "Dashboard Admin",
    content: "../admin.template/main_content",
  });
};

const getAllUsers = async (req, res, next) => {
  const renderUsers = await User.find();
  res.render("admin.template/master", {
    title: "Dashboard Admin",
    content: "../admin.page/users",
    renderUsers,
  });
};

module.exports = {
  renderAdminPage,
  getAllUsers,
};
