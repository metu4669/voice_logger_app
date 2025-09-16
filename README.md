# 📝 Voice-to-Notes API

A lightweight Node.js + Express server that turns spoken updates into **actionable notes**.  
It records audio, transcribes it with **OpenAI Whisper**, then analyzes the text with **GPT-4o-mini** to produce concise summaries, keywords, and improvement suggestions.

> **Live Repository:** [metu4669/voice_logger_app](https://github.com/metu4669/voice_logger_app)

---

## ✨ Features
- 🎤 **Audio Uploads** – Accepts `.webm` audio files through a single `POST /transcribe` endpoint.
- 🗣️ **Automatic Transcription** – High-accuracy speech-to-text using OpenAI’s `whisper-1`.
- 🧠 **Smart Note Analysis** –  
  1. Summarizes the update in one sentence.  
  2. Extracts keywords or tasks.  
  3. Suggests solutions or improvements based on the request.

---

## 🛠️ Tech Stack
- **Node.js** + **Express**
- **Multer** for file uploads
- **OpenAI API** (`whisper-1` for transcription, `gpt-4o-mini` for analysis)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/metu4669/voice_logger_app.git
cd voice_logger_app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables

Create a .env file based on the included example:

```bash
cp .env.example .env
```


Edit .env:

OPENAI_API_KEY=your_openai_api_key_here
PORT=3000

### 4. Run the Server
```bash
npm start
```

The API will run at http://localhost:3000

🧩 API Endpoint
POST /transcribe

Upload a single audio file (audio field).

Request Example

curl -X POST http://localhost:3000/transcribe \
  -F "audio=@sample.webm"


Response Example

{
  "transcription": "User’s spoken text here...",
  "analysis": "Summary, keywords, and suggestions."
}

📂 Project Structure
.
├─ uploads/        # Temporary audio files (auto-cleaned)
├─ server.js       # Main Express server
├─ package.json
├─ .env.example    # Environment variable template
└─ .gitignore
