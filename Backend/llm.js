import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
// import { zodToJsonSchema } from "zod-to-json-schema";

const singleQuizSchema = z.object({
  question: z.string().describe("The quiz question text of it and tech field"),
  option1: z.string(),
  option2: z.string(),
  option3: z.string(),
  option4: z.string(),
  ans: z.number().min(1).max(4),
});

export const multipleQuizSchema = z.array(singleQuizSchema);


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});
const prompt = `
Generate 5 IT and technology multiple-choice quiz questions.

Return ONLY a valid JSON ARRAY.
Each object in the array must follow this format:

{
  "question": "string",
  "option1": "string",
  "option2": "string",
  "option3": "string",
  "option4": "string",
  "ans": 1 | 2 | 3 | 4
}

Do NOT include explanations.
Do NOT include markdown.
Do NOT include extra text.
`;

const response = await ai.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: prompt,
});


const text = response.candidates[0].content.parts[0].text;


const clean = text.replace(/```json|```/g, "").trim();

let quizzes;
try {
  quizzes = JSON.parse(clean);
  multipleQuizSchema.parse(quizzes);
} catch (err) {
  console.error("Failed to parse AI output:", err);
  console.log("Raw AI output:", clean);
  throw err;
}

console.log(quizzes);