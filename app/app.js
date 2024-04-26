const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Root endpoint message
app.get('/', (req, res) => {
  res.send('API Service Running!');
});

// Endpoint for hate speech detection
app.post('/detect', (req, res) => {
  // Assuming the text to analyze is sent in the request body
  const text = req.body.text;

  // Your hate speech detection logic goes here
  const isHateSpeech = detectHateSpeech(text);

  // Respond with the result
  res.json({ isHateSpeech: isHateSpeech });
});

// Example hate speech detection function
function detectHateSpeech(text) {
  const hateSpeechKeywords = [
    "bitch", // Replace with actual hate speech words
    "hateword2",
    "hateword3",
    // Add more words as necessary
  ];

  text = text.toLowerCase(); // Case insensitive matching
  return hateSpeechKeywords.some(word => text.includes(word));
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
