import React, { useState } from 'react';
import NavigationBar from 'components/NavigationBar';
import { InterviewWrapper } from './Interview.styles';
import QuestionList from 'components/question-panel/QuestionPanel';

import { Routes, Route } from 'react-router-dom';
const Interview: React.FC = () => {
  const [questions] = useState([
    { id: 1, type: 'behavioral', content: 'Behavioral Question 1' },
    { id: 2, type: 'technical', content: 'Technical Question 1' },
  ]);

  const QuestionPage = ({ type }: { type: string }) => {
    const filteredQuestions = questions.filter(
      (question) => question.type === type,
    );

    return (
      <div>
        {filteredQuestions.map((question) => (
          <div key={question.id}>{question.content}</div>
        ))}
      </div>
    );
  };

  return (
    <InterviewWrapper>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<QuestionList />} />
        <Route
          path='/behavioral'
          element={<QuestionPage type='behavioral' />}
        />
        <Route path='/technical' element={<QuestionPage type='technical' />} />
      </Routes>
    </InterviewWrapper>
  );
};

export default Interview;
