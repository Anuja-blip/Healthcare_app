import React,{useState} from "react";
import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";

// import { useDispatch } from "react-redux";
// import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

const Login = () => {
  
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
                                      email: "",
                                      password: "",
                                      });

const onfinishHandler = async (values) => {
  console.log(credentials);
  const response = await fetch(`http://localhost:8080/api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email, 
                           password: credentials.password }),
  });
const data = await response.json();
console.log(data);

if (data.success== true) {
  localStorage.setItem("token", data.token);
  message.success("Login Successfully");
  console.log("Login Successfully")
  navigate("/");
} else {
  message.error("User not Found");
 console.log("something went wrong");
}

};
const handleInputChange = (e) => {
  setCredentials({...credentials, [e.target.name]: e.target.value});
  console.log(credentials.email, credentials.password);
};
  return (
    <div className="form-container ">
      <Form
        layout="vertical"
        onFinish={onfinishHandler}
        className="register-form"
      >
        <h3 className="text-center">Login Form</h3>

        <Form.Item label="Email" name="email">
          <Input type="email" name="email" onChange={handleInputChange}  required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" name="password" onChange={handleInputChange}  required />
        </Form.Item>
        <Link to="/register" className="m-2">
          Not a user Register here
        </Link>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;
