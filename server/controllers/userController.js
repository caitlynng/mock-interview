import { StatusCodes } from "http-status-codes";

export const getAllQuestions = async (req, res) => {
  console.log(req);
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
