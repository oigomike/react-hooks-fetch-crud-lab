import React, { useEffect, useState } from "react";
import QuestionList from "./components/QuestionList";
import QuestionForm from "./components/QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(deletedId) {
    const updatedQuestions = questions.filter((q) => q.id !== deletedId);
    setQuestions(updatedQuestions);
  }

  function handleUpdateCorrectAnswer(updatedQuestion) {
    const updatedQuestions = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
  }

  return (
    <main>
      <h1>Quiz Admin</h1>
      <QuestionForm onAddQuestion={handleAddQuestion} />
      <QuestionList
        questions={questions}
        onDelete={handleDeleteQuestion}
        onUpdate={handleUpdateCorrectAnswer}
      />
    </main>
  );
}

export default App;










