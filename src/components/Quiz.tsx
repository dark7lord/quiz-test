// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Question from "./Question";

// const Quiz: React.FC<{ onFinishQuiz: (results: any[]) => void }> = ({
//   onFinishQuiz,
// }) => {
//   const [questions, setQuestions] = useState<any[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
//   const [answers, setAnswers] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       const response = await axios.get(
//         "https://opentdb.com/api.php?amount=10&type=multiple"
//       );
//       setQuestions(response.data.results);
//     };

//     fetchQuestions();
//   }, []);

//   const handleAnswer = (selected: string[]) => {
//     setAnswers((prev) => [
//       ...prev,
//       { question: questions[currentQuestionIndex], selected },
//     ]);
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       onFinishQuiz(answers);
//     }
//   };

//   return (
//     <div>
//       {questions.length > 0 && currentQuestionIndex < questions.length && (
//         <Question
//           question={questions[currentQuestionIndex]}
//           onAnswer={handleAnswer}
//         />
//       )}
//     </div>
//   );
// };

// export default Quiz;

import { useState, useEffect } from "react";
import axios from "axios";
import Question from "./Question";

const Quiz: React.FC<{ onFinishQuiz: (results: any[]) => void }> = ({ onFinishQuiz }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<any[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=10&type=multiple"
      );
      setQuestions(response.data.results);
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (selected: string[]) => {
    const newAnswers = [
      ...answers,
      { question: questions[currentQuestionIndex], selected },
    ];
    setAnswers(newAnswers);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onFinishQuiz(newAnswers);
    }
  };

  return (
    <div>
      {questions.length > 0 && currentQuestionIndex < questions.length && (
        <Question
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
};

export default Quiz;