import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import middlewares from "./middlewares";
import routes from "./routes/index";
import { initializeSockets } from "./sockets";
import { TypedRequest } from "./types/express-request-type";
import bodyParser = require("body-parser");

console.log("🚀 Starting server 🚀");

dotenv.config();

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT || 3000;
console.log("📦 Loading middlewares 📦");
const allMiddlewares = middlewares();
console.log("🛣️ Loading routes 🛣️");
const allRoutes = routes();

console.log("🔧 Setting up server 🔧");
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
allMiddlewares.forEach((middleware) => app.use(middleware));
allRoutes.forEach((route) => app.use(route));
app.get("/", (_: TypedRequest<{}, {}>, res: Response) => {
  res.redirect("/health");
});

initializeSockets(io);

console.log("✅ Server setup complete ✅");

httpServer.listen(port, () => {
  console.log(
    `⚡️ [server]: Server is running at http://localhost:${port} ⚡️`
  );
});
