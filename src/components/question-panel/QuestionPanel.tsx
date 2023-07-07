import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Wrapper,
  QuestionTheme,
  AddQuestionWrapper,
} from './QuestionPanel.styles';
import { materialDefaultTheme } from 'App.styles';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

const QuestionPanel: React.FC = () => {
  const [isQuestionPanelOpen, setIsQuestionPanelOpen] = useState(false);
  const questionTheme = createTheme({
    components: { ...materialDefaultTheme, ...QuestionTheme },
  });

  return (
    <Wrapper>
      <ThemeProvider theme={questionTheme}>
        <AddQuestionWrapper>
          <IconButton
            disableRipple
            onClick={() => setIsQuestionPanelOpen(!isQuestionPanelOpen)}
          >
            Add Question
            {isQuestionPanelOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </AddQuestionWrapper>
        {isQuestionPanelOpen && (
          <div className='question-panel-overlay'>
            <div className='question-form-container'>
              <h3>Add Question</h3>
              <QuestionForm
                isFormOpen={isQuestionPanelOpen}
                setIsFormOpen={setIsQuestionPanelOpen}
              />
            </div>
          </div>
        )}
        <QuestionList />
      </ThemeProvider>
    </Wrapper>
  );
};

export default QuestionPanel;
