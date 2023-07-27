import React, { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SelectChangeEvent } from '@mui/material/Select';

import { Wrapper } from './QuestionForm.styles';
import { Question, fieldOptions } from 'types';
import QuestionFilter from './QuestionFilter';
import { useUpdateQuestion } from './useUpdateQuestion';
import { getAIGeneratedQuestion } from './useAIGenerate';
import QuestionCard from './QuestionCard';
import QuestionIdeas from './QuestionIdeas';

interface QuestionFormProps {
  updatedQuestion?: Question | undefined;
  isFormOpen?: boolean;
  setIsFormOpen?: (isFormOpen: boolean) => void;
}
const QuestionForm: React.FC<QuestionFormProps> = ({
  updatedQuestion,
  isFormOpen,
  setIsFormOpen,
}) => {
  const [question, setQuestion] = useState<string>(
    updatedQuestion?.content || '',
  );
  const [answer, setAnswer] = useState<string>(updatedQuestion?.answer || '');
  const [type, setType] = useState('' || updatedQuestion?.type);
  const [difficulty, setDifficulty] = useState(
    '' || updatedQuestion?.difficulty,
  );
  const [topic, setTopic] = useState('' || updatedQuestion?.topic);
  const [error, setError] = useState(false);
  const [showQuestionIdeas, setShowQuestionIdeas] = useState(false);
  const { handleUpdateQuestion } = useUpdateQuestion(
    question,
    answer,
    type || '',
    topic || '',
    difficulty || '',
    setError,
    setIsFormOpen || (() => {}),
    updatedQuestion,
  );
  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const capitalizedQuest = value
      ? value.charAt(0).toUpperCase() + value.slice(1)
      : '';
    setQuestion(capitalizedQuest);
  };

  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const capitalizedAnswer = value
      ? value.charAt(0).toUpperCase() + value.slice(1)
      : '';
    setAnswer(capitalizedAnswer);
  };
  const handleTypeChange = (e: SelectChangeEvent) => {
    setType(e.target.value as string);
  };
  const handleDifficultyChange = (e: SelectChangeEvent) => {
    setDifficulty(e.target.value as string);
  };
  const handleTopicChange = (e: SelectChangeEvent) => {
    setTopic(e.target.value as string);
  };

  const handleClearQuestion = () => {
    setQuestion('');
    setAnswer('');
    setTopic('');
    setType('');
    setDifficulty('');
    setError(false);
  };

  const handleQuestionGenerating = async () => {
    if (!type || (type === 'Technical' && !difficulty && !topic)) {
      setError(true);
    } else {
      setShowQuestionIdeas(!showQuestionIdeas);
    }
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

  return (
    <Wrapper>
      <QuestionFilter options={questionOptions} error={error} />

      <Button onClick={handleQuestionGenerating}>Browse question ideas</Button>
      {showQuestionIdeas ? (
        <QuestionIdeas type={type} difficulty={difficulty} topic={topic} />
      ) : (
        <div>
          <QuestionCard
            answer={answer}
            question={question}
            handleAnswerChange={handleAnswerChange}
            handleQuestionChange={handleQuestionChange}
            error={error}
          />
          <Button
            variant='contained'
            type='submit'
            onClick={handleUpdateQuestion}
          >
            Save
          </Button>
          {isFormOpen ? (
            <Button
              type='button'
              variant='text'
              onClick={() => setIsFormOpen?.(false)}
            >
              Cancel
            </Button>
          ) : (
            <Button type='button' variant='text' onClick={handleClearQuestion}>
              Clear
            </Button>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default QuestionForm;
