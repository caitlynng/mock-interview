import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Wrapper } from './QuestionList.styles';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

const QuestionPanel: React.FC = () => {
  const [isQuestionPanelOpen, setIsQuestionPanelOpen] = useState(false);

  return (
    <Wrapper>
      <IconButton onClick={() => setIsQuestionPanelOpen(!isQuestionPanelOpen)}>
        Add Question
        {isQuestionPanelOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
      {isQuestionPanelOpen && (
        <QuestionForm
          isFormOpen={isQuestionPanelOpen}
          setIsFormOpen={setIsQuestionPanelOpen}
        />
      )}
      <QuestionList />
    </Wrapper>
  );
};

export default QuestionPanel;
