import React from 'react';
import NavigationBar from 'components/navigation-bar/NavigationBar';
import { InterviewWrapper } from './Interview.styles';
import QuestionPanel from 'components/question-panel/QuestionPanel';
const Interview: React.FC = () => {
  return (
    <InterviewWrapper>
      <NavigationBar />
      <QuestionPanel />
    </InterviewWrapper>
  );
};

export default Interview;
