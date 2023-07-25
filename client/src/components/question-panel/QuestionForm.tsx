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
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const generatedQuestion = await getAIGeneratedQuestion();
      setQuestion(generatedQuestion);
    } catch (error) {
      setErrorMessage('There was an error generating question');
    }

    setLoading(false);
  };
  const questionOptions = [
    {
      option: 'Type',
      selections: fieldOptions.type,
      handleChange: handleTypeChange,
      value: type,
      required: true,
    },
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
  ];
  return (
    <Wrapper>
      <QuestionFilter options={questionOptions} error={error} />

      <Box component='form' noValidate autoComplete='off'>
        <FormControl fullWidth>
          <TextField
            error={error && !question}
            id='question'
            label='Question'
            value={question}
            onChange={handleQuestionChange}
            InputLabelProps={{
              shrink: true,
            }}
            multiline
          />
        </FormControl>
      </Box>
      <Button onClick={handleQuestionGenerating} disabled={loading}>
        {loading ? 'Generating question...' : 'Generate a question for me'}
      </Button>
      <Box component='form' noValidate autoComplete='off'>
        <FormControl fullWidth>
          <TextField
            error={error && !answer}
            id='answer'
            label='Answer'
            value={answer}
            onChange={handleAnswerChange}
            InputLabelProps={{
              shrink: true,
            }}
            multiline
            rows={4}
            InputProps={{
              style: {
                minHeight: '100px',
              },
            }}
          />
        </FormControl>
      </Box>

      <Button variant='contained' type='submit' onClick={handleUpdateQuestion}>
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
    </Wrapper>
  );
};

export default QuestionForm;
