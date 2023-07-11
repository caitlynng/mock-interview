import express from "express";
const router = express.Router();

import { getAllQuestions } from "../controllers/userController.js";

router.route("/all-questions").get(getAllQuestions);

export default router;
