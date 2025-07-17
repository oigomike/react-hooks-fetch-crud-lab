import { rest } from "msw";

let questions = [
  {
    id: 1,
    prompt: "What is React?",
    answers: ["Library", "Language", "Framework", "Compiler"],
    correctIndex: 0
  }
];

export const handlers = [
  // GET all questions
  rest.get("http://localhost:4000/questions", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(questions));
  }),

  // POST new question
  rest.post("http://localhost:4000/questions", async (req, res, ctx) => {
    const body = await req.json();
    const newQuestion = {
      id: questions.length + 1,
      ...body
    };
    questions.push(newQuestion);
    return res(ctx.status(201), ctx.json(newQuestion));
  }),

  // DELETE question by ID
  rest.delete("http://localhost:4000/questions/:id", (req, res, ctx) => {
    const id = parseInt(req.params.id);
    questions = questions.filter(q => q.id !== id);
    return res(ctx.status(200), ctx.json({}));
  }),

  // PATCH correctIndex of question
  rest.patch("http://localhost:4000/questions/:id", async (req, res, ctx) => {
    const id = parseInt(req.params.id);
    const body = await req.json();
    const question = questions.find(q => q.id === id);
    if (question) {
      question.correctIndex = body.correctIndex;
      return res(ctx.status(200), ctx.json(question));
    } else {
      return res(ctx.status(404), ctx.json({ message: "Not found" }));
    }
  })
];

