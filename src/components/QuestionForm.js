// src/components/QuestionForm.js
import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name.startsWith("answer")) {
      const index = parseInt(name.replace("answer", ""));
      const newAnswers = [...formData.answers];
      newAnswers[index] = value;
      setFormData({ ...formData, answers: newAnswers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: formData.prompt,
        answers: formData.answers,
        correctIndex: parseInt(formData.correctIndex),
      }),
    })
      .then((r) => r.json())
      .then(onAddQuestion);

    setFormData({
      prompt: "",
      answers: ["", "", "", ""],
      correctIndex: 0,
    });
  }

  return (
    <section>
      <h2>Add Question</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">Prompt:</label>
        <input
          id="prompt"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
          required
        />

        {formData.answers.map((answer, index) => (
          <div key={index}>
            <label htmlFor={`answer${index}`}>Answer {index + 1}:</label>
            <input
              id={`answer${index}`}
              name={`answer${index}`}
              value={answer}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <label htmlFor="correctIndex">Correct Answer Index:</label>
        <select
          id="correctIndex"
          name="correctIndex"
          value={formData.correctIndex}
          onChange={handleChange}
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>

        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;









