import express from "express";
import {
  GET_ALL_QUESTIONS,
  GET_QUESTION_BY_ID,
  CREATE_QUESTION,
  DELETE_QUESTION_BY_ID,
  LIKE_QUESTION,
  DISLIKE_QUESTION,
} from "../controllers/question.js";

import { auth } from "../middlewares/auth.js";


const router = express.Router();

router.get("/questions", GET_ALL_QUESTIONS);
router.get("/questions/:id", GET_QUESTION_BY_ID);
router.post("/questions", CREATE_QUESTION);
router.delete("/questions/:id", DELETE_QUESTION_BY_ID);
router.post("/questions/like/:id", LIKE_QUESTION);
router.post("/questions/dislike/:id", DISLIKE_QUESTION);
// insert auth, where it belongs

export default router;
