const User = require("../models/user.model");
const Role = require("../models/role.model");

const renderAdminPage = async (req, res, next) => {
  res.render("admin.template/master", {
    title: "Dashboard Admin",
    content: "../admin.template/main_content",
  });
};

const getAllUsers = async (req, res, next) => {
  const renderUsers = await User.find({ deleted: false });
  console.log(renderUsers);
  const roleUserId = await Role.find();
  res.render("admin.template/master", {
    title: "Dashboard Admin",
    content: "../admin.page/users",
    renderUsers,
    roleUserId,
  });
};

const blockUser = async (req, res, next) => {
  const block = await User.delete({ _id: req.params.id })
    .then(() => {
      res.redirect("/admin/users");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

module.exports = {
  renderAdminPage,
  getAllUsers,
  blockUser,
};
