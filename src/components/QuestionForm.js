import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  function handleChange(index, value) {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newQuestion = {
      prompt,
      answers,
      correctIndex: parseInt(correctIndex),
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then(onAddQuestion);

    setPrompt("");
    setAnswers(["", "", "", ""]);
    setCorrectIndex(0);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="prompt">Prompt</label>
      <input
        id="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      {answers.map((ans, index) => (
        <div key={index}>
          <label htmlFor={`answer${index}`}>Answer {index + 1}</label>
          <input
            id={`answer${index}`}
            value={ans}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        </div>
      ))}

      <label htmlFor="correctIndex">Correct Answer</label>
      <select
        id="correctIndex"
        value={correctIndex}
        onChange={(e) => setCorrectIndex(e.target.value)}
      >
        {answers.map((_, index) => (
          <option key={index} value={index}>
            Answer {index + 1}
          </option>
        ))}
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}

export default QuestionForm;





