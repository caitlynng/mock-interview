import { Question } from 'types';
import axiosFetch from 'hooks/axiosFetch';

const fetchAllQuestions = async (
  currentUserId: string,
): Promise<Question[]> => {
  try {
    const response = await axiosFetch.get('/user/all-questions');
    const data: Question[] = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchAllQuestions;
