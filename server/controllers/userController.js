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
  // await Question.deleteMany({});
  const { newQuestion } = req.body;

  if (!newQuestion.question || !newQuestion.type) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Missing required fields." });
  }

  if (type === "Technical" && (!difficulty || !topic)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Missing required fields." });
  }

  const addedQuestion = await Question.create({
    createdBy: req.user.userId,
    ...newQuestion,
  });
  const addedQuestionWithID = await Question.findOne(
    {
      _id: addedQuestion._id,
    },
    { updatedAt: 0, createdAt: 0, createdBy: 0, __v: 0 }
  );

  res.status(StatusCodes.OK).json({ addedQuestionWithID });
};
export const addListQuestion = async (req, res) => {
  // await Question.deleteMany({});
  const { questionList, type, topic, difficulty } = req.body;

  console.log(questionList);
  if (!questionList || !type) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Missing required fields." });
  }
  if (type === "Technical" && (!difficulty || !topic)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Missing required fields." });
  }
  let updatedQuestionList = [];
  await Promise.all(
    questionList.map(async (q) => {
      const addedQuestion = await Question.create({
        createdBy: req.user.userId,
        ...q,
        difficulty: difficulty,
        topic: topic,
        type: type,
      });
      const addedQuestionWithID = await Question.findOne(
        { _id: addedQuestion._id },
        { updatedAt: 0, createdAt: 0, createdBy: 0, __v: 0 }
      );
      updatedQuestionList.push(addedQuestionWithID);
    })
  );

  res.status(StatusCodes.OK).json({ updatedQuestionList });
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
  const getQuestionContent = () => {
    const { topic, difficulty, type } = req.body;
    const question = [
      type
        ? `Create a list of 2 ${type} questions with frontend developer`
        : "",
      difficulty ? `with ${difficulty} difficulty` : "",
      topic ? `and ${topic} concept` : "",
    ];
    return question.filter(Boolean).join(" ");
  };

  console.log(getQuestionContent());
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const url = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  };
  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: getQuestionContent(),
      },
    ],
    max_tokens: 200,
    temperature: 0.2,
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
      const content = result?.choices[0].message.content;
      const arrayOfQuestions = content
        .split(/\d+\./)
        .filter((str) => str.trim() !== "");
      const questionList = arrayOfQuestions.map((questionText) => ({
        question: questionText,
        answer: "",
      }));

      res.status(StatusCodes.OK).json({ questionList });
    } catch (error) {
      // Handle any errors that occurred during the fetch request
      console.error("Error:", error);
    }
  }

  callOpenAI();
};
