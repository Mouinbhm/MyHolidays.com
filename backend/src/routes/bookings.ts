import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Booking from "../models/booking";
import Hotel from "../models/hotel";

const router = express.Router();

// /api/bookings/:bookingId
router.get("/:bookingId", verifyToken, async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Vérifier que l'utilisateur a le droit de voir ce booking
    if (booking.userId !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Récupérer les informations de l'hôtel
    const hotel = await Hotel.findById(booking.hotelId);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({
      booking,
      hotel: {
        _id: hotel._id,
        name: hotel.name,
        city: hotel.city,
        country: hotel.country,
        imageUrls: hotel.imageUrls,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch booking" });
  }
});

export default router;
