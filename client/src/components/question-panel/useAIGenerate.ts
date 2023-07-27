import axiosFetch from 'hooks/axiosFetch';

interface getAIGeneratedQuestionProps {
  type: string | undefined;
  difficulty: string | undefined;
  topic: string | undefined;
}
interface QuestionData {
  question: string;
  answer: string;
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
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
