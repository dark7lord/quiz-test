// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


// import React from 'react';
// import styled from 'styled-components';
// import { Button } from 'antd';

// const Container = styled.div`
//   text-align: center;
//   margin-top: 50px;
// `;

// const App: React.FC = () => (
//   <Container>
//     <h1>Hello, Vite + React + TypeScript!</h1>
//     <Button type="primary">Ant Design Button</Button>
//   </Container>
// );

// export default App;

import React, { useState } from "react";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import { Button, Row, Col } from "antd";

const App: React.FC = () => {
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [results, setResults] = useState<any[]>([]);

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizCompleted(false);
    setResults([]);
  };

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
