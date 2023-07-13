import React, { useState, ChangeEvent, useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  addDoc,
  collection,
  Timestamp,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { firestoreDB } from 'firebaseConfig';
import axiosFetch from 'hooks/axiosFetch';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SelectChangeEvent } from '@mui/material/Select';

import { AuthContext } from 'context/AuthContext';
import { addQuestion, editQuestion } from 'redux/slices/interviewSlice';
import { Wrapper } from './QuestionForm.styles';
import { Question, fieldOptions } from 'types';
import QuestionFilter from './QuestionFilter';

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
  const { currentUserId } = useContext(AuthContext);
  const dispatch = useDispatch();
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
  const handleAddQuestion = async () => {
    if (!question || !answer || !type || !topic || !difficulty) {
      setError(true);
      return;
    }
    const newQuestion: Question = {
      content: question,
      topic: topic,
      difficulty: difficulty,
      answer: answer,
      type: type,
    };

    try {
      const { data, status } = await axiosFetch.post('/user/add-question', {
        newQuestion,
      });
      if (status === 200) {
        dispatch(addQuestion(data.addedQuestionWithID));
      }
    } catch (error: any) {
      console.log(error.response.data.msg);
    }
    setIsFormOpen?.(false);
  };

  const handleEditQuestion = async () => {
    const updatedQuestionChange: Question = {
      content: question,
      topic: topic,
      difficulty: difficulty,
      answer: answer,
      type: type,
    };
    dispatch(editQuestion(updatedQuestionChange));
    try {
    } catch (error: any) {
      console.log(error.response.data.msg);
    }
    setIsFormOpen?.(false);
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
          />
        </FormControl>
      </Box>

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

      <Button
        variant='contained'
        type='submit'
        onClick={updatedQuestion ? handleEditQuestion : handleAddQuestion}
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
    </Wrapper>
  );
};

export default QuestionForm;
