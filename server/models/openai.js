require('dotenv').config(); // Load environment variables from .env file

const openai = require('openai'); // Import the OpenAI package

// Create a new instance of the OpenAI class
const openaiInstance = new openai.OpenAI(process.env.OPENAI_API_KEY);

// Use the openaiInstance to make API calls
// ...

// Export the openaiInstance for use in other files
module.exports = openaiInstance;
