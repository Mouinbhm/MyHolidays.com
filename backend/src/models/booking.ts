import mongoose from "mongoose";
import { BookingType } from "../shared/types";

<<<<<<< HEAD
const bookingSchema = new mongoose.Schema<BookingType>({
=======
const bookingSchema = new mongoose.Schema({
>>>>>>> ccabdffba99e2771232ab24ecbf27d601792f0b2
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
<<<<<<< HEAD
  paymentIntentId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model<BookingType>("Booking", bookingSchema);
=======
  // Ajout des informations de l'hôtel pour référence rapide
  hotelName: { type: String, required: true },
  hotelCity: { type: String, required: true },
  hotelCountry: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);
>>>>>>> ccabdffba99e2771232ab24ecbf27d601792f0b2
export default Booking;
