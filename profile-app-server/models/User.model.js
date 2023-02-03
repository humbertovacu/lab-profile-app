const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    campus: {
      type: String, 
      required: true,
      enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "México", "Sao Paulo", "Lisbon", "Remote"]
    },
    course: {
      type: String,
      required: true,
      enum: ["Web Dev", "UX/UI", "Data Analytics", "Cyber Security"]
    },
    image: {
      type: String
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
