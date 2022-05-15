const User = require("../models/user.model");
const Role = require("../models/role.model");
const Room = require("../models/room.model");

const renderAdminPage = async (req, res, next) => {
  res.render("admin.template/master", {
    title: "Dashboard Admin",
    content: "../admin.template/main_content",
  });
};

const getAllUsers = async (req, res, next) => {
  const renderUsers = await User.find({ deleted: false });
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

const getAllPosts = async (req, res) => {
  const roleOwnersOfRoom = await Role.find({ name: "Chủ phòng trọ" });
  const users = await User.find();
  res.render("admin.template/master", {
    title: "Dashboard Admin",
    content: "../admin.page/posts",
    roleOwnersOfRoom,
    users,
  });
};

const getPostsOfOwner = async (req, res, next) => {
  const ownerId = await Room.find({ userId: req.params.id });
  res.render("admin.template/master", {
    title: "Dashboard Admin",
    content: "../admin.page/postDetail",
    ownerId,
  });
};

const acceptPostOfRoom = async (req, res, next) => {
  try {
    const formAccept = req.body;
    const acceptRoom = await Room.where({ _id: req.params.id }).update(
      formAccept
    );
    res.redirect("back");
  } catch (error) {
    res.status(500).send(error);
  }
};

const destroyRoom = async (req, res, next) => {
  const deleteRoom = await Room.delete({ _id: req.params.id })
    .then(() => {
      res.redirect("back");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

module.exports = {
  renderAdminPage,
  getAllUsers,
  blockUser,
  getAllPosts,
  getPostsOfOwner,
  acceptPostOfRoom,
  destroyRoom,
};
