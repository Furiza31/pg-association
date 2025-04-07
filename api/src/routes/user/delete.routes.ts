import { Role } from "@prisma/client";
import { Response, Router } from "express";
import { param } from "express-validator";
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { TypedRequest } from "../../types/express-request-type";

const router = Router();

router.delete(
  "/user/:userId",
  [param("userId").isInt()],
  AuthService.hasRole({ roles: [Role.ADMIN] }),
  async (req: TypedRequest<{}, { userId: string }>, res: Response) => {
    const { userId } = req.params;
    const { prisma } = req.body;

    const userService = new UserService(prisma);
    try {
      const deletedUser = await userService.deleteUser({
        id: parseInt(userId),
      });
      return res.status(200).json({
        message: "Utilisateur supprimé avec succès",
        data: {
          user: deletedUser,
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
