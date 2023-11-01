const mongoose = require("mongoose");



const adharSchema = new mongoose.Schema(
{
  adhar:{
    type:Number,
    required: [true, "Aadhar number  is required"]
  }
}
);

const adharModel = mongoose.model("adhar",adharSchema);

module.exports =adharModel;
