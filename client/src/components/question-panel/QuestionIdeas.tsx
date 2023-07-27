import React, { ChangeEvent, useState, useEffect } from 'react';
import { OverlayWrapper } from 'App.styles';
import QuestionCard from './QuestionCard';
import { getAIGeneratedQuestion } from './useAIGenerate';
import Button from '@mui/material/Button';
import { useUpdateQuestion } from './useUpdateQuestion';
import { QuestionData } from 'types';
interface QuestionIdeasProps {
  type: string | undefined;
  difficulty: string | undefined;
  topic: string | undefined;
  setIsFormOpen?: (isFormOpen: boolean) => void;
}

const QuestionIdeas: React.FC<QuestionIdeasProps> = ({
  type,
  difficulty,
  topic,
  setIsFormOpen,
}) => {
  const [questionList, setQuestionList] = useState<QuestionData[]>([]);
  const [filteredQuestionList, setFilteredQuestionList] = useState<
    QuestionData[]
  >([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const generatedQuestions = await getAIGeneratedQuestion({
          type: type,
          difficulty: difficulty,
          topic: topic,
        });
        setQuestionList(generatedQuestions);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [type, difficulty, topic]);
  const handleQuestionChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    const capitalizedQuest = value
      ? value.charAt(0).toUpperCase() + value.slice(1)
      : '';

    setQuestionList((prevQuestionList) => {
      const updatedQuestionList = [...prevQuestionList];
      updatedQuestionList[index] = {
        ...updatedQuestionList[index],
        question: capitalizedQuest,
      };
      return updatedQuestionList;
    });
  };

  const handleAnswerChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    const capitalizedAnswer = value
      ? value.charAt(0).toUpperCase() + value.slice(1)
      : '';

    setQuestionList((prevQuestionList) => {
      const updatedQuestionList = [...prevQuestionList];
      updatedQuestionList[index] = {
        ...updatedQuestionList[index],
        answer: capitalizedAnswer,
      };
      return updatedQuestionList;
    });
  };
  const handleCheckboxChange = (index: number) => {
    setSelectedIndices((prevSelectedIndices) => {
      if (prevSelectedIndices.includes(index)) {
        return prevSelectedIndices.filter(
          (selectedIndex) => selectedIndex !== index,
        );
      } else {
        return [...prevSelectedIndices, index];
      }
    });
  };
  useEffect(() => {
    const filteredList = selectedIndices.map((index) => questionList[index]);
    setFilteredQuestionList(filteredList);
  }, [selectedIndices, questionList]);
  const { handleUpdateQuestion } = useUpdateQuestion({
    type,
    topic,
    difficulty,
    questionList: filteredQuestionList,
  });

  const handleUpdateQuestionButtonClick = () => {
    handleUpdateQuestion();
    setIsFormOpen?.(false);
  };
  return (
    <div>
      {questionList.map((q, index) => (
        <div key={index}>
          <input
            type='checkbox'
            checked={selectedIndices.includes(index)}
            onChange={() => handleCheckboxChange(index)}
          />
          <QuestionCard
            key={index}
            answer={q.answer}
            question={q.question}
            handleAnswerChange={(e) => handleAnswerChange(e, index)}
            handleQuestionChange={(e) => handleQuestionChange(e, index)}
          />
        </div>
      ))}
      <Button
        variant='contained'
        type='submit'
        onClick={handleUpdateQuestionButtonClick}
      >
        Save
      </Button>
      <Button
        type='button'
        variant='text'
        onClick={() => setIsFormOpen?.(false)}
      >
        Cancel
      </Button>
    </div>
  );
};

export default QuestionIdeas;
