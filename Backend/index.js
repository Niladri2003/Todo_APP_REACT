//instansiate server
const express = require("express");
const app = express();
require("dotenv").config();
const dbConnect = require("./config/database");
const cookieParser = require("cookie-parser");
const {LooseAuthProp} =require('@clerk/clerk-sdk-node');

//load config from env file


const PORT = process.env.PORT || 4000;

//middleware to parse json request body
//connect to the database

dbConnect();

app.use(express.json());
app.use(cookieParser());

//import routes for TODO API
const todoRoutes = require("./routes/todos");
const UserRoutes = require("./routes/User");

//
if(process.env.ENVIRONMENT=="dev"){
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin',`${process.env.LOCAL_FRONTEND}` );
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,token');
    res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
}
else{
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin',`${process.env.DEPLOYED_FRONTEND}` );
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,token');
    res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
}



//mount the todo API routes
app.use("/api/v1", todoRoutes);
app.use("/api/v1/auth", UserRoutes);

//start server
app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT} `);
  if(process.env.ENVIRONMENT=="dev"){
    console.log("CORS URL =>",process.env.LOCAL_FRONTEND);
  }else{
    console.log("CORS URL =>",process.env.DEPLOYED_FRONTEND);
  }
});

//default Route
app.get("/", (req, res) => {
  res.send(`<h1> This is HOMEPAGE baby</h1>`);
});
