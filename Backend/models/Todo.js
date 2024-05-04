const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50,
  },
  description: {
    type: String,
    required: true,
    maxLength: 50,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
