import mongoose from "mongoose";


// const userProperties = {
//     _id: mongoose.Schema.Types.ObjectId,
//     user: String,
//     email: String,
//     password: String,
//     createdAt: Date,
//     updatedAt: Date,
//   }
//   export default userProperties;

const userSchema = new mongoose.Schema({
  user: String,
  email: String,
  password: String,
  createdAt: Date,
  updatedAt: Date,
});
export default mongoose.model("User", userSchema);



