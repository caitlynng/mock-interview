import { StatusCodes } from "http-status-codes";
import Question from "../models/Question.js";
import "dotenv/config";

export const getAllQuestions = async (req, res) => {
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
export const deleteQuestion = async (req, res) => {
  const { questionID } = req.body;
  const update = await Question.findOneAndDelete(questionID);

  res.status(StatusCodes.OK).json({ update });
};
export const getQuestion = async (req, res) => {
  console.log("get question");
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const url = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  };

  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: "Generate an interview behavioral question" },
    ],
  };

  async function callOpenAI() {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      res.status(StatusCodes.OK).json({ result });
    } catch (error) {
      // Handle any errors that occurred during the fetch request
      console.error("Error:", error);
    }
  }

  callOpenAI();
};
