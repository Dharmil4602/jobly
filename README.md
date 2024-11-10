# Jobly: Resume Analyzer Chrome Extension

## 📘 Overview
Jobly: Resume Analyzer is a Chrome Extension built with TypeScript that helps job seekers optimize their resumes to better match specific job descriptions. Leveraging Google Vertex AI for resume analysis, this extension provides a score showing how well a resume aligns with a job role, with the backend hosted on Google Cloud App Engine.

## 🌟 Features
- **TypeScript**: Developed with TypeScript for enhanced code readability and maintainability.
- **Google Vertex AI Integration**: Analyzes and scores resumes against job descriptions.
- **User Input**: Allows input of job title, company name, job description, and resume.
- **Google Cloud App Engine Backend**: Cloud-hosted backend for scalability and reliability.
- **Chrome API Usage**: Interacts with the browser for a smooth user experience.
- **Webpack & pnpm**: Uses Webpack for bundling and pnpm for efficient package management.

## 🛠️ Tech Stack
- **Frontend**: TypeScript, Chrome Extension APIs
- **Backend**: Google Vertex AI, hosted on Google App Engine
- **Build Tools**: Webpack, pnpm
- **Deployment**: Google Cloud Platform

## 🚀 How It Works
1. **Input Job Details**: Users provide job title, company name, job description, and upload their resume.
2. **AI Analysis**: Google Vertex AI evaluates the resume’s match to the job description.
3. **Score Display**: The extension displays an alignment score to guide users on improvements.

## 📦 Installation

### Prerequisites
- **Node.js** and **pnpm** installed
- **Google Cloud account** for Vertex AI and App Engine setup
- **Google Chrome Developer Account** for loading the extension

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Dharmil4602/jobly.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd jobly
   ```
3. **Install dependencies with pnpm**:
   ```bash
   pnpm install
   ```
4. **Go to Frontend folder for building the extension**
    ```bash
    pnpm run build
    ```
5. **Load the extension in Chrome:**
- Go to **chrome://extensions/**
- Enable Developer Mode
- Click Load unpacked and select the dist folder present inside the extension folder which will be created while build.

## 👨‍💻 Development

1. **You need an .env file for backend url:**
```bash
REACT_APP_BACKEND_URL=REPLACE_WITH_YOUR_BACKEND_URL
```
2. **Go to backend folder to start the server:**
```bash
cd backend
pnpm run dev
```
3. **Go to frontend folder to watch for changes:**
```bash
cd frontend
pnpm run watch
```
