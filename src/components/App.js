
import React, { useEffect, useState } from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions((prev) => [...prev, newQuestion]);
  }

  function handleDeleteQuestion(deletedId) {
    setQuestions((prev) => prev.filter((q) => q.id !== deletedId));
  }

  function handleUpdateQuestion(updatedQuestion) {
    setQuestions((prev) =>
      prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
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













