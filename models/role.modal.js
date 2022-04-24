const mongoose = require("mongoose");
const room = new mongoose.Schema(
  {
    type: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Role", role);