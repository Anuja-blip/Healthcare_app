const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },
  email: {
    type: String,
    required: [true, "email is require"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  },
  phone: {
    type: String,
    
    required: [true, "Phone Number is required"]
  },
  age:{
    type: Number,
    
    required: [true, "Age is required"]
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  notifcation: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
});

const adharSchema = new mongoose.Schema(
{
  adhar:{
    type:Number,
    required: [true, "Aadhar number  is required"]
  }
}
);
const userModel = mongoose.model("users", userSchema);
const adharModel = mongoose.model("adhar",adharSchema);

module.exports =userModel;
