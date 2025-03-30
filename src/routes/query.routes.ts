import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { explainQuery, handleQuery, validQuery } from "../controllers/query.controller";

const router = Router();

router.post("/query", authMiddleware, handleQuery);
router.get("/explain", authMiddleware, explainQuery);
router.get("/valid", authMiddleware, validQuery);

export default router;