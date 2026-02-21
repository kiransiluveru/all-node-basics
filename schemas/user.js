import mongoose from "mongoose";

const user = new mongoose.Schema({
  name: { type: String },
  age: Number,
  email: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", user);

export default User;
