const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2);
const MODEL_NAME = "gemini-1.5-pro";

async function generateAIQuiz(topic) {
    try {
        if (!topic) {
            return { error: "Quiz topic is missing!" };
        }

        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const prompt = `You are a quiz generator for an e-learning platform. Generate a multiple-choice quiz - an array of 10 questions based on the topic provided by the user.
        Each question should follow this JSON format:
        Example output:
        {
            "quiz": [
                {
                    "question": "Choose the correct article: 'He bought ______ apple from the market.'",
                    "options": [
                        "an",
                        "a",
                        "the",
                        "no article needed"
                    ],
                    "correct_option": 0
                }
            ]
        }
            Provide exactly 4 options for each question. Ensure the "correct_option" value corresponds to the index of the correct answer in the "options" array.
            Return the quiz in a clean JSON format without any markdown formatting.  
            
            Topic: ${topic}
        `;

        const response = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        let quizText = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

        // Remove unnecessary formatting like triple backticks (` ```json `)
        // quizText = quizText.replace(/^json\n/, '').replace(/\n$/, '').replace("```", "").trim(); 

        quizText = quizText.replace(/```json/, '')  // Remove AI markdown block start 
                            .replace(/```/, '')       // Remove AI markdown block end
                            .replace(/\n/g, '')        // Remove all newline characters globally
                            .trim();

        quizText = quizText.split('\n').join('');

        // Try to parse the response into JSON format
        const quizJSON = JSON.parse(quizText);

        return quizJSON.quiz ? quizJSON : { error: "Invalid quiz format received from AI" };

    } catch (error) {
        console.error("Quiz generation error:", error);
        return { error: "AI Quiz generation failed", details: error.message };
    }
}

module.exports = { generateAIQuiz };


// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require("dotenv").config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const MODEL_NAME = "gemini-1.5-pro";

// async function generateAIQuiz(courseName, lectureDescription) {
//     try {
//         if (!lectureDescription) {
//             return { error: "Lecture description is missing!" };
//         }

//         const model = genAI.getGenerativeModel({ model: MODEL_NAME });

//         const prompt = `Generate a multiple-choice quiz with 5 questions based on the lecture below for the course "${courseName}":
//         Lecture: ${lectureDescription}
//         Each question should have 4 options and one correct answer. Return the quiz in a clean JSON format without any markdown formatting.
//         Example output:
//         {
//             "quiz": [
//                 {
//                     "question": "What is ...?",
//                     "options": ["A", "B", "C", "D"],
//                     "answer": "A"
//                 }
//             ]
//         }`;

//         const response = await model.generateContent({
//             contents: [{ role: "user", parts: [{ text: prompt }] }],
//         });

//         let quizText = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

//         // Remove unnecessary formatting like triple backticks (` ```json `)
//         quizText = quizText.replace(/^json\n/, '').trim(); 

//         // Try to parse the response into JSON format
//         const quizJSON = JSON.parse(quizText);

//         return quizJSON.quiz ? quizJSON : { error: "Invalid quiz format received from AI" };

//     } catch (error) {
//         console.error("Quiz generation error:", error);
//         return { error: "AI Quiz generation failed", details: error.message };
//     }
// }

// module.exports = { generateAIQuiz };
