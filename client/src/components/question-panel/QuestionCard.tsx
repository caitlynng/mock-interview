import React, { ChangeEvent, useState } from 'react';
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

  const handleTextFieldFocus = () => {
    setIsEditing(true);
  };

  const handleTextFieldBlur = () => {
    setIsEditing(false);
  };

  return (
    <Card>
      <Box component='form' noValidate autoComplete='off'>
        <FormControl fullWidth>
          <TextField
            error={error && !question}
            id='question'
            label='Question'
            value={question}
            onChange={handleQuestionChange}
            multiline
            onFocus={handleTextFieldFocus}
            onBlur={handleTextFieldBlur}
          />
        </FormControl>
      </Box>
      <Collapse in={!!question || isEditing} timeout='auto' unmountOnExit>
        <Box component='form' noValidate autoComplete='off'>
          <FormControl fullWidth>
            <TextField
              error={error && !answer}
              id='answer'
              label='Answer'
              value={answer}
              onChange={handleAnswerChange}
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
      </Collapse>
    </Card>
  );
};

export default QuestionCard;
