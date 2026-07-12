const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
let messages = [];
app.get("/messages", (req, res) => {
  res.json(messages);
});
app.post("/messages", (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const newMessage = {
      text: text.trim(),
      time: new Date().toISOString()
    };

    messages.push(newMessage);
    io.emit("receive_message", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({
      error: "Failed to send message"
    });
  }
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", (message) => {
  try {
    const newMessage = {
      text: message,
      time: new Date().toISOString()
    };

    messages.push(newMessage);

    socket.broadcast.emit("receive_message", message);
  } catch (error) {
    console.error("Message error:", error);
  }
});

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});