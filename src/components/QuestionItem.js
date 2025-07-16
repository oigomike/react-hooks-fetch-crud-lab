import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => onDelete(id));
  }

  function handleChange(e) {
    const newIndex = parseInt(e.target.value);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newIndex }),
    })
      .then((res) => res.json())
      .then(onUpdate);
  }

  return (
    <li>
      <h4>{prompt}</h4>
      <label htmlFor={`correct-${id}`}>Correct Answer:</label>
      <select
        id={`correct-${id}`}
        value={correctIndex}
        onChange={handleChange}
      >
        {answers.map((ans, index) => (
          <option key={index} value={index}>
            {ans}
          </option>
        ))}
      </select>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default QuestionItem;



