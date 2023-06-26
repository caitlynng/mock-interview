import React, { useState } from 'react';
import { Wrapper } from './QuestionList.styles';
import QuestionForm from './QuestionForm';

const QuestionList: React.FC = () => {
  const [addingQuestion, setAddingQuestion] = useState(false);

  return (
    <Wrapper>
      <button onClick={() => setAddingQuestion(!addingQuestion)}>
        Add question
      </button>
      {addingQuestion && <QuestionForm />}
      <div>All questions</div>
    </Wrapper>
  );
};

export default QuestionList;
