import express from "express";
const router = express.Router();

import {
  getAllQuestions,
  addQuestion,
  addListQuestion,
  editQuestion,
  deleteQuestion,
  getQuestion,
} from "../controllers/userController.js";

router.route("/all-questions").get(getAllQuestions);
router.route("/add-question").post(addQuestion);
router.route("/add-list-question").post(addListQuestion);
router.route("/edit-question").post(editQuestion);
router.route("/delete-question").post(deleteQuestion);
router.route("/get-question").post(getQuestion);

export default router;
