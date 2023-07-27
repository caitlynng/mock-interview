import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';

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
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openEditPanel = Boolean(anchorEl);
  const id = openEditPanel ? 'simple-popover' : undefined;

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
  useEffect(() => {
    if (!editing) {
      setAnchorEl(null);
    }
  }, [editing]);

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
            flexDirection: 'column',
            flexWrap: 'wrap',
            alignItems: 'start',
            position: 'relative',
          }}
        >
          <Stack direction='row' spacing={1}>
            {question.type && <Chip label={question.type} />}
            {question.difficulty && <Chip label={question.difficulty} />}
            {question.topic && <Chip label={question.topic} />}
          </Stack>
          <ListItemText
            primary={question.question}
            sx={{
              paddingLeft: '1em',
            }}
          />
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          {question.answer ? (
            <List component='div' disablePadding>
              <div
                style={{
                  padding: '1em 2em',
                  position: 'relative',
                }}
              >
                <div>{question.answer}</div>
                <Button
                  aria-describedby={id}
                  onClick={handleClick}
                  style={{
                    position: 'absolute',
                    top: '0.5em',
                    right: 0,
                    zIndex: 1,
                  }}
                >
                  <MoreVertIcon fontSize='medium' />
                </Button>
                <Popover
                  id={id}
                  open={openEditPanel}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <List>
                    <ListItem disablePadding onClick={handleEdit}>
                      <ListItemButton>
                        <ListItemIcon>
                          <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary='Edit' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={handleDelete}>
                      <ListItemButton>
                        <ListItemIcon>
                          <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText primary='Delete' />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Popover>
              </div>
            </List>
          ) : (
            <Button onClick={handleEdit}> Add an answer</Button>
          )}
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
