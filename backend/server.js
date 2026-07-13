const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let messages = [];

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/messages", (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const newMessage = {
      text: text.trim(),
      time: new Date().toISOString(),
    };

    messages.push(newMessage);
    io.emit("receive_message", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({
      error: "Failed to send message",
    });
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", (message) => {
    try {
      if (!message || !message.trim()) {
        return;
      }

      const newMessage = {
        text: message.trim(),
        time: new Date().toISOString(),
      };

      messages.push(newMessage);

      socket.broadcast.emit("receive_message", newMessage);
    } catch (error) {
      console.error("Message error:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});