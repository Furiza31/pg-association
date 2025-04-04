import { PrismaClient, Role, User } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { TypedRequest } from "../types/express-request-type";
import { UserService } from "./user.service";

export class AuthService {
  private prisma: PrismaClient;
  private userService: UserService;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.userService = new UserService(prisma);
  }

  async register({
    username,
    email,
    password,
    confirmPassword,
  }: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    if (password !== confirmPassword) throw new Error("Passwords do not match");

    const userExist = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExist) throw new Error("User already exists");

    const hashedPassword = bcryptjs.hashSync(
      password,
      parseInt(process.env.SALT_ROUNDS as string)
    );
    const user = await this.userService.createUser({
      username,
      email,
      password: hashedPassword,
    });

    return AuthService.safeUser({ user });
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.userService.getUserByEmail({ email });
    if (!user || !bcryptjs.compareSync(password, user.password)) {
      throw new Error("Invalid email or password");
    }

    return AuthService.safeUser({ user });
  }

  public static generateToken({ user }: { user: User | Partial<User> }) {
    user = AuthService.safeUser({ user });
    return jwt.sign(user, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRATION as string,
    });
  }

  public static safeUser({ user }: { user: User | Partial<User> }) {
    const userCopy = { ...user } as Partial<User>;
    delete userCopy.password;
    return userCopy;
  }

  public static verifyToken({ token }: { token: string }) {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  }

  public static checkRole({
    user,
    roles,
  }: {
    user: User | Partial<User>;
    roles: Role[];
  }) {
    if (!user || !roles) return false;
    const userRoles = user.role;
    if (!userRoles) return false;
    return roles.includes(userRoles);
  }

  public static hasRole({ roles }: { roles: Role[] }) {
    return (req: TypedRequest<{}, {}>, res: Response, next: NextFunction) => {
      const { user } = req.body;

      if (!user) {
        return res.status(401).json({
          message: "Utilisateur non authentifié",
        });
      }

      const haveRole = AuthService.checkRole({
        user,
        roles,
      });

      if (haveRole) return next();
      else {
        return res.status(403).json({
          message: "Accès refusé",
        });
      }
    };
  }
}
