import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
//import DoctorList from "../components/DoctorList";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
//import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
    const navigate= useNavigate();
  //const { user } = useSelector((state) => state.user);
  const params  = useParams();
  const [doctor, setDoctor] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  // const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();
  // login user data
  const handleBooking= async()=>{
    message.success("BOOKING SUCCESSFUL");
    navigate("/");
  };
  const getUserData = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/v1/user/getDoctorById",
      
        {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
            //  Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ doctorId: params.doctorId }),
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
  
  // =============== booking func
//   const handleBooking = async () => {
//     try {
//       setIsAvailable(true);
//       if (!date && !time) {
//         return alert("Date & Time Required");
//       }
//       dispatch(showLoading());
//       const res = await axios.post(
//         "/api/v1/user/book-appointment",
//         {
//           doctorId: params.doctorId,
//           userId: user._id,
//           doctorInfo: doctor,
//           userInfo: user,
//           date: date,
//           time: time,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       dispatch(hideLoading());
//       if (res.data.success) {
//         message.success(res.data.message);
//       }
//     } catch (error) {
//       dispatch(hideLoading());
//       console.log(error);
//     }
//   };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h3>Booking Page</h3>
      {<div className="container m-2">
        {doctor && (
          <div>
            <h4>
              Dr. {doctor.firstname} {doctor.lastname}
            </h4>
            <h4>Fees : {doctor.feesPerCunsaltation}</h4>
            {/* <h4>
              Timings : {doctor.timings && doctor.timings[0]} -{" "}
              {doctor.timings && doctor.timings[1]}{" "}
            </h4> */}
            <div className="d-flex flex-column w-50">
              <DatePicker
                aria-required={"true"}
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                aria-required={"true"}
                format="HH:mm"
                className="mt-3"
                onChange={(value) => {
                  setTime(moment(value).format("HH:mm"));
                }}
              />

              {/* <button
                className="btn btn-primary mt-2"
                onClick={handleAvailability}
              >
                Check Availability
            </button>*/}

              <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Now
              </button> 
            </div>
          </div>
        )}
      </div> }
    </Layout>
  );
};

export default BookingPage;
