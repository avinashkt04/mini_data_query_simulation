import { generateToken } from "../utils/auth";
import { Request, Response } from "express";

const getToken = async (req: Request, res: Response): Promise<void> => {
  // "demo-user" can be replaced with a real user from the database
  const token = generateToken("demo-user");

  if (!token) {
    res.status(500).json({ message: "Error generating token" });
    return;
  }
  res.json({ message: "Token generated successfully", token });
  return;
};

export { getToken };
