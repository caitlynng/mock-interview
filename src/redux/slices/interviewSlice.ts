import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from 'types';
interface InterviewState {
  questions: Question[];
}

const initialState: InterviewState = {
  questions: [],
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<Question>) => {
      state.questions.push(action.payload);
    },
    updateQuestion: (state, action: PayloadAction<Question>) => {
      const { id, ...updatedQuestion } = action.payload;
      const questionIndex = state.questions.findIndex(
        (question) => question.id === id,
      );
      if (questionIndex !== -1) {
        state.questions[questionIndex] = { id, ...updatedQuestion };
      }
    },
    deleteQuestion: (state, action: PayloadAction<string>) => {
      const questionIndex = state.questions.findIndex(
        (question) => question.id === action.payload,
      );
      if (questionIndex !== -1) {
        state.questions.splice(questionIndex, 1);
      }
    },
  },
});

export const { addQuestion, updateQuestion, deleteQuestion } =
  interviewSlice.actions;

export default interviewSlice.reducer;
