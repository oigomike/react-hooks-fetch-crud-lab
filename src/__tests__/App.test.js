import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../components/App";

test("renders the App component", () => {
  render(<App />);
  expect(screen.getByText("Quiz Questions")).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/Prompt/i), {
    target: { value: "Test Prompt" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 1/i), {
    target: { value: "A" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 2/i), {
    target: { value: "B" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 3/i), {
    target: { value: "C" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 4/i), {
    target: { value: "D" },
  });
  fireEvent.change(screen.getByLabelText(/Correct Answer/i), {
    target: { value: "2" },
  });

  fireEvent.click(screen.getByText(/submit/i));

  await waitFor(() => {
    expect(screen.getByText("Test Prompt")).toBeInTheDocument();
  });
});







