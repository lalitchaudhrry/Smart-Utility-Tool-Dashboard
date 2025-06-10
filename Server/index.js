const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
const PORT = 5000;

app.use(bodyParser.json());
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post('/api/gemini', async (req, res)=>{
    const {prompt} = req.body;
try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const generatedText = response.data.candidates[0]?.content?.parts[0]?.text || 'No response';
    res.json({ text: generatedText });
  } catch (error) {
    console.error('Gemini API error:', error.message);
    res.status(500).json({ error: 'Something went wrong with Gemini API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});