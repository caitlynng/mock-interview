import React, { useState } from 'react';
import { Wrapper } from './QuestionList.styles';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

const QuestionPanel: React.FC = () => {
  const [addingQuestion, setAddingQuestion] = useState(false);

  return (
    <Wrapper>
      <button onClick={() => setAddingQuestion(!addingQuestion)}>
        Add question
      </button>
      {addingQuestion && <QuestionForm />}
      <QuestionList />
    </Wrapper>
  );
};

export default QuestionPanel;
