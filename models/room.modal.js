const mongoose = require("mongoose");
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
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Room", room);