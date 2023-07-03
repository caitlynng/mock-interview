import React, { useState, ChangeEvent, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { firestoreDB } from 'firebaseConfig';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SelectChangeEvent } from '@mui/material/Select';

import { AuthContext } from 'context/AuthContext';
import { addQuestion } from 'redux/slices/interviewSlice';
import { Wrapper } from './QuestionForm.styles';
import { Question, fieldOptions } from 'types';
import QuestionFilter from './QuestionFilter';

interface QuestionFormProps {
  updatedQuestion: Question | undefined;
  editing: boolean;
  setEditing: (editing: boolean) => void;
}
const QuestionForm: React.FC<QuestionFormProps> = ({
  updatedQuestion,
  editing,
  setEditing,
}) => {
  const { currentUserId } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [question, setQuestion] = useState('' || updatedQuestion?.content);
  const [answer, setAnswer] = useState('' || updatedQuestion?.answer);
  const [type, setType] = useState('' || updatedQuestion?.type);
  const [difficulty, setDifficulty] = useState(
    '' || updatedQuestion?.difficulty,
  );
  const [topic, setTopic] = useState('' || updatedQuestion?.topic);
  const [error, setError] = useState(false);

  console.log(updatedQuestion);
  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value as string);
  };

  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value as string);
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

    const currentDate = new Date();
    const milliseconds = currentDate.getTime();
    const questionId = milliseconds.toString();

    const newQuestion: Question = {
      id: questionId,
      content: question,
      topic: topic,
      difficulty: difficulty,
      answer: answer,
      type: type,
    };

    dispatch(addQuestion(newQuestion));

    try {
      await addDoc(
        collection(firestoreDB, 'questionList', currentUserId, 'question'),
        {
          createdAt: Timestamp.fromDate(currentDate),
          ...newQuestion,
        },
      );
    } catch (error: any) {
      console.log(error.message);
    }

    handleClearQuestion();
  };

  const handleEditQuestion = () => {
    console.log('edit');
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
  return (
    <Wrapper>
      <QuestionFilter options={questionOptions} error={error} />

      <Box component='form' noValidate autoComplete='off'>
        <FormControl fullWidth>
          <TextField
            error={error && !question}
            required
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
            required
            id='answer'
            label='Answer'
            value={answer}
            onChange={handleAnswerChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </Box>

      <Button
        variant='contained'
        type='submit'
        onClick={editing ? handleEditQuestion : handleAddQuestion}
      >
        Save
      </Button>
      {editing ? (
        <Button type='button' variant='text' onClick={() => setEditing(false)}>
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
