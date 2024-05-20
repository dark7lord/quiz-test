
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Question from "./Question";

describe("Question component", () => {
  test("renders the question text", () => {
    const mockQuestion = {
      category: "General Knowledge",
      type: "multiple",
      difficulty: "easy",
      question: "What is the capital of France?",
      correct_answer: "Paris",
      incorrect_answers: ["London", "Berlin", "Rome"],
    };

    render(<Question question={mockQuestion} onAnswer={jest.fn()} />);

    const questionText = screen.getByText("What is the capital of France?");
    expect(questionText).toBeInTheDocument();
  });

  test("selecting an answer triggers onAnswer callback", () => {
    const mockQuestion = {
      category: "General Knowledge",
      type: "multiple",
      difficulty: "easy",
      question: "What is the capital of France?",
      correct_answer: "Paris",
      incorrect_answers: ["London", "Berlin", "Rome"],
    };
    const mockOnAnswer = jest.fn();

    render(<Question question={mockQuestion} onAnswer={mockOnAnswer} />);

    const parisCheckbox = screen.getByRole("checkbox", { name: "Paris" });
    fireEvent.click(parisCheckbox);

    const nextButton = screen.getByRole("button", { name: "Next" });
    fireEvent.click(nextButton);

    expect(mockOnAnswer).toHaveBeenCalledWith(["Paris"]);
  });
});
