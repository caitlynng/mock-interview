import React, { useState, useContext } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { firestoreDB } from 'firebaseConfig';
import { useDispatch } from 'react-redux';
import List from '@mui/material/List';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

import { Question } from 'types';
import { Wrapper, QuestionTheme } from './Question.styles';
import QuestionForm from './QuestionForm';
import { AuthContext } from 'context/AuthContext';
import { deleteQuestion } from 'redux/slices/interviewSlice';

interface QuestionProps {
  question: Question;
  index: string | undefined;
}

const QuestionComponent: React.FC<QuestionProps> = ({ question, index }) => {
  const { currentUserId } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const questionTheme = createTheme({
    components: { ...QuestionTheme },
  });

  const handleQuestionClick = () => {
    setOpen(!open);
  };

  const handleAnswerEditClick = () => {
    setEditing(true);
  };

  const handleAnswerDeleteClick = async () => {
    const docPath = `questionList/${currentUserId}/question/${question?.id}`;

    try {
      await deleteDoc(doc(firestoreDB, docPath));
      dispatch(deleteQuestion(question.id));
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const questionOnRender = () => {
    return (
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          boxShadow: `${open && 'rgba(255, 0, 0, 0.1) 0px 4px 12px'}`,
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
              <>
                <div>{question.answer}</div>
                <Button onClick={handleAnswerEditClick}>Edit</Button>
                <Button onClick={handleAnswerDeleteClick}>Delete</Button>
              </>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    );
  };

  const questionOnEdit = () => {
    return (
      <QuestionForm
        updatedQuestion={question}
        editing={editing}
        setEditing={setEditing}
      />
    );
  };
  return (
    <Wrapper key={index}>
      <ThemeProvider theme={questionTheme}>
        {editing ? questionOnEdit() : questionOnRender()}
      </ThemeProvider>
    </Wrapper>
  );
};

export default QuestionComponent;
