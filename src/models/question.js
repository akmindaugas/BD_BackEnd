import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  user: { type: String, required: true },
  content: { type: Number, required: true },
  photoUrl: { type: String, required: false },
});

export default mongoose.model("Question", questionSchema);
