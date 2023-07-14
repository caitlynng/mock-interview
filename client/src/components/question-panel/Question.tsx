import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

import { Question } from 'types';
import { Wrapper } from './Question.styles';
import QuestionForm from './QuestionForm';
import { deleteQuestion } from 'redux/slices/interviewSlice';
import axiosFetch from 'hooks/axiosFetch';

interface QuestionProps {
  question: Question;
  index: string | undefined;
}

const QuestionComponent: React.FC<QuestionProps> = ({ question, index }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleQuestionClick = () => {
    setOpen(!open);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleDelete = async () => {
    try {
      const axiosInstance = await axiosFetch();
      const update = await axiosInstance.post('user/delete-question', {
        questionID: question._id,
      });
      if (update.status === 200) {
        dispatch(deleteQuestion(question._id));
      }
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
                <Button onClick={handleEdit}>Edit</Button>
                <Button onClick={handleDelete}>Delete</Button>
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
        isFormOpen={editing}
        setIsFormOpen={setEditing}
      />
    );
  };
  return (
    <Wrapper key={index}>
      {editing ? questionOnEdit() : questionOnRender()}
    </Wrapper>
  );
};

export default QuestionComponent;
