import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const questionSchema = new mongoose.Schema({
  id: {
    type: String, 
    default: uuidv4, 
    required: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  photoUrl: {type: String, required: false},
  userId: { 
    type: String,
    ref: 'User',
    required: true,
  },
  // createdAt: { type: Date },
  // updatedAt: { type: Date },
  votesUp: { type: Number, required: false },
  votesDown: { type: Number, required: false}

});

export default mongoose.model("Question", questionSchema);
