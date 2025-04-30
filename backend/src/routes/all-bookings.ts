import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Hotel from "../models/hotel";
import User from "../models/user";
import Booking from "../models/booking";

const router = express.Router();

// /api/all-bookings
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const bookings = await Booking.find();
    const hotelIds = [...new Set(bookings.map((booking) => booking.hotelId))];
    const hotels = await Hotel.find({ _id: { $in: hotelIds } });

    const results = hotels.map((hotel) => {
      const hotelBookings = bookings.filter(
        (booking) => booking.hotelId === hotel._id.toString()
      );

      return {
        ...hotel.toObject(),
        bookings: hotelBookings,
      };
    });

    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch all bookings" });
  }
});

export default router;
