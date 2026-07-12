import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react"
import "./App.css"
const socket = io("https://real-time-chat-app-production-a589.up.railway.app");

function App() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(() => {
  const savedMessages = localStorage.getItem("chatMessages")

  return savedMessages
    ? JSON.parse(savedMessages)
    : [
        {
          text: "Hello Ranjan 👋",
          sender: "other",
          time: "Now"
        }
      ]
})

const messagesEndRef = useRef(null)
const formatTime = (time) => {
  const date = new Date(time)

  if (!time || isNaN(date.getTime())) {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  })
}
useEffect(() => {
  fetch("https://real-time-chat-app-production-a589.up.railway.app/messages")
    .then((response) => response.json())
    .then((data) => {
      const history = data.map((item) => ({
        text: item.text,
        sender: "other",
        time: formatTime(item.time)
      }));

      setMessages(history);
    })
    .catch((error) => {
      console.error("Failed to load messages:", error);
    });

  socket.on("receive_message", (data) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: data.text,
        sender: "other",
        time: formatTime(data.time)
      }
    ]);
  });

  return () => {
    socket.off("receive_message");
  };
}, []);

useEffect(() => {

  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
}, [messages])

useEffect(() => {

  localStorage.setItem("chatMessages", JSON.stringify(messages))
}, [messages])

const [isTyping, setIsTyping] = useState(false)
const [darkMode, setDarkMode] = useState(false)
  const sendMessage = () => {
    if (message !== "") {
      setMessages((prevMessages) => [
  ...prevMessages,
  {
    text: message,
    sender: "me",
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  }
])
      setMessage("")
      socket.emit("send_message", message)

    }
}

const clearChat = () => {
  setMessages([])
}

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="chat-header">
        <h2>Real-Time Chat</h2>
        <p>Online</p>
        <button onClick={() => setDarkMode(!darkMode)}>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>

        <button className="clear-btn" onClick={clearChat}>
  Clear Chat 🗑️
</button>
      </div>

      <div className="chat-messages">
        <p>Start a conversation 👋</p>
        {messages.map((msg, index) => (
  <div key={index} className={`message ${msg.sender}`}>
  {msg.text}
  <small>{msg.time}</small>
</div>
))}

<div ref={messagesEndRef}></div>

{isTyping && (
  <div className="typing">
    Chat Bot is typing...
  </div>
)}

      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default App