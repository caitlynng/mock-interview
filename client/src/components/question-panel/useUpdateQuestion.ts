import { Question } from 'types';
import axiosFetch from 'hooks/axiosFetch';
import { useDispatch } from 'react-redux';
import { addQuestion, editQuestion } from 'redux/slices/interviewSlice';

export const useUpdateQuestion = (
  question: string,
  answer: string,
  type: string,
  topic: string,
  difficulty: string,
  setError: (error: boolean) => void,
  setIsFormOpen: (isFormOpen: boolean) => void,
  updatedQuestion?: Question,
) => {
  const dispatch = useDispatch();

  const handleUpdateQuestion = async () => {
    if (!question || !answer || !type || !topic || !difficulty) {
      setError(true);
      return;
    }

    const newQuestion: Question = {
      content: question,
      topic: topic,
      difficulty: difficulty,
      answer: answer,
      type: type,
    };

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
