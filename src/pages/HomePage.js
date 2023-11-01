import { Row } from 'antd';
import React,{useEffect,useState} from 'react'
import Layout from "../components/Layout";
import DoctorList from '../components/DoctorList';

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const getUserData = async () => {
    

    try {
      const res = await fetch(
        "http://localhost:8080/api/v1/user/getAllDoctors",

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
        setDoctors(data.data);
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      <Layout>
      <h1 className="text-center">Home Page</h1>
      <Row>
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
      </Layout>
     
    </div>
  )
}

export default HomePage;