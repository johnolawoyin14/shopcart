const express=require("express")
const router=express.Router()
const User=require("../models/user")
const jwt = require("jsonwebtoken");
const requireAuth=require("../middlewares/requireAuth")

// router.use(requireAuth)

const createToken = (_id) => {
  return jwt.sign({ _id }, "johnolawoyinisaveryfineboy", { expiresIn: "3d" });
};
router.post("/login",async(req,res)=>{
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);

      const token = createToken(user._id);

      res.status(200).json({ email, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

    
})
router.post("/signup",async(req,res)=>{
    const {
      email,
      password,
      firstName,
      lastName,
      country,
      city,
      address,
      dob,
    } = req.body;
    console.log(req.body)
try{
const user = await User.signup(
  email,
  password,
  firstName,
  lastName,
  country,
  city,
  address,
  dob
);

const token=createToken(user._id)

res.status(200).json({email,token})


}
catch(error){
    res.status(400).json({error:error.message})
    console.log(error)

}

})

module.exports=router
