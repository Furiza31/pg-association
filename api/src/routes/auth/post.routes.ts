import { Response, Router } from "express";
import { body } from "express-validator";
import { AuthService } from "../../services/auth.service";
import { TypedRequest } from "../../types/express-request-type";

const router = Router();

router.post(
  "/auth/register",
  [
    body("username").isString().isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isString().isLength({ min: 6 }),
    body("confirmPassword").isString().isLength({ min: 6 }),
  ],
  async (
    req: TypedRequest<
      {
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
      },
      {}
    >,
    res: Response
  ) => {
    const { username, email, password, confirmPassword, prisma } = req.body;
    const authService = new AuthService(prisma);
    let user, token;
    try {
      user = await authService.register({
        username,
        email,
        password,
        confirmPassword,
      });
      token = AuthService.generateToken({ user });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json({
      message: "User created successfully",
      data: {
        user,
        token,
      },
    });
  }
);

router.post(
  "/auth/login",
  [body("email").isEmail(), body("password").isString().isLength({ min: 6 })],
  async (
    req: TypedRequest<
      {
        email: string;
        password: string;
      },
      {}
    >,
    res: Response
  ) => {
    const { email, password, prisma } = req.body;
    const authService = new AuthService(prisma);
    let user, token;
    try {
      user = await authService.login({ email, password });
      token = AuthService.generateToken({ user });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
    res.status(200).json({
      message: "User logged in successfully",
      data: {
        user,
        token,
      },
    });
  }
);

export default router;
