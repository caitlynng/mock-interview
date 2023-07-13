import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required."],
    },
    content: {
      type: String,
      required: [true, "Question is required."],
    },
    topic: {
      type: String,
      required: [true, "Topic is required."],
    },
    difficulty: {
      type: String,
      required: [true, "Difficulty is required."],
    },
    answer: {
      type: String,
      required: [true, "Answer is required."],
    },
    type: {
      type: String,
      required: [true, "Type is required."],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Question", QuestionSchema);
