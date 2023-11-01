import React,{useState} from 'react'
import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const otp = () => {
  const onfinishHandler=()=>{
    console.log("clicked");
  }
    return (
    <div className="form-container ">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Otp verification</h3>

       <Form.Item name="otp" label="Enter the otp, sent to your mobile number" >
       <Input name="otp" id="otp"
        required />
       </Form.Item>
        
      
     
          <button className="btn btn-primary" type="submit">
           Submit
          </button>
        </Form>
      </div>
    
  )
}

export default otp
