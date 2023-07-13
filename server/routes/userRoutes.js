import express from "express";
const router = express.Router();

import {
  getAllQuestions,
  addQuestion,
  editQuestion,
} from "../controllers/userController.js";

router.route("/all-questions").get(getAllQuestions);
router.route("/add-question").post(addQuestion);
router.route("/edit-question").post(editQuestion);

export default router;
