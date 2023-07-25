import axiosFetch from 'hooks/axiosFetch';

interface ResponseData {
  result: {
    choices: [
      {
        message: {
          content: string;
        };
      },
    ];
  };
}

export const getAIGeneratedQuestion = async (): Promise<string> => {
  try {
    const axiosInstance = await axiosFetch();
    const response = await axiosInstance.get('/user/get-question');
    const data: ResponseData = response.data;
    const question = data?.result.choices[0].message.content;
    console.log(question);
    return question;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
