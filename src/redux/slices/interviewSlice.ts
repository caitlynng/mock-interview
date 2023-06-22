import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InterviewState {
  behavioralQuestions: Question[];
  technicalQuestions: Question[];
  answers: Answer[];
}

interface Question {
  id: string;
  content: string;
}

interface Answer {
  questionId: string;
  answer: string;
}

const initialState: InterviewState = {
  behavioralQuestions: [],
  technicalQuestions: [],
  answers: [],
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    addQuestion: (
      state,
      action: PayloadAction<{
        type: 'behavioral' | 'technical';
        question: Question;
      }>,
    ) => {
      const { type, question } = action.payload;
      if (type === 'behavioral') {
        state.behavioralQuestions.push(question);
      } else if (type === 'technical') {
        state.technicalQuestions.push(question);
      }
    },
    deleteQuestion: (
      state,
      action: PayloadAction<{
        type: 'behavioral' | 'technical';
        questionId: string;
      }>,
    ) => {
      const { type, questionId } = action.payload;
      if (type === 'behavioral') {
        state.behavioralQuestions = state.behavioralQuestions.filter(
          (question) => question.id !== questionId,
        );
      } else if (type === 'technical') {
        state.technicalQuestions = state.technicalQuestions.filter(
          (question) => question.id !== questionId,
        );
      }
    },
    updateAnswer: (state, action: PayloadAction<Answer>) => {
      const { questionId, answer } = action.payload;
      const questionIndex = state.behavioralQuestions.findIndex(
        (question) => question.id === questionId,
      );
      if (questionIndex !== -1) {
        state.answers[questionIndex] = { questionId, answer };
      } else {
        const technicalQuestionIndex = state.technicalQuestions.findIndex(
          (question) => question.id === questionId,
        );
        if (technicalQuestionIndex !== -1) {
          state.answers[technicalQuestionIndex] = { questionId, answer };
        }
      }
    },
  },
});

export const { addQuestion, deleteQuestion, updateAnswer } =
  interviewSlice.actions;
export default interviewSlice.reducer;
