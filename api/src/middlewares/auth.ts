import { User } from "@prisma/client";
import { NextFunction, Response } from "express";
import { AuthService } from "../services/auth.service";
import { TypedRequest } from "../types/express-request-type";

const publicRoutes = ["/", "/health", "/auth/login", "/auth/register"];

/**
 * Middleware to check if the user is authenticated
 * @param req The request object
 * @param res The response object
 * @param next The next function
 * @returns {Promise<void | Response<any, Record<string, any>>>} Returns void or response object
 */
export const auth = async (
  req: TypedRequest<{}, {}>,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  if (publicRoutes.includes(req.path)) return next();
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = AuthService.verifyToken({ token });
    req.body.user = AuthService.safeUser({ user: decoded as User });
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default auth;
