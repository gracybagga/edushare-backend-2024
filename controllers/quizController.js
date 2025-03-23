const axios = require("axios");

// Controller for generating quiz using AI
exports.generateQuiz = async (req, res) => {
  const { topic } = req.body; // Topic from the frontend

  try {
    // Validate input
    if (!topic) {
      return res.status(400).json({ message: "Topic is required for quiz generation" });
    }

    // Make a request to the AI service (Gemini API or another AI API)
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", 
      {
        prompt: `Generate a quiz on the topic of ${topic}`,
        max_tokens: 150,  // Adjust max tokens for the quiz size
        // Add any other required parameters for your AI model
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // Extract the generated quiz content from the AI response
    const quizContent = response.data.choices[0].text.trim(); // Assuming the AI returns the quiz in the 'text' field

    // Send the generated quiz back to the frontend
    res.status(200).json({
      message: "Quiz generated successfully",
      quiz: quizContent
    });
    
  } catch (error) {
    console.error("Error generating quiz:", error);
    res.status(500).json({ message: "Error generating quiz", error: error.message });
  }
};
