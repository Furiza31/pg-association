import { NextFunction, Response } from "express";
import { LoggerService } from "../services/logger.service";
import { TypedRequest } from "../types/express-request-type";

/**
 * Middleware to log the request
 * @param req The request object
 * @param res The response object
 * @param next The next function
 */
const loggerMiddleware = (
  req: TypedRequest<{}, {}>,
  res: Response,
  next: NextFunction
) => {
  LoggerService.logRequest(req);
  next();
};

export default loggerMiddleware;
