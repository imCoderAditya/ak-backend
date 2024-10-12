// user_routes.js
import express from "express";
import {
  register,
  login,
  getByIdUser,
} from "../controllers/user_controller.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/users/{id}", getByIdUser);

export default router;
