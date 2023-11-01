import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Adhar from "./pages/Adhar";
import Otp from "./pages/Otp";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AbhaCard from "./pages/AbhaCard";
import ApplyDoctor from "./pages/ApplyDoctor";
import BookingPage from "./pages/bookingPage"
import Profile from "./pages/Profile";

function App() {
  return (
    <React.StrictMode>
    <>
      <BrowserRouter>
      <Routes>
        
        <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
          
        <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
        <Route
              path="/Adhar"
              element={
                <ProtectedRoute>
                  <Adhar />
                </ProtectedRoute>
              }
            />
             <Route
              path="/apply-doctor"
              element={
                <ProtectedRoute>
                  <ApplyDoctor />
                </ProtectedRoute>
              }
            />

           <Route
              path="/doctor/book-appointment/:doctorId"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
             <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
        <Route path="/Otp" element={<Otp/>}/>
        <Route path="/Abha" element={<AbhaCard/>}/>

      </Routes>
      </BrowserRouter>
    </>
    </React.StrictMode>
  )
}

export default App

