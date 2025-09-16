// server.js
import 'dotenv/config'; // or require('dotenv').config() if using CommonJS
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import OpenAI from 'openai';

const app = express();
const port = 3000;

// Configure OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Multer for handling audio uploads
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
// POST /transcribe endpoint
app.post('/transcribe', upload.single('audio'), async (req, res) => {
  try {    // Original uploaded file (no extension)
    const originalPath = req.file.path;

    // Add .webm extension manually
    const newPath = originalPath + '.webm';
    fs.renameSync(originalPath, newPath);

    // Create a readable stream with the correct extension
    const audioFile = fs.createReadStream(newPath);

    // 1️⃣ Transcription with Whisper
    const transcriptionResponse = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1'
    });
    const transcription = transcriptionResponse.text;

    // 2️⃣ Analysis with ChatGPT
    const analysisPrompt = `
      You are note taking assistant app. Here is a user update:
      "${transcription}"
      1. Summarize the update in one sentence.
      2. Identify keywords or tasks.
      3. Suggest solutions/imporements based on requests if applicable.` 
      ;

    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: analysisPrompt }]
    });

    const analysis = chatResponse.choices[0].message.content;

    // Return transcription and analysis
    console.log({ transcription, analysis });
    res.json({ transcription, analysis });

    // Clean up uploaded audio
    fs.unlinkSync(newPath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Transcription failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
