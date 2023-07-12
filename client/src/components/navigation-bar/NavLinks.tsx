import React, { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';

import { AuthContext } from 'context/AuthContext';
import { OverlayWrapper } from 'App.styles';
import QuestionForm from 'components/question-panel/QuestionForm';
import { setUser } from 'redux/slices/usersSlice';

const NavLinks: React.FC = () => {
  const { currentUserId } = useContext(AuthContext);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);

  const navigate = useNavigate();

  const openAddQuestionPanel = () => {
    setIsAddingQuestion(true);
    setIsGeneratingQuestion(false);
  };
  const openGenerateQuestionPanel = () => {
    setIsGeneratingQuestion(true);
    setIsAddingQuestion(false);
  };
  const handleLogout = async () => {
    console.log('logout');
    dispatch(setUser({ email: '', name: '', uid: '' }));
    navigate('/login');
  };

  if (currentUserId) {
    return (
      <Stack direction='row' spacing={2}>
        <Button onClick={openGenerateQuestionPanel}>
          AI Generate Questions
        </Button>
        <Button onClick={openAddQuestionPanel}>Add Question</Button>
        <Button onClick={handleLogout}>Logout</Button>
        {(isAddingQuestion || isGeneratingQuestion) && (
          <OverlayWrapper>
            <div className='panel-overlay'>
              <div className='form-container'>
                {isAddingQuestion && (
                  <>
                    <h3>Add Question</h3>
                    <QuestionForm
                      isFormOpen={isAddingQuestion}
                      setIsFormOpen={setIsAddingQuestion}
                    />
                  </>
                )}
                {isGeneratingQuestion && (
                  <>
                    <h3>AI Generating Question</h3>
                    <div>Test</div>
                  </>
                )}
              </div>
            </div>
          </OverlayWrapper>
        )}
      </Stack>
    );
  }

  if (pathname === '/login') {
    return <Link to='/register'>Register</Link>;
  }

  return <Link to='/login'>Login</Link>;
};

export default NavLinks;
