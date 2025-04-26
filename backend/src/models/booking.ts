import mongoose from "mongoose";
import { BookingType } from "../shared/types";

const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  userId: { type: String, required: true },
  hotelId: { type: String, required: true },
  totalCost: { type: Number, required: true },
  // Ajout des informations de l'hôtel pour référence rapide
  hotelName: { type: String, required: true },
  hotelCity: { type: String, required: true },
  hotelCountry: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
