import React from "react";

const API = "http://localhost:4000/questions";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    fetch(`${API}/${id}`, { method: "DELETE" })
      .then((r) => {
        if (r.ok) onDeleteQuestion(id);
      })
      .catch((err) => console.error("DELETE failed:", err));
  }

  function handleCorrectAnswerChange(e) {
    const newIndex = parseInt(e.target.value);

    fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newIndex }),
    })
      .then((r) => r.json())
      .then(onUpdateQuestion)
      .catch((err) => console.error("PATCH failed:", err));
  }

  return (
    <li>
      <h4>{prompt}</h4>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleCorrectAnswerChange}>
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;







