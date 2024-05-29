import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  // userId: { type: String, required: true },
  user: { type: String, required: true, unique: true },
  email: {
    type: String,
    trim: true,
    // lowercase: true,
    unique: true,
  },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
 });


export default mongoose.model("User", userSchema);
