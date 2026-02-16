import express, { json } from "express";
import { DBConnections } from "./src/DB/connection.js";
import authRouter from "./src/Modules/auth/authRouter.js";
import userRouter from "./src/Modules/users/userRouter.js";
import msgRouter from "./src/Modules/messages/msgRouter.js";
import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/msg", msgRouter);

DBConnections();
app.use((req, res) => {
  res.json({ msg: "Not Handler Path" });
});
//global error middleware
app.use((error, req, res, nxt) => {
  return res.json({ msg: error.message });
});
const serverAPP = app.listen(process.env.PORT, () => {
  console.log("Server is running");
});

const io = new Server(serverAPP, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log({ socket_id: socket.id });
});
