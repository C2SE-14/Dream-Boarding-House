const mongoose = require("mongoose");
const user = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 6,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 10,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    fullName: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "/images/profile/user-member-avatar-default.jpg",
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", user);