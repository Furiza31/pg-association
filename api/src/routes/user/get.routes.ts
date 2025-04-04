import { Role } from "@prisma/client";
import { Response, Router } from "express";
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { TypedRequest } from "../../types/express-request-type";

const router = Router();

router.get(
  "/users",
  AuthService.hasRole({ roles: [Role.ADMIN] }),
  async (req: TypedRequest<{}, {}>, res: Response) => {
    const { prisma } = req.body;
    const userService = new UserService(prisma);

    try {
      const users = await userService.getAllUsers();
      return res.status(200).json({
        message: "Utilisateurs récupérés avec succès",
        data: {
          users,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erreur interne du serveur",
        error,
      });
    }
  }
);

export default router;
