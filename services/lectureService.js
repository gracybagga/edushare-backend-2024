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
        The response should be structured in HTML format with appropriate Bootstrap classes so it can be directly injected into a webpage with Bootstrap styling.
        Ensure there is a logical flow and proper structure to ensure clarity.
        In the output, avoid any invalid JSON structures.
        Example output:
        {
            "lecture": "<div class="container mt-4">
                                <div class="card shadow-sm">
                                    <div class="card-body">
                                        <h2 class="card-title text-primary">Introduction to RESTful APIs</h2>
                                        <p class="text-muted">This lecture provides an overview of RESTful APIs, their principles, and best practices for designing scalable web services.</p>
                                        
                                        <h3 class="mt-4">What is a RESTful API?</h3>
                                        <p>A RESTful API (Representational State Transfer) is an architectural style for building web services that interact over HTTP. It follows six key constraints to ensure scalability and maintainability.</p>

                                        <h3 class="mt-4">Key Principles of REST</h3>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item"><strong>Stateless:</strong> Each request from a client must contain all the information needed to process the request.</li>
                                            <li class="list-group-item"><strong>Client-Server Architecture:</strong> The client and server are independent, allowing for flexible implementations.</li>
                                            <li class="list-group-item"><strong>Cacheable:</strong> Responses can be cached to improve performance and reduce server load.</li>
                                            <li class="list-group-item"><strong>Uniform Interface:</strong> A consistent way to interact with resources using HTTP methods.</li>
                                            <li class="list-group-item"><strong>Layered System:</strong> Intermediary layers (e.g., load balancers) can improve scalability.</li>
                                            <li class="list-group-item"><strong>Code on Demand (Optional):</strong> Servers can send executable code to clients.</li>
                                        </ul>

                                        <h3 class="mt-4">Common HTTP Methods</h3>
                                        <table class="table table-bordered">
                                            <thead class="thead-dark">
                                                <tr>
                                                    <th>Method</th>
                                                    <th>Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>GET</td><td>Retrieves data from the server</td></tr>
                                                <tr><td>POST</td><td>Creates a new resource</td></tr>
                                                <tr><td>PUT</td><td>Updates an existing resource</td></tr>
                                                <tr><td>DELETE</td><td>Removes a resource</td></tr>
                                            </tbody>
                                        </table>

                                        <h3 class="mt-4">Best Practices for REST API Design</h3>
                                        <ol class="list-group list-group-numbered">
                                            <li class="list-group-item">Use meaningful and consistent resource names (e.g., <code>/users</code> instead of <code>/getUsers</code>).</li>
                                            <li class="list-group-item">Follow standard HTTP status codes for responses.</li>
                                            <li class="list-group-item">Implement proper authentication and authorization mechanisms.</li>
                                            <li class="list-group-item">Ensure proper versioning of APIs to maintain backward compatibility.</li>
                                            <li class="list-group-item">Use query parameters for filtering, sorting, and pagination.</li>
                                        </ol>

                                        <h3 class="mt-4">Additional Resources</h3>
                                        <ul class="list-group">
                                            <li class="list-group-item"><a href="https://restfulapi.net/" target="_blank">RESTful API Guide</a></li>
                                            <li class="list-group-item"><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods" target="_blank">MDN: HTTP Methods</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>"
        }`;

        const response = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        let lectureText = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

        // Remove unnecessary formatting like triple backticks (` ```json `)
        lectureText = lectureText.replace(/^json\n/, '').replace(/\n$/, '').replace("```", "").trim(); 

        // Try to parse the response into JSON format
        const lectureJSON = JSON.parse(lectureText);

        return lectureJSON.lecture ? lectureJSON : { error: "Invalid lecture format received from AI" };

    } catch (error) {
        console.error("lecture generation error:", error);
        return { error: "AI lecture generation failed", details: error.message };
    }
}

module.exports = { generateAIAssignment };
