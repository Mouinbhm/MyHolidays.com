import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Hotel from "../models/hotel";
import User from "../models/user";

const router = express.Router();

// /api/all-bookings
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const hotels = await Hotel.find({ "bookings.0": { $exists: true } });

    res.status(200).send(hotels);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch all bookings" });
  }
});

export default router;
