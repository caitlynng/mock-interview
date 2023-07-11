import { Question } from 'types';

const fetchAllQuestions = async (
  currentUserId: string,
): Promise<Question[]> => {
  try {
    const response = await fetch('/api/v1/user/all-questions');
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchAllQuestions;
