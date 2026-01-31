require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function generateQuiz(topic = "computer&it", type = "MCQ", numQuestions = 5) {
    const prompt = `
Generate ${numQuestions} ${type} questions on ${topic}.
Provide 4 options for each question and indicate the correct answer.
Format the output as JSON like this:
[
  {
    "question": "...",
    "options": ["a","b","c","d"],
    "answer": "a"
  }
]
  `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const responseText = response.candidates[0].content.parts[0].text;
       
        const cleanJson = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        console.log(cleanJson);
        return JSON.parse(cleanJson); 
    } catch (error) {
        console.error("Error generating quiz:", error);
    }
}

// Example usage
generateQuiz("programming language", "MCQ", 100);
