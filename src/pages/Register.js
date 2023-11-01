import React ,{useEffect, useState}from "react";
import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";




const Register = () => {
  const navigate = useNavigate();
  
  const [credentials, setCredentials] = useState({name: "",
                                          email: "",
                                            password: "",
                                         phone:"",
                                          age:""});

  const onfinishHandler = async (values) => {
  console.log(credentials);


  const response = await fetch(`http://localhost:8080/api/v1/user/register`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name: credentials.name,
                    email: credentials.email,
                    password: credentials.password ,
                   phone: credentials.phone,
                    age:credentials.age})

              });

        const data = await response.json();
        console.log(data);

        if(data.success == true) {
          console.log("registed");
          message.success("Registered Successfully!!");
          navigate("/login");
        } else {
          message.error(data.message);
          console.log("error");
        }
 // }
            };

  const handleInputChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
    console.log(credentials.email, credentials.password);
  };

  return (
    <>
      <div className="form-container ">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Register From</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" name="name" id="name" onChange={handleInputChange} required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" name="email" id="email"  onChange={handleInputChange} required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" name="password" id="password" onChange={handleInputChange}  required />
          </Form.Item>
          
          <Form.Item name= "phone" label="Phone Number" >
         <Input type="text" name="phone" id="phone" onChange={handleInputChange} required/>
          </Form.Item>

       <Form.Item name="Age" label="Age" >
       <Input name="age" id="age" onChange={handleInputChange}   required />
       </Form.Item>
          <Link to="/login" className="m-2">
            Already user login here
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;



// import React,{useState} from "react";
// import "../styles/RegisterStyles.css";
// import { Form, Input, message,Upload,InputNumber } from "antd";
// import { UploadOutlined } from '@ant-design/icons';

// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// // import { useDispatch } from "react-redux";
// // import { showLoading, hideLoading } from "../redux/features/alertSlice";

// const Register = () => {
//   const navigate = useNavigate();
//   //const dispatch = useDispatch();
//   //form handler
 
//   const onfinishHandler = async (values) => {
//     try {
//      // dispatch(showLoading());
//       const res = await axios.post("/api/v1/user/register", values);
//       // dispatch(hideLoading());
//       console.log("anuja");
//       if (res.data.success) {
//         message.success("Register Successfully!");
//         navigate("/login");
//       } else {
//         message.error(res.data.message);
//       }
//     } catch (error) {
//      // dispatch(hideLoading());
//       console.log(error);
//       message.error("Something Went Wrong");
//     }
//   };


//   return (
//     <>
//       <div className="form-container ">
//         <Form
//           layout="vertical"
//           onFinish={onfinishHandler}
//           className="register-form"
//         >
//           <h3 className="text-center">Register From</h3>

//           <Form.Item label="Name" name="name">
//             <Input type="text" required />
//           </Form.Item>

//           <Form.Item label="Email" name="email">
//             <Input type="email" required />
//           </Form.Item>

//           <Form.Item label="Password" name="password">
//             <Input type="password" required />
//           </Form.Item>

//           <Form.Item name="phone" label="Phone Number" >
//          <Input type="phone" required/>
//          </Form.Item>

//       <Form.Item name="Age" label="Age" >
//         <Input type="number" required />
//       </Form.Item>
     
//      <Link to="/login" className="m-2">
//             Already user login here
//           </Link>

//           <button className="btn btn-primary" type="submit">
//             Register
//           </button>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default Register;
