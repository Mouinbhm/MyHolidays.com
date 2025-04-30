import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
<<<<<<< HEAD
import Hotel from "../models/hotel";
import Booking from "../models/booking";
import { HotelType } from "../shared/types";
=======
import Booking from "../models/booking";
import User from "../models/user";
>>>>>>> ccabdffba99e2771232ab24ecbf27d601792f0b2

const router = express.Router();

// Route pour récupérer les réservations d'un utilisateur
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
<<<<<<< HEAD
    const bookings = await Booking.find({ userId: req.userId });
    const hotelIds = [...new Set(bookings.map((booking) => booking.hotelId))];

    const hotels = await Hotel.find({ _id: { $in: hotelIds } });

    const results = hotels.map((hotel) => {
      const userBookings = bookings.filter(
        (booking) => booking.hotelId === hotel._id.toString()
      );

      const hotelWithUserBookings: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings,
      };

      return hotelWithUserBookings;
    });

    res.status(200).send(results);
=======
    const bookings = await Booking.find({ userId: req.userId }).sort({
      createdAt: -1,
    }); // Trier par date de création décroissante

    res.status(200).json(bookings);
>>>>>>> ccabdffba99e2771232ab24ecbf27d601792f0b2
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
