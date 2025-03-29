const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL_NAME = "gemini-1.5-pro";

async function generateAIAssignment( description) {
    try {
        if (!description) {
            return { error: "Assignment description is missing!" };
        }

        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
        const prompt = `You are an assignment generator for an e-learning website. Generate an assignment based on the description below :
        Assignment description: ${description}
        The response should be structured in HTML format so it can be directly injected into a webpage.
        Ensure there is a logical flow and proper structure to ensure clarity.
        In the output, ensure proper escaping of double quotes, avoid adding unneccasry '\n' after each element to indicate a new line, html will take care of it and  avoid any invalid JSON structures.
        Example output of html content with bootstrap styling:
        {
            "assignment": "<h3>Introduction to HTML</h3><p>In this assignment, you will create a simple webpage using HTML.</p><ul><li>Create a basic structure using <code>&lt;html&gt;</code> and <code>&lt;body&gt;</code> tags.</li><li>Add a heading and a paragraph with some text.</li><li>Include an image using the <code>&lt;img&gt;</code> tag.</li></ul><p><strong>Example:</strong></p><pre>&lt;h1&gt;Welcome to HTML&lt;/h1&gt;</pre>"
        }`;

        const response = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        // console.log("Raw AI Response:", response?.response?.candidates?.[0]?.content?.parts?.[0]?.text); // loggin raw response

        let assignmentText = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

        // assignmentText = assignmentText.replace(/^json\n/, '').replace(/\n$/, '').replace("```", "").trim(); 
        assignmentText = assignmentText.replace(/```json/, '')  // Remove AI markdown block start 
                                        .replace(/```/, '')       // Remove AI markdown block end
                                        .replace(/\n/g, '')        // Remove all newline characters globally
                                        .trim();

        assignmentText = assignmentText.split('\n').join('');
   
        // Try to parse the response into JSON format
        const assignmentJSON = JSON.parse(assignmentText);

        return assignmentJSON.assignment ? assignmentJSON : { error: "Invalid assignment format received from AI" };

    } catch (error) {
        console.error("assignment generation error:", error);
        return { error: "AI assignment generation failed", details: error.message };
    }
}

module.exports = { generateAIAssignment };


        // const prompt = `You are an assignment generator for an e-learning website. Generate an assignment based on the description below :
        // Assignment description: ${description}
        // The response should be structured in HTML format where html elements are being styled with appropriate Bootstrap classes so it can be directly injected into a webpage with Bootstrap styling.
        // Ensure there is a logical flow and proper structure to ensure clarity.
        // In the output, ensure proper escaping of double quotes, avoid adding unneccasry '\n' in reponse due to parsing issues and  avoid any invalid JSON structures.
        // In the response, replace 'class' with 'className'
        // Example output of html content with bootstrap styling:
        // {
        //     "assignment": "<div className="container mt-4">
        //                         <div className="card shadow-sm">
        //                             <div className="card-body">
        //                                 <h2 className="card-title text-primary">Building a Responsive Navbar</h2>
        //                                 <p className="text-muted">In this assignment, you will design and develop a responsive navigation bar using Bootstrap.</p>
        //                             </div>
        //                         </div>
        //                     </div>"
        // }`;
