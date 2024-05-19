import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Quiz from "./Quiz";

const mock = new MockAdapter(axios);

describe("Quiz component", () => {
  const mockQuestions = [
    {
      category: "General Knowledge",
      type: "multiple",
      difficulty: "easy",
      question: "What is the capital of France?",
      correct_answer: "Paris",
      incorrect_answers: ["London", "Berlin", "Rome"],
    },
  ];

  beforeEach(() => {
    mock.onGet("https://opentdb.com/api.php?amount=10&type=multiple").reply(200, {
      results: mockQuestions,
    });
  });

  afterEach(() => {
    mock.reset();
  });

  test("finishing quiz triggers onFinishQuiz callback with results", async () => {
    const mockFinishQuiz = jest.fn();

    render(<Quiz onFinishQuiz={mockFinishQuiz} />);

    await waitFor(() => {
      const questionText = screen.getByText("What is the capital of France?");
      expect(questionText).toBeInTheDocument();
    });

    const parisCheckbox = screen.getByRole("checkbox", { name: "Paris" });
    fireEvent.click(parisCheckbox);

    const nextButton = screen.getByRole("button", { name: "Next" });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(mockFinishQuiz).toHaveBeenCalledWith([
        { question: mockQuestions[0], selected: ["Paris"] },
      ]);
    });
  });
});
