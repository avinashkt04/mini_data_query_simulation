import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "") as string;

  if(!token) {
    res.status(401).json({ message: "Authorization token is required" });
    return;
  }

  try {
    verifyToken(token);

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default authMiddleware;
