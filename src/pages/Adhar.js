import React,{useState} from 'react'
import "../styles/RegisterStyles.css";
import { Form, Input, message,Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";


const Adhar = () => {
  //for the checkbox
  const [checked, setChecked] = React.useState(false); 
  function handleInputChange(e) {
     setChecked(e.target.checked);
  }

   const navigate = useNavigate();
   

const onfinishHandler = async(values) => {
   const response = await fetch(`http://localhost:8080/api/v1/user/sendOtp`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
              },
              body: JSON.stringify({})

              });

        const data = await response.json();
        console.log(data);

        if(data.success == true) {
          console.log("Adhar verified successfully");
          message.success("Adhar verified Successfully!!");
          navigate("/Abha");
        } else {
          message.error(data.message);
          console.log("Adhar is not verified");
        }
};


    return (
    <div className="form-container ">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Aadhar Number Verification</h3>

       <Form.Item name="adhar" label="Adhar Number" >
       <Input type="Number" name="adhar" id="adhar" 
       // onChange={handleInputChange} 
        placeholder='Enter your Aadhar number here' 
        required />
       </Form.Item>
        
        <Form.Item name ="checkbox" >
        <input value = "test" type = "checkbox" 
        onChange = {handleInputChange} 
        required />
         <br></br>
         {checked ? (
            <div> Checkbox is checked. </div>
         ) : (
            <div> Checkbox is not checked. </div>
         )}
        </Form.Item>
          <button className="btn btn-primary" type="submit">
           Submit
          </button>
        </Form>
      </div>
    
  )
}

export default Adhar
