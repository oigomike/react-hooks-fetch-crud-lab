import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    if (name.startsWith("answer")) {
      const index = parseInt(name.replace("answer", ""));
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index] = value;
      setFormData({ ...formData, answers: updatedAnswers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: formData.prompt,
        answers: formData.answers,
        correctIndex: parseInt(formData.correctIndex),
      }),
    })
      .then((r) => r.json())
      .then((newQ) => {
        onAddQuestion(newQ);
        setFormData({ prompt: "", answers: ["", "", "", ""], correctIndex: 0 });
      });
  }

  return (
    <section>
      <h2>New Question</h2>
      <form onSubmit={handleSubmit}>
        <label>Prompt: <input name="prompt" value={formData.prompt} onChange={handleChange} /></label>
        {formData.answers.map((answer, index) => (
          <label key={index}>Answer {index + 1}: 
            <input name={`answer${index}`} value={answer} onChange={handleChange} />
          </label>
        ))}
        <label>
          Correct Answer Index: 
          <select name="correctIndex" value={formData.correctIndex} onChange={handleChange}>
            {[0, 1, 2, 3].map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;










