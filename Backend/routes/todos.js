const express = require("express");
const router = express.Router();

//import controller
const { createTodo } = require("../controllers/createTodo");
const { getTodo, getTodoById } = require("../controllers/getTodo");
const { updateTodo } = require("../controllers/updateTodo");
const { deleteTodo } = require("../controllers/deleteTodo");
const { auth } = require("../middlewares/auth");




//define APi routes
// router.post("/createTodo", auth, createTodo);
// router.get("/getTodos", auth, getTodo);
// router.get("/getTodos/:id", auth, getTodoById);
// router.put("/updateTodo/:id", auth, updateTodo);
// router.delete("/deleteTodo/:id", auth, deleteTodo);
//clerk Implementation
router.post("/createTodo",  createTodo);
router.get("/getTodos",  getTodo);
router.get("/getTodos/:id",  getTodoById);
router.put("/updateTodo/:id",  updateTodo);
router.delete("/deleteTodo/:id",  deleteTodo);

module.exports = router;
