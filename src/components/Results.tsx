import React from "react";
import { Card, Typography, List, Tabs } from "antd";
import styled from "styled-components";
import { decodeHtmlEntities } from "../utils/decodeHtmlEntities"; // Импортируем утилиту

const { Title, Text } = Typography;
const { TabPane } = Tabs;

type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type ResultsProps = {
  results: {
    question: Question;
    selected: string[];
  }[];
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Container = styled.div`
  padding: 20px;
  min-width: 400px;
`;

const StyledTabs = styled(Tabs)`
  margin-top: 16px;
`;

const StyledCard = styled(Card)`
  margin-top: 16px;
  width: 100%;
`;

const Description = styled.div`
  margin-top: 8px;
`;

const CorrectAnswerText = styled(Text)`
  color: #1890ff;
  font-weight: bold;
`;

const Results: React.FC<ResultsProps> = ({ results }) => {
  const difficultyLevels = ["easy", "medium", "hard"];

  const getResultsByDifficulty = (difficulty: string) => {
    return results.filter(
      (result) => result.question.difficulty === difficulty
    );
  };

  return (
    <Container>
      <Title level={2}>Quiz Results</Title>
      <StyledTabs defaultActiveKey="0">
        {difficultyLevels.map((level, index) => (
          <TabPane tab={capitalize(level)} key={index.toString()}>
            <StyledCard title={`Difficulty: ${capitalize(level)}`}>
              <List
                dataSource={getResultsByDifficulty(level)}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={decodeHtmlEntities(item.question.question)}
                      description={
                        <Description>
                          <Text>
                            Your answer:{" "}
                            {item.selected.map(decodeHtmlEntities).join(", ")}
                          </Text>
                          <br />
                          <CorrectAnswerText>
                            Correct answer:{" "}
                            {decodeHtmlEntities(item.question.correct_answer)}
                          </CorrectAnswerText>
                        </Description>
                      }
                    />
                  </List.Item>
                )}
              />
            </StyledCard>
          </TabPane>
        ))}
      </StyledTabs>
    </Container>
  );
};

export default Results;
