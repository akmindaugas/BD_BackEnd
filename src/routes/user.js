import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  SIGN_IN,
  LOG_IN,
  
  GET_ALL_USERS,
  GET_USER_BY_ID,

 
} from "../controllers/user.js";

// per si routeri kuriame visu endpointus
const router = express.Router();

router.post("/users", SIGN_IN);
router.post("/users/login", LOG_IN);

router.get("/users", GET_ALL_USERS);
router.get("/users/:id", GET_USER_BY_ID);


// /* auth above, here!!

export default router;
