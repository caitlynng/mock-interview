import { useEffect, useContext, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from 'redux/store';
import { SelectChangeEvent } from '@mui/material/Select';
import { Question } from 'types';
import fetchAllQuestions from './useFetchQuestions';
import { AuthContext } from 'context/AuthContext';
import { setQuestions } from 'redux/slices/interviewSlice';
import { fieldOptions } from 'types';
import QuestionFilter from './QuestionFilter';
import QuestionComponent from './Question';

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

  const [type, setType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [topic, setTopic] = useState('');
  const handleTypeChange = (e: SelectChangeEvent) => {
    setType(e.target.value as string);
  };
  const handleDifficultyChange = (e: SelectChangeEvent) => {
    setDifficulty(e.target.value as string);
  };
  const handleTopicChange = (e: SelectChangeEvent) => {
    setTopic(e.target.value as string);
  };
  const handleResetFilter = () => {
    setTopic('');
    setType('');
    setDifficulty('');
  };
  const questionOptions = [
    {
      option: 'Type',
      selections: fieldOptions.type,
      handleChange: handleTypeChange,
      value: type,
      required: false,
    },
    {
      option: 'Dificulty',
      selections: fieldOptions.difficulty,
      handleChange: handleDifficultyChange,
      value: difficulty,
      required: false,
    },
    {
      option: 'Topic',
      selections: fieldOptions.topic,
      handleChange: handleTopicChange,
      value: topic,
      required: false,
    },
  ];

  useEffect(() => {
    fetchAllQuestions(currentUserId);
  }, [fetchAllQuestions, currentUserId]);

  const filteredQuestions = questions.filter((question) => {
    if (
      (type && question.type !== type) ||
      (difficulty && question.difficulty !== difficulty) ||
      (topic && question.topic !== topic)
    ) {
      return false;
    }
    return true;
  });

  if (!questions.length) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <QuestionFilter options={questionOptions} error={false} />
      <button onClick={handleResetFilter}>Reset</button>
      {filteredQuestions.map((question) => (
        <QuestionComponent
          question={question}
          key={question._id}
          index={question._id}
        />
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
