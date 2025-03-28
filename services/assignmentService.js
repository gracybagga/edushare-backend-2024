const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL_NAME = "gemini-1.5-pro";

async function generateAIAssignment( description) {
    try {
        if (!description) {
            return { error: "Assugnment description is missing!" };
        }

        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const prompt = `You are an assignment generator for an e-learning website. Generate an assignment based on the description below :
        Assignment description: ${description}
        The response should be structured in HTML format with appropriate Bootstrap classes so it can be directly injected into a webpage with Bootstrap styling.
        Ensure there is a logical flow and proper structure to ensure clarity.
        In the output, avoid any invalid JSON structures.
        Example output:
        {
            "assignment": "<div class="container mt-4">
                                <div class="card shadow-sm">
                                    <div class="card-body">
                                        <h2 class="card-title text-primary">Building a Responsive Navbar</h2>
                                        <p class="text-muted">In this assignment, you will design and develop a responsive navigation bar using Bootstrap.</p>
                                        
                                        <h3 class="mt-4">Instructions</h3>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item">Use Bootstrap's navbar component for easy styling.</li>
                                            <li class="list-group-item">Ensure responsiveness using Bootstrap's grid system and utility classes.</li>
                                            <li class="list-group-item">Implement a mobile-friendly toggle menu using JavaScript.</li>
                                        </ul>

                                        <h3 class="mt-4">Questions/Tasks</h3>
                                        <ol class="list-group list-group-numbered">
                                            <li class="list-group-item">Create an HTML structure using Bootstrap's `<nav>` component.</li>
                                            <li class="list-group-item">Apply Bootstrap classes to style the navbar and make it responsive.</li>
                                            <li class="list-group-item">Use JavaScript to enable a collapsible mobile menu.</li>
                                        </ol>

                                        <h3 class="mt-4">Submission Guidelines</h3>
                                        <p class="alert alert-info">Submit a ZIP file containing your project files (HTML, CSS, and JavaScript). Deadline: April 10.</p>

                                        <h3 class="mt-4">Additional Resources</h3>
                                        <ul class="list-group">
                                            <li class="list-group-item"><a href="https://getbootstrap.com/docs/5.3/components/navbar/" target="_blank">Bootstrap Navbar Documentation</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>"
        }`;

        const response = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        let assignmentText = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

        // Remove unnecessary formatting like triple backticks (` ```json `)
        assignmentText = assignmentText.replace(/^json\n/, '').replace(/\n$/, '').replace("```", "").trim(); 

        // Try to parse the response into JSON format
        const assignmentJSON = JSON.parse(assignmentText);

        return assignmentJSON.assignment ? assignmentJSON : { error: "Invalid assignment format received from AI" };

    } catch (error) {
        console.error("assignment generation error:", error);
        return { error: "AI assignment generation failed", details: error.message };
    }
}

module.exports = { generateAIAssignment };
