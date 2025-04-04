import { RequestHandler } from "express";
import fs from "fs";
import path from "path";

/**
 * Load all middlewares from the middlewares folder
 * @returns {RequestHandler[]} allMiddlewares
 */
const middlewares = (): RequestHandler[] => {
  const allMiddlewares: RequestHandler[] = [];
  const middlewaresPath = path.join(__dirname);
  const files = fs
    .readdirSync(middlewaresPath)
    .filter((file) => file.endsWith(".ts") || file.endsWith(".js"))
    .filter((file) => file !== "index.ts")
    .filter((file) => file !== "index.js");

  for (const file of files) {
    try {
      const middleware = require(path.join(middlewaresPath, file)).default;
      allMiddlewares.push(middleware);
      console.log(`Middleware loaded from ${middlewaresPath}/${file}`);
    } catch (error) {
      console.error(`Error loading middleware from ${middlewaresPath}/${file}`);
    }
  }

  return allMiddlewares;
};

export default middlewares;
