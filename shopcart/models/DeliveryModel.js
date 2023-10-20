const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deliverySchema = new Schema(
  {
    delivery: {
      type: Object,
      required: true,
    }
  },
  { timestamps: true }
);

const Delivery = mongoose.model("delivery", deliverySchema);

module.exports = Delivery;
