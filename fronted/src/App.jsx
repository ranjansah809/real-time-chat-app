import { useState, useEffect, useRef } from "react"
import "./App.css"

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
      setMessages([
  ...messages,
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
      setIsTyping(true)
      setTimeout(() => {
  let reply = ""

  if (message.toLowerCase() === "hi") {
    reply = "Hello Ranjan 👋"
  } else if (message.toLowerCase() === "how are you") {
    reply = "I'm good 😊 How are you?"
  } else if (message.toLowerCase() === "what is your name") {
    reply = "I'm your React Chat Bot 🤖"
  } else {
    reply = "Sorry, I don't understand 😅"
  }

  setMessages((prevMessages) => [
    ...prevMessages,
    {
      text: reply,
      sender: "other",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    }
  ])

  setIsTyping(false)

}, 1000)
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