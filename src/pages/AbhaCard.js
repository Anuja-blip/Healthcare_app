import { Row } from 'antd';
import React,{useEffect,useState} from 'react'
import Layout from "../components/Layout";


const HomePage = () => {
  const [users, setUsers] = useState([]);
  const getUserData = async () => {
    

    try {
      const res = await fetch(
        "http://localhost:8080/api/v1/user/getUserById",

        {
          method:"GET",
          headers: {
            "Content-Type": "application/json",
           // Authorization: "Bearer " + localStorage.getItem("token"),
          }
        }
      );

      const data= await res.json();
      if (data.success) {
        setUsers(data.data);
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const getCardNumber = async () => {
    

    try {
      // const res = await fetch(
      //   "http://localhost:8080/api/v1/user/getUserById",

      //   {
      //     method:"GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //      // Authorization: "Bearer " + localStorage.getItem("token"),
      //     }
      //   }
      // );

      // const data= await res.json();
      // if (data.success) {
      //   setUsers(data.data);
      // }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    getCardNumber();
  }, []);
  return (
    <div>
      <Layout>
      <h1 className="text-center">ABHA CARD</h1>
      <div
        className="card m-2"
      >
        <div className="card-header">
            <p>
           abha number
            </p>
          
        </div>
        <div className="card-body">
          <p>
            <b>Name</b> {users.name}
          </p>
          <p>
            <b>Age</b> {users.age}
          </p>
          <p>
            <b>Phone number</b> {users.phone}
          </p>
          <p>
            <b>Email</b> {users.email}
          </p>
          
        </div>
      </div>
        
      </Layout>
     
    </div>
  )
}

export default HomePage;