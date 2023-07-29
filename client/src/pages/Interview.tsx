import React, { useState } from 'react';
import NavigationBar from 'components/navigation-bar/NavigationBar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { InterviewWrapper } from './Interview.styles';
import QuestionPanel from 'components/question-panel/QuestionPanel';

import { OverlayWrapper } from 'App.styles';
import QuestionForm from 'components/question-panel/QuestionForm';

const Interview: React.FC = () => {
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

  const openAddQuestionPanel = () => {
    setIsAddingQuestion(true);
  };

  return (
    <InterviewWrapper>
      <NavigationBar />
      <QuestionPanel />
      <Fab
        color='primary'
        aria-label='add-question'
        sx={{ position: 'fixed', bottom: 50, right: 40 }}
        onClick={openAddQuestionPanel}
      >
        <AddIcon />
      </Fab>
      {isAddingQuestion && (
        <OverlayWrapper>
          <div className='panel-overlay'>
            <div className='form-container'>
              <h3>Add Question</h3>
              <QuestionForm
                isFormOpen={isAddingQuestion}
                setIsFormOpen={setIsAddingQuestion}
              />
            </div>
          </div>
        </OverlayWrapper>
      )}
    </InterviewWrapper>
  );
};

export default Interview;
