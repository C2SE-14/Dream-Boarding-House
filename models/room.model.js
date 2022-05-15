const mongoose = require("mongoose");
const image = new mongoose.Schema({
  video_url: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  }
});
const room = new mongoose.Schema(
  {
    type: {
      type: String,
      default: ""
    },
    price: {
      type: String,
      default: ""
    },
    acreage: {
      type: Number,
      default: 0
    },
    city: {
      type: String,
      default: "",
    },
    district: {
      type: String,
      default: "",
      },
    ward: {
      type: String,
      default: "",
    },
    address: {
        type: String,
        default: "",
      },
    description: {
      type: String,
      default: "",
    },
    state: {
      type: Boolean,
      default: true,
    },
    username: {
      type: String,
      default: "",
    },
    userId: {
      type: Object,
      default: "",
    },
    isLike: {
      type: Boolean,
      default: false,
    },
    isAccept: {
      type: Boolean,
      default: false,
    },
    list_image: [image]
  },
  { timestamps: true }
);


module.exports = mongoose.model("Room", room);