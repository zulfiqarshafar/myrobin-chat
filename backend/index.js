const express = require("express");
const path = require("path");
const { fileURLToPath } = require("url");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const SocketService = require("./services/SocketService.js");
const ChatRoomRouter = require("./routes/ChatRoomRouter.js");
require("dotenv").config();

// Config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.NODE_API_ENDPOINT],
  },
});

const corsOptions = {
  origin: [process.env.NODE_API_ENDPOINT],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

// DB connect
const connectionString = process.env.MONGODB_URI;
mongoose.connect(connectionString);

// mongoose.connection.once("open", () => {
//   console.log("DB Connected");
// });

// Routes
app.use("/api/room", ChatRoomRouter);

// Socket io
io.on("connection", (socket) => SocketService(io, socket));

// Production setting
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(port, () => console.log(`Listening to port: ${port}`));
