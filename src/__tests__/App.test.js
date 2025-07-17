// src/__tests__/App.test.js
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import App from "../App";
import '@testing-library/jest-dom';

beforeEach(() => {
  global.fetch = jest.fn((url, options) => {
    if (!options) {
      // GET request
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      });
    }

    if (options.method === "POST") {
      // POST request to add question
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 1,
            prompt: "Test Prompt",
            answers: ["A", "B", "C", "D"],
            correctIndex: 1,
          }),
      });
    }
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test("renders the App component", async () => {
  await act(async () => {
    render(<App />);
  });
  expect(screen.getByText("Quiz Admin")).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  await act(async () => {
    render(<App />);
  });

  fireEvent.change(screen.getByLabelText(/Prompt:/i), {
    target: { value: "Test Prompt" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 1:/i), {
    target: { value: "A" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 2:/i), {
    target: { value: "B" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 3:/i), {
    target: { value: "C" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 4:/i), {
    target: { value: "D" },
  });
  fireEvent.change(screen.getByLabelText(/Correct Answer Index:/i), {
    target: { value: "1" },
  });

  fireEvent.click(screen.getByRole("button", { name: /Add Question/i }));

  await waitFor(() => {
    expect(screen.getByText("Test Prompt")).toBeInTheDocument();
  });
});














