import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Response } from "express";
import middlewares from "./middlewares";
import routes from "./routes/index";
import { TypedRequest } from "./types/express-request-type";
import bodyParser = require("body-parser");

console.log("🚀 Starting server 🚀");

dotenv.config();

const app: Express = express();
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

console.log("✅ Server setup complete ✅");

app.listen(port, () => {
  console.log(
    `⚡️ [server]: Server is running at http://localhost:${port} ⚡️`
  );
});
