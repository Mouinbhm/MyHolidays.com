import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Booking from "../models/booking";
import User from "../models/user";

const router = express.Router();

// Route pour récupérer les réservations d'un utilisateur
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({ userId: req.userId }).sort({
      createdAt: -1,
    }); // Trier par date de création décroissante

    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

// Route pour l'admin - toutes les réservations
router.get("/all", verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const bookings = await Booking.find().sort({ createdAt: -1 }).lean();

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Fetch bookings error:", error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

export default router;
