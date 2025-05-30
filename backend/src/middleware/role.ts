import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user";
import { Role } from "../enum";


const verifyRole = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"] as string;
  const token = authHeader && authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    const { userId } = decoded as JwtPayload;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(401).json({ message: "unauthorized" });
    }

    console.log("role found:", user.role);
    if (user.role !== Role.ADMIN) {
        return res.status(401).json({ message: "unauthorized role" });
    }
    console.log("User role verified:", user.role);
    req.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

export default verifyRole;
