import axiosFetch from 'hooks/axiosFetch';

interface getAIGeneratedQuestionProps {
  type: string | undefined;
  difficulty: string | undefined;
  topic: string | undefined;
}

export const getAIGeneratedQuestion = async ({
  type,
  difficulty,
  topic,
}: getAIGeneratedQuestionProps): Promise<string> => {
  try {
    const axiosInstance = await axiosFetch();
    const response = await axiosInstance.post('/user/get-question', {
      type,
      difficulty,
      topic,
    });
    const data: string = response.data.filteredResponse;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
