import { render, screen } from "@testing-library/react";
import Results from "../components/Results";

const mockResults = [
  {
    question: {
      category: "Category 1",
      type: "multiple",
      difficulty: "easy",
      question: "Question 1?",
      correct_answer: "Correct answer 1",
      incorrect_answers: ["Incorrect answer 1", "Incorrect answer 2"],
    },
    selected: ["Incorrect answer 1"],
  },
];

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    dispatchEvent: jest.fn(),
  })),
});

describe("Results component", () => {
  test("renders the quiz results correctly", () => {
    render(<Results results={mockResults} />);

    // Check if the titles for each difficulty level are displayed
    expect(screen.getByText("Easy")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("Hard")).toBeInTheDocument();

    // Check if the questions, selected answers, and correct answers are displayed
    expect(screen.getByText("Question 1?")).toBeInTheDocument();
    expect(
      screen.getByText("Your answer: Incorrect answer 1")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Correct answer: Correct answer 1")
    ).toBeInTheDocument();

    // Add more assertions as needed
  });
});
