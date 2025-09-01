import { Request, NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

interface MyJwtPayload extends JwtPayload {
  userId: string;
}

export function middleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers["authorization"] ?? "";

    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") {
      return res.status(403).json({ message: "Invalid token format" });
    }

    const payload = decoded as MyJwtPayload;

    req.userId = payload.userId; 
    next();
  } catch (err) {
    return res.status(403).json({ message: "Unauthorized" });
  }
}
