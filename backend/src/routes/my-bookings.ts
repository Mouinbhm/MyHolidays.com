import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Booking from "../models/booking";
import { BookingType } from "../shared/types";

const router = express.Router();

// /api/my-bookings
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" }); // Ensure userId is present
    }

    const bookings = await Booking.find({ userId: req.userId }) // Fetch bookings for the authenticated user
      .populate("hotelId", "name city country imageUrls pricePerNight type starRating");

    // const results = hotels.map((hotel) => {
    //   const userBookings = hotel.bookings.filter(
    //     (booking) => booking.userId === req.userId
    //   );

    //   const hotelWithUserBookings: HotelType = {
    //     ...hotel.toObject(),
    //     bookings: userBookings,
    //   };

    //   return hotelWithUserBookings;
    // });

    if (!bookings) {
      return res.status(404).json({ message: "No bookings found" });
    }

    console.log(JSON.stringify(bookings, null, 2));

    res.status(200).send(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

export default router;
