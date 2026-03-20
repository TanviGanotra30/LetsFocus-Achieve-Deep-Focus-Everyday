# LetsFocus-Achieve-Deep-Focus-Everyday

📌 Overview

Let’sFocus is a full-stack productivity web application designed to help users enhance focus, manage tasks efficiently, and maintain deep work sessions. It combines modern UI/UX with intelligent features to create a distraction-free working environment.

The platform enables users to organize tasks, track progress, and stay consistent using structured workflows and real-time interactions.

✨ Features

🔐 Authentication System

Secure user signup & login (JWT-based authentication)

Protected routes & session handling

🧠 Focus Management

Dedicated focus sessions

Distraction-free interface for deep work

📋 Task Management

Create, update, delete tasks

Organize tasks efficiently

⚡ Real-time UI Experience

Smooth and responsive frontend

Interactive components for better UX

🌐 Full Stack Architecture

Seamless integration between frontend and backend APIs

🛠️ Tech Stack
💻 Frontend

React.js

Tailwind CSS

Axios

Framer Motion (for animations)

🔧 Backend

Node.js

Express.js

MongoDB

JWT Authentication

☁️ Deployment

Frontend: Vercel / Netlify

Backend: Render

📁 Project Structure
LetsFocus/
│
├── frontend/              # React frontend
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.js
│
├── backend/               # Node.js backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── server.js
│
├── .env
├── package.json
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/letsfocus.git
cd letsfocus
2️⃣ Setup Backend
cd backend
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

Run backend:

npm start
3️⃣ Setup Frontend
cd frontend
npm install
npm run dev
🌍 API Endpoints
Auth Routes
POST /api/auth/signup
POST /api/auth/login
Task Routes
GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
🚀 Deployment

Backend deployed on Render

Frontend deployed on Vercel

Make sure:

Update API base URL in frontend

Enable CORS in backend

🧪 Future Enhancements

🤖 AI-based focus recommendations

🔔 Notifications & reminders

📱 Mobile responsiveness improvements


<img width="1852" height="888" alt="Screenshot 2026-03-18 225907" src="https://github.com/user-attachments/assets/32e582ab-a1e1-40d9-93d4-960934cdbf1e" />
<img width="1862" height="904" alt="Screenshot 2026-03-18 225819" src="https://github.com/user-attachments/assets/550173b7-5dc0-482c-9d4e-08c57ab33eb2" />
<img width="1843" height="897" alt="Screenshot 2026-03-18 225832" src="https://github.com/user-attachments/assets/5a881926-9ff6-4021-8bc2-4fbfdda50d18" />
<img width="1779" height="884" alt="Screenshot 2026-03-18 225845" src="https://github.com/user-attachments/assets/36191172-f970-4375-b8ed-5f0c617dd94b" />
<img width="1587" height="882" alt="Screenshot 2026-03-18 225855" src="https://github.com/user-attachments/assets/d8a9d3b2-9a41-4e82-bbbc-62595fccff41" />


