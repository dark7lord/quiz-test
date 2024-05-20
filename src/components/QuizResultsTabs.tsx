import React from "react";
import { Card, List, Tabs } from "antd";
import styled from "styled-components";
import { decodeHtmlEntities } from "../utils/decodeHtmlEntities";

type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type ResultsProps = {
  results: {
    question: Question;
    selected: string[];
  }[];
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const StyledCard = styled(Card)`
  margin-top: 16px;
  width: 100%;
`;

const CorrectAnswerText = styled.span`
  color: #1890ff;
  font-weight: bold;
`;

const QuizResultsTabs: React.FC<ResultsProps> = ({ results }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderListItem = (item: any) => (
      <List.Item>
      <List.Item.Meta
        title={decodeHtmlEntities(item.question.question)}
        description={
            <>
            <div>
              Your answer: {item.selected.map(decodeHtmlEntities).join(", ")}
            </div>
            <div>
              <CorrectAnswerText>
                Correct answer:{" "}
                {decodeHtmlEntities(item.question.correct_answer)}
              </CorrectAnswerText>
            </div>
          </>
        }
        />
    </List.Item>
  );
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderTabPane = (level: string, filteredResults: any) => ({
    label: capitalize(level),
    key: level,
    children: (
      <StyledCard title={`Difficulty: ${capitalize(level)}`}>
        <List dataSource={filteredResults} renderItem={renderListItem} />
      </StyledCard>
    ),
  });

  const difficultyLevels = ["easy", "medium", "hard"];

  const items = difficultyLevels.map((level) => {
    const filteredResults = results.filter(
      (result) => result.question.difficulty === level
    );
    return renderTabPane(level, filteredResults);
  });

  return <Tabs items={items}></Tabs>;
};

export default QuizResultsTabs;
