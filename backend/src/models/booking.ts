import { BookingType } from "../shared/types";
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema<BookingType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  userId: { type: String, required: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
  totalCost: { type: Number, required: true },
});

const Booking = mongoose.model<BookingType>("Bookings", bookingSchema);

export default Booking;
