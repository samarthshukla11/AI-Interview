# AI-Interview

# 🤖 AI Interview Platform

An AI-powered interview preparation platform that helps candidates practice technical interviews, improve their answering skills, and evaluate their performance through AI-generated feedback.

The platform provides an interactive interview experience where users can prepare for interviews, answer questions, and review their results to identify areas for improvement.

## 🚀 Features

* **User Authentication:** Secure user registration and login using JWT authentication.
* **AI-Powered Interviews:** Generate interview questions using Google Gemini AI.
* **Interactive Interview Experience:** Answer interview questions through an interactive interface.
* **Interview Setup:** Configure interview sessions before starting.
* **Performance Evaluation:** Receive AI-generated feedback on interview responses.
* **Results Dashboard:** Review interview performance and feedback.
* **Interview History:** Access previously completed interview sessions.
* **User Profile:** Manage personal account information.
* **Responsive UI:** Clean and user-friendly interface.

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* shadcn/ui
* React Router
* TanStack React Query
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* Google Gemini API

### Development Tools

* Visual Studio Code
* Git & GitHub
* Postman
* Docker

## 📂 Project Structure

```text
AI-Interview-Platform/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/samarthshukla11/AI-Interview.git
```

### 2. Navigate to the Project

```bash
cd AI-Interview
```

### 3. Setup the Backend

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` directory and configure your environment variables.

Example:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

**Note:** Use the exact environment variable names expected by your backend configuration. Never commit your `.env` file or expose API keys publicly.

Start the backend server:

```bash
npm run dev
```

### 4. Setup the Frontend

Open another terminal and navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

### 5. Open the Application

Open the local URL displayed by Vite in your browser (usually):

```text
http://localhost:5173
```

## 🔄 Application Workflow

1. User registers or logs into the platform.
2. User navigates to the dashboard.
3. User configures an interview session.
4. The backend communicates with Google Gemini AI to generate interview questions.
5. User answers the questions through the interview interface.
6. Responses are evaluated using the AI-powered backend workflow.
7. Results and feedback are presented to the user.
8. Users can review their interview history and track their preparation.

## 🔐 Environment Variables

The application requires environment variables for database connectivity, authentication and AI integration.

| Variable       | Description                        |
| -------------- | ---------------------------------- |
| PORT           | Backend server port                |
| MONGODB_URI    | MongoDB connection string          |
| JWT_SECRET     | Secret used for JWT authentication |
| GEMINI_API_KEY | Google Gemini API key              |

Keep all sensitive credentials in environment files and never upload them to GitHub.

## 🔮 Future Enhancements

* Voice-based mock interviews.
* Speech-to-text integration.
* Real-time interview interaction.
* Advanced performance analytics.
* Personalized learning recommendations.
* Difficulty-based interview preparation.
* Support for multiple programming languages and technical domains.

## 🎯 Project Objective

The main objective of this project is to make interview preparation more accessible and effective through artificial intelligence.

By combining modern web technologies with generative AI, the platform aims to provide candidates with an interactive environment to practice interviews, receive feedback, and improve their confidence.

## 👨‍💻 Author

**Samarth Shukla**

* GitHub: [@samarthshukla11](https://github.com/samarthshukla11)

---

⭐ If you find this project useful, consider giving it a star!
