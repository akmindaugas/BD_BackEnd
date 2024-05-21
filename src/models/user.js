import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    // lowercase: true,
    unique: true,
  },
  password: { type: String, required: true },
  questions: [],
  answers: [],

});

export default mongoose.model("User", userSchema);
