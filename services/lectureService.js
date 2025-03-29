const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL_NAME = "gemini-1.5-pro";

async function generateAILecture( topic) {
    try {
        if (!topic) {
            return { error: "Lecture Topic is missing!" };
        }

        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const prompt = `You are an lecture generator for an e-learning website. Generate a lecture based on the topic provided by the user.
        Topic: ${topic}
        The response should be structured in HTML format so it can be directly injected into a webpage.
        Ensure there is a logical flow and proper structure to ensure clarity.
        In the output, ensure proper escaping of double quotes, avoid adding unneccasry '\n' after each element to indicate a new line, html will take care of it and  avoid any invalid JSON structures.
        Example output of html content:
        {
            "lecture": "<div><h2>Introduction to RESTful APIs</h2><p>This lecture provides an overview of RESTful APIs, their principles, and best practices for designing scalable web services.</p><h3>What is a RESTful API?</h3><p>A RESTful API (Representational State Transfer) is an architectural style for building web services that interact over HTTP. It follows six key constraints to ensure scalability and maintainability.</p><h3>Key Principles of REST</h3><ul><li><strong>Stateless:</strong> Each request from a client must contain all the information needed to process the request.</li><li><strong>Client-Server Architecture:</strong> The client and server are independent, allowing for flexible implementations.</li><li><strong>Code on Demand (Optional):</strong> Servers can send executable code to clients.</li></ul></div>"
        }`;

        const response = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        let lectureText = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

        // Remove unnecessary formatting like triple backticks (` ```json `)
        lectureText = lectureText.replace(/```json/, '')  // Remove AI markdown block start 
                                .replace(/```/, '')       // Remove AI markdown block end
                                .replace(/\n/g, '')        // Remove all newline characters globally
                                .trim(); 

        lectureText = lectureText.split('\n').join('');

        // Try to parse the response into JSON format
        const lectureJSON = JSON.parse(lectureText);

        return lectureJSON.lecture ? lectureJSON : { error: "Invalid lecture format received from AI" };

    } catch (error) {
        console.error("lecture generation error:", error);
        return { error: "AI lecture generation failed", details: error.message };
    }
}

module.exports = { generateAILecture };
