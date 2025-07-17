import React, { useEffect, useState } from "react";
import QuestionForm from "./components/QuestionForm";
import QuestionList from "./components/QuestionList";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then(setQuestions)
      .catch((err) => console.error("Failed to fetch questions:", err));
  }, []);

  function handleAddQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => setQuestions((prev) => [...prev, data]));
  }

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    });
  }

  function handleUpdateQuestion(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    })
      .then((res) => res.json())
      .then((updatedQ) => {
        setQuestions((prev) =>
          prev.map((q) => (q.id === updatedQ.id ? updatedQ : q))
        );
      });
  }

  return (
    <main>
      <h1>Quiz Admin</h1>
      <QuestionForm onAddQuestion={handleAddQuestion} />
      <QuestionList
        questions={questions}
        onDeleteQuestion={handleDeleteQuestion}
        onUpdateQuestion={handleUpdateQuestion}
      />
    </main>
  );
}

export default App;










