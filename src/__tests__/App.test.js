import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../components/App";

// Mock fetch globally
beforeEach(() => {
  global.fetch = jest.fn((url, options) => {
    if (!options) {
      // GET /questions
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: 1,
              prompt: "What is 2 + 2?",
              answers: ["1", "2", "3", "4"],
              correctIndex: 3,
            },
          ]),
      });
    }

    if (options.method === "POST") {
      // POST /questions
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 2,
            prompt: "Lorem Testum 1",
            answers: ["A", "B", "C", "D"],
            correctIndex: 2,
          }),
      });
    }

    if (options.method === "DELETE") {
      // DELETE /questions/1
      return Promise.resolve({ ok: true });
    }

    if (options.method === "PATCH") {
      // PATCH /questions/1
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 1,
            prompt: "What is 2 + 2?",
            answers: ["1", "2", "3", "4"],
            correctIndex: 2,
          }),
      });
    }
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test("displays question prompts after fetching", async () => {
  render(<App />);
  expect(await screen.findByText("What is 2 + 2?")).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(<App />);

  // Fill the form
  fireEvent.change(screen.getByLabelText(/Prompt:/i), {
    target: { value: "Lorem Testum 1" },
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
  fireEvent.change(screen.getByLabelText(/Correct Answer:/i), {
    target: { value: "2" },
  });

  fireEvent.click(screen.getByText(/Add Question/i));

  await waitFor(() =>
    expect(screen.getByText("Lorem Testum 1")).toBeInTheDocument()
  );
});

test("deletes the question when the delete button is clicked", async () => {
  render(<App />);
  expect(await screen.findByText("What is 2 + 2?")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Delete Question"));

  await waitFor(() =>
    expect(screen.queryByText("What is 2 + 2?")).not.toBeInTheDocument()
  );
});
test("updates the answer when the dropdown is changed", async () => {
  render(<App />);

  await screen.findByText("What's 2 + 2?");

  const questionDropdown = screen.getByLabelText("Correct Answer:");

  fireEvent.change(questionDropdown, { target: { value: "2" } });

  await waitFor(() =>
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/questions/1"),
      expect.objectContaining({
        method: "PATCH",
      })
    )
  );
});












