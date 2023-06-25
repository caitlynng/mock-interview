import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { firestoreDB } from 'firebaseConfig';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { AuthContext } from 'context/AuthContext';
import { addQuestion } from 'redux/slices/interviewSlice';
import { Wrapper, QuestionOptionWrapper } from './QuestionForm.styles';

const QuestionForm: React.FC = () => {
  const { currentUserId } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [type, setType] = useState('');
  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value as string);
  };

  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value as string);
  };
  const handleTypeChange = (e: SelectChangeEvent) => {
    setType(e.target.value as string);
  };

  const handleAddQuestion = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentDate = new Date();
    const milliseconds = currentDate.getTime();
    const questionId = milliseconds.toString();

    const newQuestion = {
      id: questionId,
      content: question,
      topic: '',
      difficulty: '',
      answer: answer,
      type: type,
    };

    dispatch(addQuestion(newQuestion));

    try {
      await addDoc(
        collection(firestoreDB, 'questions', questionId, 'question'),
        {
          createdBy: currentUserId,
          createdAt: Timestamp.fromDate(currentDate),
          ...newQuestion,
        },
      );
    } catch (error: any) {
      console.log(error.message);
    }

    setQuestion('');
    setAnswer('');
  };

  const questionOptions = [
    {
      option: 'Type',
      selections: ['Behavioral', 'Technical'],
    },
    {
      option: 'Dificulty',
      selections: ['Easy', 'Medium', 'Hard'],
    },
    {
      option: 'Topic',
      selections: ['JavaCcript', 'Typscript', 'MongoDB'],
    },
  ];
  return (
    <Wrapper>
      <form onSubmit={handleAddQuestion}>
        <QuestionOptionWrapper>
          {questionOptions.map((item, index) => {
            return (
              <Box sx={{ minWidth: 50, flex: 1 }} key={index}>
                <FormControl fullWidth>
                  <InputLabel id={`${item.option}-select-label`}>
                    {item.option}
                  </InputLabel>
                  <Select
                    labelId={`${item.option}-select-label`}
                    id={item.option}
                    value={item.option}
                    label={item.option}
                    onChange={handleTypeChange}
                  >
                    {item.selections.map((q, i) => {
                      return (
                        <MenuItem key={i} value={q}>
                          {q.charAt(0).toUpperCase() + q.slice(1)}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            );
          })}
        </QuestionOptionWrapper>

        <input
          type='text'
          placeholder='question'
          value={question}
          onChange={handleQuestionChange}
        />
        <input
          type='text'
          placeholder='answer'
          value={answer}
          onChange={handleAnswerChange}
        />
        <button type='submit'>Save</button>
      </form>
    </Wrapper>
  );
};

export default QuestionForm;
