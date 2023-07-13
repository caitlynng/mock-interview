import express from "express";
const router = express.Router();

import { getAllQuestions, addQuestion } from "../controllers/userController.js";

router.route("/all-questions").get(getAllQuestions);
router.route("/add-question").post(addQuestion);

export default router;
