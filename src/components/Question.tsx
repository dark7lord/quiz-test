import React, { useState, useEffect } from 'react';
import { Radio, Checkbox, Button, Card, Divider } from 'antd';
import styled from 'styled-components';
import { decodeHtmlEntities } from '../utils/decodeHtmlEntities'; // Импортируем утилиту

type QuestionProps = {
  question: {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  };
  onAnswer: (selected: string[]) => void;
};


const StyledCard = styled(Card)`
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledCheckboxGroup = styled(Checkbox.Group)`
  display: flex;
  flex-direction: column;
`;

const StyledRadioGroup = styled(Radio.Group)`
  display: flex;
  flex-direction: column;
`;

const Question: React.FC<QuestionProps> = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);

  useEffect(() => {
    setSelectedAnswer([]);
  }, [question]);

  const handleSubmit = () => {
    onAnswer(selectedAnswer);
  };

  const allAnswers = [...question.incorrect_answers, question.correct_answer].sort();

  return (
    <StyledCard title={decodeHtmlEntities(question.question)}>
      {question.type === "multiple" ? (
        <StyledCheckboxGroup
          value={selectedAnswer}
          onChange={(values) => setSelectedAnswer(values as string[])}
        >
          <Column>
            {allAnswers.map((answer) => (
              <Checkbox key={answer} value={answer}>
                {decodeHtmlEntities(answer)}
              </Checkbox>
            ))}
          </Column>
        </StyledCheckboxGroup>
      ) : (
        <StyledRadioGroup
          value={selectedAnswer[0]}
          onChange={(e) => setSelectedAnswer([e.target.value])}
        >
          <Column>
            {allAnswers.map((answer) => (
              <Radio key={answer} value={answer}>
                {decodeHtmlEntities(answer)}
              </Radio>
            ))}
          </Column>
        </StyledRadioGroup>
      )}
      <Divider />
      <Button type="primary" onClick={handleSubmit}>
        Next
      </Button>
    </StyledCard>
  );
};

export default Question;
