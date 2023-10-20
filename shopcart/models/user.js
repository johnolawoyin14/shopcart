const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName:{
        type:String,
        
    },
    lastName:{
        type:String,
        
    },
    country:{
        type:String,
        
    },
    city:{
        type:String,
        
    },
    address:{
        type:String,
        
    },
    dob:{
        type:Date,
        
    },
  },
  { timestamps: true }
);


userSchema.statics.signup=async function(email,password,firstName,lastName,country,city,address,dob){
if (!email || !password){
    throw Error("All fields must be filled")
}
if(!validator.isEmail(email)){
    throw Error("Email is not valid")
}
if(!validator.isStrongPassword(password)){
    throw Error("password is not strong enough")
}
const exists= await this.findOne({email})

if(exists){
    throw Error("Email already exists")
}

const salt=await bcrypt.genSalt(10)
const hash = await bcrypt.hash(password,salt)

const user=await this.create({email,password:hash,firstName,lastName,country,city,address,dob})

return user


}


userSchema.statics.login = async function (
  email,
  password,
  firstName,
  lastName,
  country,
  city,
  address,
  dob
) {
  if (!email || !password) {
    throw Error("All fields must be field");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email");
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid Password");
  }

  return user;
};


const user = mongoose.model("user", userSchema);

module.exports = user;
