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
import { FilterWrapper } from './QuestionList.styles';

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

  const getQuestionOptions = () => {
    let options = [
      {
        option: 'Type',
        selections: fieldOptions.type,
        handleChange: handleTypeChange,
        value: type,
        required: true,
      },
    ];
    if (type === 'Technical') {
      options.push(
        {
          option: 'Dificulty',
          selections: fieldOptions.difficulty,
          handleChange: handleDifficultyChange,
          value: difficulty,
          required: true,
        },
        {
          option: 'Topic',
          selections: fieldOptions.topic,
          handleChange: handleTopicChange,
          value: topic,
          required: true,
        },
      );
    }
    return options;
  };
  const questionOptions = getQuestionOptions();

  useEffect(() => {
    fetchAllQuestions(currentUserId);
  }, [fetchAllQuestions, currentUserId]);

  const filteredQuestions = questions?.filter((question) => {
    if (
      (type && question.type !== type) ||
      (difficulty && question.difficulty !== difficulty) ||
      (topic && question.topic !== topic)
    ) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <FilterWrapper>
        <QuestionFilter
          options={questionOptions}
          error={false}
          resetBtn={handleResetFilter}
        />
      </FilterWrapper>
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
