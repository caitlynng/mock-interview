import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required."],
    },
    question: {
      type: String,
      required: [true, "Question is required."],
    },
    topic: {
      type: String,
    },
    difficulty: {
      type: String,
    },
    answer: {
      type: String,
    },
    type: {
      type: String,
      required: [true, "Type is required."],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Question", QuestionSchema);
