import mongoose from "mongoose";
import User from "./user.js"



const answerSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  userId: { 
    ref: User,
    required: true,
  },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  votesUp: { type: Number, default: 0 },
  votesDown: { type: Number, default: 0 },
});

export default mongoose.model("Answer", answerSchema);
