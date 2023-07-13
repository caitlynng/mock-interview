import { StatusCodes } from "http-status-codes";
import Question from "../models/Question.js";

export const getAllQuestions = async (req, res) => {
  const data = [
    {
      id: "dfhdukfhdkdfdf",
      content: "first question",
      topic: "JavaScript",
      difficulty: "Medium",
      answer: "test",
      type: "Technical",
    },
  ];

  res.status(StatusCodes.OK).json(data);
};

export const addQuestion = async (req, res) => {
  const { newQuestion } = req.body;
  const addedQuestion = await Question.create({
    createdBy: req.user.userId,
    ...newQuestion,
  });
  const addedQuestionWithID = await Question.findOne({
    _id: addedQuestion._id,
  });

  res.status(StatusCodes.OK).json({ addedQuestionWithID });
};
