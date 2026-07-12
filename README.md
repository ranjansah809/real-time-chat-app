# 💬 Real-Time Chat Application

A real-time chat application built using React, Node.js, Express.js, and Socket.IO. The application allows users to send and receive messages instantly without refreshing the page.

## 🚀 Features

- Real-time messaging using Socket.IO
- Instant message send and receive
- Messages broadcast to connected users
- Chat history available after page refresh
- Message timestamps
- User connection and disconnection handling
- REST API to fetch chat history
- Clean and responsive chat interface
- Dark mode support
- Clear chat functionality
- Basic error handling

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Socket.IO Client

### Backend
- Node.js
- Express.js
- Socket.IO

## 📁 Project Structure

real-time-chat-app/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .gitignore
│
├── fronted/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── package.json

## ⚙️ Installation and Setup

### 1. Clone the repository

git clone https://github.com/ranjansah809/real-time-chat-app.git

cd real-time-chat-app

### 2. Install Backend Dependencies

cd backend

npm install

### 3. Start Backend Server

node server.js

The backend server runs on:

http://localhost:3001

### 4. Install Frontend Dependencies

Open another terminal:

cd fronted

npm install

### 5. Start Frontend

npm run dev

Open the local Vite URL shown in the terminal.

## 🔌 REST API

### Get Chat History

GET /messages

Example:

http://localhost:3001/messages

This endpoint returns the current chat message history.

## ⚡ Socket.IO Events

### send_message

Used by the client to send a message to the server.

### receive_message

Used by the server to broadcast a new message to connected users.

## 🧪 Testing

The application was tested using multiple browser tabs.

- Messages are sent instantly.
- Connected users receive messages without page refresh.
- Chat history remains available after refresh.
- Message timestamps are displayed.
- The REST API returns chat history.

## 👨‍💻 Author

**Ranjan Sah**

- GitHub: https://github.com/ranjansah809
- LinkedIn: https://www.linkedin.com/in/sahranjan/

## 📄 License

This project was developed as a real-time chat application assignment and for learning purposes.