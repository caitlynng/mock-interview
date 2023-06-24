import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from 'types';
interface InterviewState {
  behavioralQuestions: Question[];
  technicalQuestions: Question[];
}

const initialState: InterviewState = {
  behavioralQuestions: [],
  technicalQuestions: [],
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
    updateQuestion: (
      state,
      action: PayloadAction<{
        type: 'behavioral' | 'technical';
        questionId: string;
        updatedQuestion: Question;
      }>,
    ) => {
      const { type, questionId, updatedQuestion } = action.payload;
      if (type === 'behavioral') {
        const questionIndex = state.behavioralQuestions.findIndex(
          (question) => question.id === questionId,
        );
        if (questionIndex !== -1) {
          state.behavioralQuestions[questionIndex] = {
            ...state.behavioralQuestions[questionIndex],
            ...updatedQuestion,
          };
        }
      } else if (type === 'technical') {
        const questionIndex = state.technicalQuestions.findIndex(
          (question) => question.id === questionId,
        );
        if (questionIndex !== -1) {
          state.technicalQuestions[questionIndex] = {
            ...state.behavioralQuestions[questionIndex],
            ...updatedQuestion,
          };
        }
      }
    },
  },
});

export const { addQuestion, deleteQuestion, updateQuestion } =
  interviewSlice.actions;
export default interviewSlice.reducer;
