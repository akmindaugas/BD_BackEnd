import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  SIGN_IN,
  LOG_IN,
  
  GET_ALL_USERS,
  GET_USER_BY_ID,

  GET_QUESTIONS,
  GET_ANSWERS,
 
  ASK_A_QUESTION,
  ANSWER_A_QUESTION,
  DELETE_A_QUESTION,
  DELETE_A_ANSWER
 
} from "../controllers/user.js";

// per si routeri kuriame visu endpointus
const router = express.Router();

router.post("/users", SIGN_IN);
router.post("/users/login", LOG_IN);

router.get("/users", GET_ALL_USERS);
router.get("/users/:id", GET_USER_BY_ID);

router.get("/users/questions", GET_QUESTIONS);
router.get("/users/answers", GET_ANSWERS);

router.post("/users/question", ASK_A_QUESTION);
router.post("/users/answerQuestion/:id", ANSWER_A_QUESTION );
router.delete("/users/questions/:id", DELETE_A_QUESTION);
router.delete("/users/answers/:id", DELETE_A_ANSWER);
// /* auth above, here!!

export default router;
