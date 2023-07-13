import express from "express";
const router = express.Router();

import {
  getAllQuestions,
  addQuestion,
  editQuestion,
  deleteQuestion,
} from "../controllers/userController.js";

router.route("/all-questions").get(getAllQuestions);
router.route("/add-question").post(addQuestion);
router.route("/edit-question").post(editQuestion);
router.route("/delete-question").post(deleteQuestion);

export default router;
