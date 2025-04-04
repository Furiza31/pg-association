import { Response, Router } from "express";
import { TypedRequest } from "../../types/express-request-type";

const router = Router();

router.get("/auth/validate", (_, res) => {
  res.status(200).json({ message: "Authorized" });
});

router.get("/auth/me", (req: TypedRequest<{}, {}>, res: Response) => {
  res.status(200).json({
    message: "Me",
    user: req.body.user,
  });
});

export default router;
