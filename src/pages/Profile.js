import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";

import moment from "moment";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  // update doc ==========
  //handle form
  const handleFinish = async (values) => {
    try {
     
      const res = await fetch(
        "http://localhost:8080/api/v1/user/updateProfile",
        {
            method:"POST",
            // ...values,
            // userId: user._id,
            headers: {
              "Content-Type": "application/json",
               Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                ...values,
                userId: user._id,
              }),
          }
      );
      const data= await res.json();
     
      if (data.success) {
       // setDoctor(data.data);
        message.success(data.message);
        navigate("/");
      } else {
        message.error(data.success);
      }
    } catch (error) {
     
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };
  // update doc ==========

  //getDOc Details
  const getDoctorInfo = async () => {
    try {
        const res = await fetch(
          "http://localhost:8080/api/v1/user/getUserData",
        
          {
            method:"POST",
            headers: {
              "Content-Type": "application/json",
               Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({}),
          }
        );
  
        const data= await res.json();
        console.log(data);
        if (data.success) {
          setDoctor(data.data);
        }
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(() => {
    getDoctorInfo();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1>Manage Profile</h1>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...doctor
           
          }}
        >
          <h4 className="">Personal Details : </h4>
          
          <div className="d-flex flex-column w-50">
             
          <Form.Item
                label="Name"
                name="name"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your Name" />
              </Form.Item>
          
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your email" />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your phone number" />
              </Form.Item>

              <Form.Item
                label="Age"
                name="age"
                required
                rules={[{ required: true }]}
              >
                
                <Input type="number" placeholder="your age" />
              </Form.Item>
       
              <button className="btn btn-primary form-btn" type="submit">
                Update
              </button>
           </div>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
