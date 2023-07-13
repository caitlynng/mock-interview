import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import Question from "../models/Question.js";

export const getAllQuestions = async (req, res) => {
  console.log(req.user.userId);
  const { userId } = req.user;
  const data = await Question.find({
    createdBy: userId,
  });

  res.status(StatusCodes.OK).json(data);
};

export const addQuestion = async (req, res) => {
  await Question.deleteMany({});
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
export const editQuestion = async (req, res) => {
  const { _id, ...rest } = req.body.editedQuestion;
  const update = await Question.findByIdAndUpdate(_id, rest, { new: true });

  res.status(StatusCodes.OK).json({ update });
};
