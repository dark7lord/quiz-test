import React from "react";
import { Typography } from "antd";
import styled from "styled-components";
import QuizResultsTabs, { ResultsProps } from "./QuizResultsTabs";

const { Title } = Typography;

const Container = styled.div`
  padding: 20px;
  min-width: 400px;
`;

const Results: React.FC<ResultsProps> = ({ results }) => {
  return (
    <Container>
      <Title level={2}>Quiz Results</Title>
      <QuizResultsTabs results={results} />
    </Container>
  );
};

export default Results;