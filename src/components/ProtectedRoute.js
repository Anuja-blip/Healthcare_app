import React, { useEffect } from "react";
import {Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";

export default function  ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const { user } = useSelector((state) => state.user);
  const getUser = async () => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/user/getUserData",

      {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      }
    );

    const data =await response.json();
console.log(data);

if (data.success== true) {
  dispatch(setUser(data.data));
} else {
  console.log("something went wrong int protected routes");
  navigate("/login");
}
  } catch (error) {
    console.log(error);
  }

};
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);



  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
