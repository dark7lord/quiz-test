import { useState, useEffect } from "react";
import axios from "axios";
import Question from "./Question";

const quizAPI = "https://opentdb.com/api.php?amount=10&type=multiple";

interface QuizProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFinishQuiz: (results: any[]) => void;
}

const Quiz: React.FC<QuizProps> = ({ onFinishQuiz }: QuizProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [answers, setAnswers] = useState<any[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get(quizAPI);
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
