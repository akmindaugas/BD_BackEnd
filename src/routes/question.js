import express from "express";
import {
  GET_ALL_QUESTIONS,
  GET_QUESTION_BY_ID,
  CREATE_QUESTION,
  DELETE_QUESTION_BY_ID,
} from "../controllers/question.js";

import { auth } from "../middlewares/auth.js";

// per si routeri kuriame visu endpointus
const router = express.Router();

router.get("/questions", GET_ALL_QUESTIONS);
router.get("/questions/:id", GET_QUESTION_BY_ID);
router.post("/questions", CREATE_QUESTION);
router.delete("/questions/:id", DELETE_QUESTION_BY_ID);
// insert auth, where it belongs

export default router;
