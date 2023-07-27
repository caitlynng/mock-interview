import axiosFetch from 'hooks/axiosFetch';
import { useDispatch } from 'react-redux';
import { addQuestion, editQuestion } from 'redux/slices/interviewSlice';
import { Question, QuestionData } from 'types';

interface UseUpdateQuestionProps {
  type: string | undefined;
  topic: string | undefined;
  difficulty: string | undefined;
  setError?: (error: boolean) => void;
  setIsFormOpen?: (isFormOpen: boolean) => void;
  question?: string;
  answer?: string;
  updatedQuestion?: Question;
  questionList?: QuestionData[];
}

export const useUpdateQuestion = ({
  type,
  topic,
  difficulty,
  setError,
  setIsFormOpen,
  question,
  answer,
  updatedQuestion,
  questionList,
}: UseUpdateQuestionProps) => {
  const dispatch = useDispatch();

  const handleUpdateQuestion = async () => {
    if (!questionList) {
      if (!question || !type) {
        setError?.(true);
        return;
      }
    } else {
      if (!type) {
        setError?.(true);
        return;
      }

      if (type === 'Technical' && (!difficulty || !topic)) {
        setError?.(true);
        return;
      }
    }
    const newQuestion: Question = {
      question: question,
      topic: topic,
      difficulty: difficulty,
      answer: answer,
      type: type,
    };

    console.log(questionList);
    try {
      const axiosInstance = await axiosFetch();
      let responseData;

      if (updatedQuestion) {
        const editedQuestion: Question = {
          _id: updatedQuestion._id,
          ...newQuestion,
        };

        const { data, status } = await axiosInstance.post(
          '/user/edit-question',
          {
            editedQuestion,
          },
        );

        responseData = data;

        if (status === 200) {
          dispatch(editQuestion(responseData.update));
        }
      } else if (questionList) {
        const { data, status } = await axiosInstance.post(
          '/user/add-list-question',
          {
            questionList,
            type,
            topic,
            difficulty,
          },
        );

        responseData = data;

        if (status === 200) {
          responseData.updatedQuestionList.map((q: Question) => {
            dispatch(addQuestion(q));
          });
        }
      } else {
        const { data, status } = await axiosInstance.post(
          '/user/add-question',
          {
            newQuestion,
          },
        );

        responseData = data;

        if (status === 200) {
          dispatch(addQuestion(responseData.addedQuestionWithID));
        }
      }
    } catch (error: any) {
      console.log(error.response.data.msg);
    }

    setIsFormOpen?.(false);
  };

  return { handleUpdateQuestion };
};
