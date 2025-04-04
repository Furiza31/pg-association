import { Response, Router } from "express";
import { TypedRequest } from "../../types/express-request-type";

const router = Router();

router.get("/health", (req: TypedRequest<{}, {}>, res: Response) => {
  res.status(200).json({
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

export default router;
