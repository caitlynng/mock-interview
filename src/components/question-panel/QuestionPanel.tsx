import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Wrapper, QuestionTheme } from './QuestionPanel.styles';
import { materialDefaultTheme } from 'App.styles';
import QuestionList from './QuestionList';

const QuestionPanel: React.FC = () => {
  const questionTheme = createTheme({
    components: { ...materialDefaultTheme, ...QuestionTheme },
  });

  return (
    <Wrapper>
      <ThemeProvider theme={questionTheme}>
        <QuestionList />
      </ThemeProvider>
    </Wrapper>
  );
};

export default QuestionPanel;
