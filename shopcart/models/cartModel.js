const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const cartSchema = new Schema(
  {
    ItemName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cartegory: {
      type: String,
      required: true,
    },
  
    unit: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    ImageUrl: {
      type: String,
      required: true,
    },
   
  },
  { timestamps: true }
);

const Cart=mongoose.model('cart',cartSchema)

module.exports=Cart;