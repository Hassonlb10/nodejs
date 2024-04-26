const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Root endpoint message
app.get('/', (req, res) => {
  console.log('GET request received at /');
  res.send('API Service Running!');
});

// Endpoint for hate speech detection
app.post('/detect', async (req, res) => {
  console.log('Inside detect');
  // Assuming the text to analyze is sent in the request body
  const text = req.body.text;

  try {
    console.log('Text to analyze:', text);

    // Your hate speech detection logic goes here
    const isHateSpeech = await detectHateSpeech(text);
    console.log('Hate speech detected:', isHateSpeech);

    // Respond with the result
    res.json({ isHateSpeech: isHateSpeech });
    console.log('Response sent:', { isHateSpeech: isHateSpeech });
  } catch (error) {
    console.error('Error in hate speech detection:', error);
    res.status(500).json({ error: 'Internal server error' });
    console.log('Internal server error:', error);
  }
});

// Example hate speech detection function
function detectHateSpeech(text) {
  console.log('Inside detectHateSpeech function');
  const hateSpeechKeywords = [
    "bitch", // Replace with actual hate speech words
    "hateword2",
    "hateword3",
    // Add more words as necessary
  ];

  text = text.toLowerCase(); // Case insensitive matching
  return hateSpeechKeywords.some(word => {
    console.log('Checking word:', word);
    return text.includes(word);
  });
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});