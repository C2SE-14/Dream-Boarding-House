const User = require("../models/user.model");
const Role = require("../models/role.model");
const Room = require("../models/room.model");

const renderAdminPage = async (req, res, next) => {
  const renderUsers = await User.find({ deleted: false });
  const post = await Room.find({isAccept: true});
  const blockUser = await User.find({deleted: true});
  const numOfUser = renderUsers.length;
  const numOfPost = post.length;
  const numOfBlock = (numOfUser - blockUser.length);
  res.render("admin.template/master", {
    title: "Dashboard Admin",
    content: "../admin.template/main_content", numOfUser, numOfPost, numOfBlock
  });
};

const getAllUsers = async (req, res, next) => {
  const renderUsers = await User.find({ deleted: false });
  renderUsers.forEach((item, index) => {
    if(item.username === "admin1") renderUsers.splice(index, 1);
  })
  const roleUserId = await Role.find({$or:[ {'name':"Người thuê trọ"}, {'name':"Chủ phòng trọ"} ]});
  res.render("admin.template/master", {
    title: "Dashboard Admin",
    content: "../admin.page/users",
    renderUsers,
    roleUserId,
  });
};
const getAllPosts = async(req, res, next) => {
  try {
    const post = await Room.find();
    console.log('post', post);
    res.render("admin.template/master", {
      title: "Dashboard Admin",
      content: "../admin.page/posts",
      post
    });
  } catch (error) {
    console.log('error: ', error);
  }
}
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
  getAllPosts,
};
