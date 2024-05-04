//import th model
const Todo = require("../models/Todo");
const { verifyToken } = require('@clerk/backend');
const { sessions } =require('@clerk/clerk-sdk-node');
require("dotenv").config();
const jwt = require("jsonwebtoken");
exports.createTodo = async (req, res) => {
  const token=req.body.token || null;
  const publicKey=process.env.CLERK_JWT_KEY;
  try {
    //extract title and desxcription from reauest body
    const { title, description,sessionId,userId } = req.body;
    // const clientToken = req.header("Authorization").replace("Bearer ", "");
    console.log("Token=>",token,"Session Id=>",sessionId);
    console.log("PEM_KEY",process.env.JWT_PUBLIC_KEY);
    // const session = await sessions.verifySession(sessionId, token);
    const decoded = await verifyToken(token, {
      publicKey,
      algorithms: ['RS256'] // Specify the algorithm used to sign the token
    });
    //console.log(typeof token);
    console.log("Decode",decoded);
    //const session=await sessions.verifySession(sessionId,clientToken);

    //create a new Todo Obj and insert in DB
   // console.log("USER==>", req.user.id);
    const response = await Todo.create({
      title,
      description,
      user: req.user.id,
    });
    //send a json response with a success flag

    res.status(200).json({
      success: true,
      data: response,
      message: "Entry Created Successfully",
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: err.message,
    });
  }
};
