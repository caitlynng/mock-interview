import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface QuestionCardProps {
  question?: string;
  answer?: string;
  error?: boolean;
  handleQuestionChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAnswerChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  error,
  question,
  answer,
  handleQuestionChange,
  handleAnswerChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const questionRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLInputElement>(null);

  const handleTextFieldFocus = () => {
    setIsEditing(true);
  };

  const handleTextFieldBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (
      questionRef.current?.contains(event.target) ||
      answerRef.current?.contains(event.target)
    ) {
      return;
    }
    setIsEditing(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        questionRef.current &&
        !questionRef.current.contains(event.target as Node) &&
        answerRef.current &&
        !answerRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Card>
      <Box component='form' noValidate autoComplete='off'>
        <FormControl fullWidth>
          <TextField
            error={error && !question}
            id='question'
            label={question ? '' : 'Question'}
            value={question}
            onChange={handleQuestionChange}
            multiline
            onFocus={handleTextFieldFocus}
            onBlur={handleTextFieldBlur}
            inputRef={questionRef}
          />
        </FormControl>
      </Box>
      <Collapse in={isEditing} timeout='auto' unmountOnExit>
        <Box component='form' noValidate autoComplete='off'>
          <FormControl fullWidth>
            <TextField
              error={error && !answer}
              id='answer'
              label={answer ? '' : 'Answer'}
              value={answer}
              onChange={handleAnswerChange}
              multiline
              rows={4}
              InputProps={{
                style: {
                  minHeight: '100px',
                },
              }}
              inputRef={answerRef}
            />
          </FormControl>
        </Box>
      </Collapse>
    </Card>
  );
};

export default QuestionCard;
