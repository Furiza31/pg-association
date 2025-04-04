import { Role } from "@prisma/client";
import { Response, Router } from "express";
import { body } from "express-validator";
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { TypedRequest } from "../../types/express-request-type";

const router = Router();

router.put(
  "/user",
  [
    body("username").isString().isLength({ min: 3 }).optional(),
    body("email").isEmail().optional(),
    body("language").isString().isLength({ min: 5, max: 5 }).optional(),
    body("roles").optional().isArray(),
    body("roles.*").isNumeric(),
  ],
  AuthService.hasRole({ roles: [Role.ADMIN] }),
  async (
    req: TypedRequest<
      {
        username: string;
        email: string;
        language: string;
        roles?: number[];
      },
      {}
    >,
    res: Response
  ) => {
    const { username, email, language, roles, prisma, user } = req.body;
    const { id } = user!;
    const userService = new UserService(prisma);

    let updatedUser;
    try {
      updatedUser = await userService.updateUser({
        id,
        username,
        email,
        language,
        roles,
      });
      updatedUser = AuthService.safeUser({ user: updatedUser });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error,
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: {
        user: updatedUser,
      },
    });
  }
);

router.put(
  "/user/edit",
  [
    body("username").isString().isLength({ min: 3 }).optional(),
    body("email").isEmail().optional(),
    body("language").isString().isLength({ min: 5, max: 5 }).optional(),
    body("roles").optional().isArray(),
    body("roles.*").isNumeric(),
  ],
  AuthService.hasRole({ roles: [Role.USER] }),
  async (
    req: TypedRequest<
      {
        username: string;
        email: string;
        language: string;
        roles?: number[];
      },
      {}
    >,
    res: Response
  ) => {
    const { username, email, language, roles, prisma, user } = req.body;
    const { id } = user!;
    const userService = new UserService(prisma);

    let updatedUser;
    try {
      updatedUser = await userService.updateUser({
        id,
        username,
        email,
        language,
        roles,
      });
      updatedUser = AuthService.safeUser({ user: updatedUser });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error,
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: {
        user: updatedUser,
      },
    });
  }
);

export default router;
