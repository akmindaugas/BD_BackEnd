import express from "express";
import {
  GET_ALL_ANSWERS,
  GET_ANSWER_BY_ID,
  INSERT_ANSWER,
  DELETE_ANSWER_BY_ID,
} from "../controllers/answer.js";

import { auth } from "../middlewares/auth.js";

// per si routeri kuriame visu endpointus
const router = express.Router();

router.get("/answers", GET_ALL_ANSWERS);
router.get("/answers/:id", GET_ANSWER_BY_ID);
router.post("/answers", INSERT_ANSWER);
router.delete("/answers/:id", DELETE_ANSWER_BY_ID);
// put aut where it belongs

export default router;
