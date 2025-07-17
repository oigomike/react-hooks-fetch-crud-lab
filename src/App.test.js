// src/App.test.js
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import '@testing-library/jest-dom';

beforeEach(() => {
  global.fetch = jest.fn((url, options) => {
    if (options && options.method === "POST") {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          id: 4,
          prompt: "New Question?",
          answers: ["A", "B", "C", "D"],
          correctIndex: 0,
        }),
      });
    }

    if (options && options.method === "DELETE") {
      return Promise.resolve({ ok: true });
    }

    if (options && options.method === "PATCH") {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          id: 1,
          prompt: "Updated?",
          answers: ["X", "Y", "Z", "W"],
          correctIndex: 2,
        }),
      });
    }

    // Default GET request
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 1,
            prompt: "Sample Question?",
            answers: ["Yes", "No", "Maybe", "I don't know"],
            correctIndex: 0,
          },
        ]),
    });
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("displays question prompts after fetching", async () => {
  render(<App />);
  const question = await screen.findByText("Sample Question?");
  expect(question).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(<App />);
  const input = screen.getByLabelText(/prompt/i);
  const submit = screen.getByRole("button", { name: /add question/i });


  fireEvent.change(input, { target: { value: "New Question?" } });
  fireEvent.click(submit);

  const newQuestion = await screen.findByText("New Question?");
  expect(newQuestion).toBeInTheDocument();
});

test("deletes a question when delete button is clicked", async () => {
  render(<App />);
  const question = await screen.findByText("Sample Question?");
  const deleteBtn = screen.getByRole("button", { name: /delete/i });

  fireEvent.click(deleteBtn);

  await waitFor(() =>
    expect(screen.queryByText("Sample Question?")).not.toBeInTheDocument()
  );
});

test("deletes the question when the delete button is clicked", async () => {
  render(<App />);

  // Wait for the question to appear
  await waitFor(() => {
    expect(screen.getByText("Sample Question?")).toBeInTheDocument();
  });

  // Find and click the delete button
  const deleteButton = screen.getByText("Delete");
  fireEvent.click(deleteButton);

  // Assert that DELETE request was sent
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:4000/questions/1",
      expect.objectContaining({
        method: "DELETE",
      })
    );
  });

  // Assert that the question has been removed from the DOM
  await waitFor(() => {
    expect(screen.queryByText("Sample Question?")).not.toBeInTheDocument();
  });
});


























