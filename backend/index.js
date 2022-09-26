const express = require("express");
const cors = require("cors");
const roomRouter = require("./routes/RoomRouter.js");
require("dotenv").config();

const port = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.use("/api/room", roomRouter);

app.listen(port, () => console.log(`Listening to port: ${port}`));
