const mongoose = require("mongoose");
const chooseRoom = new mongoose.Schema(
  {
    userId: {
      type: Object,
      default: ""
    },
    roomId: {
      type: Object,
      default: ""
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("chooseRoom", chooseRoom);