
const userModel= require('../models/userModels');
const bcrypt= require('bcryptjs');
const jwt= require("jsonwebtoken");
const doctorModel = require("../models/doctorModels");

const registerController = async (req, res) => {
  try {
    console.log(req.body);
    const existingUser = await userModel.findOne({ email: req.body.email });
    
    if (existingUser) {
      return res.status(200).send({ message: "User Already Exists", success: false });
    }
    
    // Hash the user's password before saving it to the database
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    // Create a new user instance and save it to the database
    const newUser = new userModel(req.body);
    await newUser.save();

    res.status(201).send({ message: "Registered Successfully", success: true });
  } catch (error) {
    console.error(error);
    //res.status(500).send({ success: false, message: `Register Controller ${error.message}` });
    res.status(500).send({ success: false, message: `registration unsucessful` });
  }
};


  

const loginController =async(req, res)=>{
    try {
      const user= await userModel.findOne({email:req.body.email});
      if(!user){
        return res.status(200).send({message:"user not found",success:false})
      }
      const isMatch= await bcrypt.compare(req.body.password,user.password);
      if(!isMatch){
        return res.status(200).send({message:"Invalid email or password",success:false})
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).send({ message: "Login Success", success: true, token });
      
    } catch (error) {
      console.log(error);
      res.status(500).send({message:"error in login ${error message}"});
      
    }
}

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data:user
        // data:{
        //   name:user.name,
        //   email:user.email,
        //   phone:user.phone
        // }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};
const applyDoctorController = async (req, res) => {
  try {
    
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notifcation = adminUser.notifcation;
    notifcation.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        //onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notifcation });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Applying For Doctor",
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "true" });
    
    res.status(200).send({
      success: true,
      message: "Doctors List fetched successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching doctors",
    });
  }
}

const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Single Doc Info Fetched",
      data: doctor,
      // data:{
      //     name:doctor.name,
      //     email:doctor.email,
      //     phone:doctor.phone,
      //     specialization:doctor.specialization,
      //   }
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Single doctor info",
    });
  }
};


const updateProfileController = async (req, res) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "User Profile Updated",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "user Profile Update issue",
      error,
    });
  }
};

const getUsersByIdController = async (req, res) => {
  try {
    const user = await userModel.findOne({ userId: req.body.userId });
   
      res.status(200).send({
        success: true,
        data:user
        
      });
  
 } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching doctors",
    });
  }
}

const adharController=()=>{

}

module.exports={loginController,
                registerController,
                authController,
               applyDoctorController,
                getAllDoctorsController,
                getDoctorByIdController,
                getUsersByIdController,
                updateProfileController,
                 adharController};