const userModel= require('../models/userModels');
const bcrypt= require('bcryptjs');
const jwt= require("jsonwebtoken");


const messagebird = require('messagebird');

const key=process.env.MESSAGEBIRD_API_KEY;


const otpController = async (req, res) => {
    try {
      const user = await userModel.findById({ _id: req.body.userId });
    
      console.log(user);
      if (!user) {
        return res.status(200).send({
          message: "user not found",
          success: false,
        });
      } else {
        res.status(200).send({success: true   });
        
        const phonenumber= user.phone;
        console.log(phonenumber);

        //const newPhoneNumber ="+91"+  phonenumber
        // var params = {
        //   template: 'Your Login OTP is %token',
        //   timeout: 300
        // };
    
        // messagebird.verify.create(newPhoneNumber, params,
        //   (err, response) => {
        //     if (err) {
        //       // Could not send OTP e.g. Phone number Invalid
        //       console.log("OTP Send Error:", err);
        //       res.status(200).send({  "message": "Unable to Send OTP" ,success: false})
        //     } else {
        //       // OTP Send Success
        //       console.log("OTP Send Response:", response);
        //       res.status(200).send({  "message": "OTP Send Successfully", success: true,"id": response.id })
        //     }
        //   });

      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Something went wrong",
        success: false,
        error,
      });
    }
  };
  

module.exports={otpController};