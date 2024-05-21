import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
// routo takelyje items turi buti su pletiniu .js, kitaip nesuveiks
import answerRoutes from "./src/routes/answer.js";
import questionRoutes from "./src/routes/question.js"
import userRoutes from "./src/routes/user.js";

const app = express();
// pasakome, kad duomenis gauname json formatu
app.use(express.json());
// problema: meta klaida perejus prie loginimosi processinimo is .env

app.use(cors());
mongoose
  // .connect(process.env.MONGO_CONNECTION)
  .connect(process.env.uri)
  .then(() => console.log("connected to DB"))
  .catch((err) => {
    console.log("ERR:", err);
  });

// uznaudojam, kitaip neras endpointo
app.use(userRoutes);
app.use(answerRoutes);
app.use(questionRoutes);

app.use((req, res) => {
  return res.status(404).json({ message: "this endpoint does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log("app started on port:", process.env.PORT);
});
