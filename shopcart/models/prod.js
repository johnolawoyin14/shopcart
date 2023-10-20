const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const productSchema = new Schema(
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
    favorite: {
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
    ImageName: {
      type: String,
      required: true,
    },
   
    // user_id: {
    //   type: String,
    //   required: true,
    // },
   
  },
  { timestamps: true }
);

const Products=mongoose.model('Product',productSchema)

module.exports=Products;