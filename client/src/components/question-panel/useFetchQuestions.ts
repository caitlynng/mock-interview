import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { firestoreDB } from 'firebaseConfig';
import { Question } from 'types';

const MAX_QUESTIONS_PER_LOAD = 50;

const fetchAllQuestions = async (
  currentUserId: string,
): Promise<Question[]> => {
  const questionsRef = collection(
    firestoreDB,
    'questionList',
    currentUserId,
    'question',
  );
  const questionsQuery = query(
    questionsRef,
    orderBy('createdAt', 'desc'),
    limit(MAX_QUESTIONS_PER_LOAD),
  );

  const querySnapshot = await getDocs(questionsQuery);

  const snapshotQuestions: Question[] = [];
  querySnapshot.forEach((doc) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, ...rest } = doc.data();
    const questionId = doc.id;
    rest.id = questionId;
    snapshotQuestions.push(rest as Question);
  });

  return snapshotQuestions;
};

export default fetchAllQuestions;
