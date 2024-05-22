import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  user: { type: String, required: true },
  content: { type: String, required: true },
  photoUrl: { type: String, required: false },
  like: { type: Number, required: false },
  dislike: { type: Number, required: false },
  answers: {type: Boolean, required: false}
  
});

export default mongoose.model("Question", questionSchema);
