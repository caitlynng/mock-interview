import { useEffect, useContext, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from 'redux/store';
import { Question } from 'types';
import fetchAllQuestions from './useFetchQuestions';
import { AuthContext } from 'context/AuthContext';
import { setQuestions } from 'redux/slices/interviewSlice';

interface QuestionListProps {
  questions: Question[];
  fetchAllQuestions: (currentUserId: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  fetchAllQuestions,
}) => {
  const { currentUserId } = useContext(AuthContext);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    null,
  );
  useEffect(() => {
    fetchAllQuestions(currentUserId);
  }, [fetchAllQuestions, currentUserId]);
  const handleQuestionClick = (questionId: string) => {
    setSelectedQuestionId(questionId);
  };
  return (
    <div>
      {questions.map((question) => (
        <div key={question.id} onClick={() => handleQuestionClick(question.id)}>
          {question.content}
          {selectedQuestionId === question.id && (
            <div>
              <p>Difficulty: {question.difficulty}</p>
              <p>Topic: {question.topic}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    questions: state.interview.questions,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchAllQuestions: (currentUserId: string) => {
      const questionsPromise = fetchAllQuestions(currentUserId);
      questionsPromise.then((questions) => {
        dispatch(setQuestions(questions));
      });
    },
  };
};
// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
