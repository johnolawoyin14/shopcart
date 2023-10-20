const express = require("express");
const router = express.Router();
const Product = require("../models/prod");
const Cart = require("../models/cartModel");
const Delivery=require("../models/DeliveryModel")
const multer = require("multer");
const path = require("path");
const { result } = require("lodash");
const requireAuth = require("../middlewares/requireAuth");


  // router.use(requireAuth)

// all produx=cts

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./docs/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg"); // Change the file extension as needed
  },
});

const upload = multer({ storage: storage });

//
router.get("/", (req, res) => {
  Product.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      const responseData = result.map((item) => {
        return {
          _id: item._id,
          ItemName: item.ItemName,
          cartegory: item.cartegory,
          description: item.description,
          unit: item.unit,
          currency: item.currency,
          Price: item.Price,
          favorite: item.favorite,
          ImageUrl: `/download/${item.ImageName}`,
          createdAt: item.createdAt,
        };
      });
      res.json(responseData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.get(`/download/:filename`, (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../docs", filename);
  console.log(filePath);

  res.sendFile(filePath);
});

router.get("/search", (req, res) => {
  const searchTerm = req.query.search;
  if (!searchTerm) {
    res.json([]);
  } else {
    Product.find({
      $or: [{ ItemName: { $regex: searchTerm, $options: "i" } }],
    })
      .then((results) => {
        const responseData = results.map((item) => {
          return {
            _id: item._id,
            ItemName: item.ItemName,
            cartegory: item.cartegory,
            description: item.description,
            unit: item.unit,
            currency: item.currency,
            Price: item.Price,
            favorite: item.favorite,
            ImageUrl: `/download/${item.ImageName}`,

            createdAt: item.createdAt,
          };
        });
        res.json(responseData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
      });
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((result) => {
      const responseData = {
        _id: result._id,
        ItemName: result.ItemName,
        cartegory: result.cartegory,
        description: result.description,
        unit: result.unit,
        currency: result.currency,
        Price: result.Price,
        ImageUrl: `/download/${result.ImageName}`,
        favorite: result.favorite,

        createdAt: result.createdAt,
      };

      res.json(responseData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });

  router.get(`/download/:filename`, (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "../docs", filename);
    console.log(filePath);

    res.sendFile(filePath);
  });
});

router.post("/", upload.single("image"), async (req, res) => {
  filename = req.file.filename;
  filepath = req.file.path;
  // const user_id=req.user._id
  const postData = new Product({
    ItemName: req.body.ItemName,
    cartegory: req.body.cartegory,
    description: req.body.description,
    unit: req.body.unit,
    currency: req.body.currency,
    Price: req.body.Price,
    ImageName: filename,
    favorite: req.body.favorite,
    // user_id
  });

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // res.json({ message: filepath })
  try {
    const data = await Product.create(postData);
    console.log(data);
    res.status(200).json({ mm: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});
router.get("/cart/product", (req, res) => {
  Cart.find({})
    .sort({ createdAt: -1 })
    .then((result) => {
      res.status(200).json(result);
    });
});
router.delete("/cart/product/:id",(req,res)=>{
  const {id}=req.params;
  Cart.findOneAndDelete({_id:id})
  .then((result)=>{
    console.log(result)
    res.status(200).json(result)
  })
  .catch((error)=>{
    console.log(error)
    res.status(400).json(error.message)
  })
})
router.post("/cart", async (req, res) => {
  try {
    const user_id = req.user._id;
    console.log(user_id);
    
    const data = await Cart.create(req.body,user_id);
    res.json(data);
    console.log(data);
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});
router.get("/delivery/cart",async(req,res)=>{

  try{

    const data=await Delivery.find().sort({createdAt:-1})
    console.log(data)
    res.status(200).json(data)
  }
  catch(error){
    console.log(error)
    res.status(400).json(error)
  }

})
router.post("/delivery/cart",async(req,res)=>{
  // console.log(req.body)
  try{
    const data=await Delivery.create({delivery:req.body})
    res.status(200).json(data)
    console.log(data)
  }
  catch(error){
    console.log(error)
    res.status(400).json(error)
  }
  
})

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Product.findOneAndDelete({ _id: id })
    .then((result) => {
      console.log(`${result}\n Deleted`);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;

  Product.findOneAndUpdate(
    { _id: id },

    {
      ...req.body,
    }
  )
    .then((result) => {
      console.log(result);
      console.log(req.body);
      res.json({ mssg: "update products" });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
