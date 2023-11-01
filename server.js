const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./server/config/db");
const cors = require('cors');

const app = express();
const bd = require("body-parser")

app.use(cors());



app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT || 8080;

//const Port= process.env.Port || 8080;
//dotenv conig
dotenv.config();

//mongodb connection
connectDB();

//rest obejct


//middlewares

app.use(moragan("dev"));

//routes
app.get("/", (req,res)=>{
  res.send("hi i  am libve");
  });
app.use("/api/v1/user", require("./server/routes/userRoutes"));

//app.use("/api/v1/admin", require("./routes/adminRoutes"));
// app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

//port

//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});










// const start= async()=>{
//   try{
//       await connect_db();

//       app.listen(Port,()=>{
//        console.log( '${Port} yes I am connected')
//       });
//   }
//   catch(error){
//       console.log(error);
//   }
// };

// start();
