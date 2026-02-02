import 'dotenv/config';

import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";


const questionSchema = z.object({
  question: z.string().describe("The quiz question"),
  options: z
    .object({
      a: z.string(),
      b: z.string(),
      c: z.string(),
      d: z.string()
    })
    .describe("Options labeled with ids a, b, c, d"),
  answer: z
    .enum(["a", "b", "c", "d"])
    .describe("Correct option id")
});


const quizSchema = z.array(questionSchema);
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const numQuestions = 30;
const topic = "tech and it ";
const type = "multiple choice";

const prompt = `
Generate ${numQuestions} ${type} questions on ${topic}.

Rules:
- Each question must have exactly 4 options labeled a, b, c, d
- Answer must be ONLY one of: a, b, c, d
- Answer must match the correct option
- Difficulty: beginner

Format the output strictly as JSON like this:

[
  {
    "question": "...",
    "options": {
      "a": "...",
      "b": "...",
      "c": "...",
      "d": "..."
    },
    "answer": "a"
  }
]

Return ONLY JSON.
`;

const response = await ai.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: prompt,
  config: {
    responseMimeType: "application/json",
    responseJsonSchema: zodToJsonSchema(quizSchema)
  }
});

const quiz = quizSchema.parse(JSON.parse(response.text));

console.log("Generated Quiz:");
console.log(quiz);

export default quiz;
