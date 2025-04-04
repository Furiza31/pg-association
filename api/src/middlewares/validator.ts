import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import { TypedRequest } from "../types/express-request-type";

/**
 * Middleware to validate request body
 * @param req The request object
 * @param res The response object
 * @param next The next function
 * @return {void | Response<any, Record<string, any>>} Returns void or response object
 */
export const validatorMiddleware = (
  req: TypedRequest<{}, {}>,
  res: Response,
  next: NextFunction
): void | Response<any, Record<string, any>> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array(), message: "Invalid data" });
  }
  next();
};

export default validatorMiddleware;
