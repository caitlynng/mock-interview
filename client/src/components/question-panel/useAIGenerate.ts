import axiosFetch from 'hooks/axiosFetch';
import { QuestionData } from 'types';
interface getAIGeneratedQuestionProps {
  type: string | undefined;
  difficulty: string | undefined;
  topic: string | undefined;
}

export const getAIGeneratedQuestion = async ({
  type,
  difficulty,
  topic,
}: getAIGeneratedQuestionProps): Promise<QuestionData[]> => {
  try {
    const axiosInstance = await axiosFetch();
    const response = await axiosInstance.post('/user/get-question', {
      type,
      difficulty,
      topic,
    });
    const data: QuestionData[] = response.data.questionList;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
