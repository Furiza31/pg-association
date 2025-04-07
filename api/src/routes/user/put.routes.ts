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
    body("id").isNumeric(),
    body("username").isString().isLength({ min: 3 }),
    body("email").isEmail(),
    body("language").isString().isLength({ min: 5, max: 5 }),
    body("role").isString().isIn([Role.USER, Role.ADMIN]),
  ],
  AuthService.hasRole({ roles: [Role.ADMIN] }),
  async (
    req: TypedRequest<
      {
        id: string;
        username: string;
        email: string;
        language: string;
        role: string;
      },
      {}
    >,
    res: Response
  ) => {
    const { id, username, email, language, role, prisma } = req.body;
    const userService = new UserService(prisma);

    let updatedUser;

    try {
      updatedUser = await userService.updateUser({
        id: parseInt(id),
        username,
        email,
        language,
        role,
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
    body("role").optional(),
  ],
  AuthService.hasRole({ roles: [Role.USER] }),
  async (
    req: TypedRequest<
      {
        username: string;
        email: string;
        language: string;
        role: string;
      },
      {}
    >,
    res: Response
  ) => {
    const { username, email, language, role, prisma, user } = req.body;
    const { id } = user!;
    const userService = new UserService(prisma);

    let updatedUser;
    try {
      updatedUser = await userService.updateUser({
        id,
        username,
        email,
        language,
        role,
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
