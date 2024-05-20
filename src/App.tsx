import React, { useState } from "react";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import { Button, Row, Col } from "antd";

const App: React.FC = () => {
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[]>([]);
  
  const startQuiz = () => {
    setQuizStarted(true);
    setQuizCompleted(false);
    setResults([]);
  };
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finishQuiz = (results: any[]) => {
    setQuizCompleted(true);
    setResults(results);
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col>
        {!quizStarted && !quizCompleted && (
          <Button type="primary" onClick={startQuiz}>
            Start Quiz
          </Button>
        )}

        {quizStarted && !quizCompleted && <Quiz onFinishQuiz={finishQuiz} />}

        {quizCompleted && <Results results={results} />}
      </Col>
    </Row>
  );
};

export default App;
