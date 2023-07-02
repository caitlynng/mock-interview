import { Question } from 'types';
import React, { useState, ChangeEvent } from 'react';
import List from '@mui/material/List';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Wrapper, QuestionTheme } from './Question.styles';

interface QuestionProps {
  question: Question;
  key: number;
}

const QuestionComponent: React.FC<QuestionProps> = ({ question, key }) => {
  const [open, setOpen] = useState(true);
  const [editing, setEditing] = useState(false);
  const [answerText, setAnswerText] = useState(question.answer);

  const questionTheme = createTheme({
    components: { ...QuestionTheme },
  });

  const handleQuestionClick = () => {
    setOpen(!open);
  };

  const handleAnswerEditClick = () => {
    setEditing(true);
  };

  const handleAnswerSaveClick = () => {
    setEditing(false);
  };

  const handleAnswerCancelClick = () => {
    setEditing(false);
  };
  const handleAnswerDeleteClick = () => {
    console.log('delete');
  };

  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswerText(event.target.value);
  };
  console.log(question);

  return (
    <Wrapper key={key}>
      <ThemeProvider theme={questionTheme}>
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            boxShadow: `${open && 'rgba(0, 0, 0, 0.1) 0px 4px 12px'}`,
          }}
          component='nav'
          aria-labelledby='nested-list-subheader'
        >
          <ListItemButton
            onClick={handleQuestionClick}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <ListItemText primary={question.content} />
            <Stack direction='row' spacing={1} sx={{ marginLeft: 'auto' }}>
              <Chip label={question.type} />
              <Chip label={question.difficulty} />
              <Chip label={question.topic} />
            </Stack>
          </ListItemButton>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                {editing ? (
                  <>
                    <TextField
                      value={answerText}
                      onChange={handleAnswerChange}
                      fullWidth
                      autoFocus
                    />
                    <Button onClick={handleAnswerSaveClick}>Save</Button>
                    <Button onClick={handleAnswerCancelClick}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <div>{answerText}</div>
                    <Button onClick={handleAnswerEditClick}>Edit</Button>
                    <Button onClick={handleAnswerDeleteClick}>Delete</Button>
                  </>
                )}
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </ThemeProvider>
    </Wrapper>
  );
};

export default QuestionComponent;
