import { useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const Invoice = () => {
  const pdfRef = useRef<HTMLDivElement>(null);
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchHotelByID",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  useEffect(() => {
    if (hotel && currentUser) {
      setTimeout(() => {
        const element = pdfRef.current;
        if (element) {
          html2pdf()
            .from(element)
            .set({
              margin: 0.5,
              filename: "booking-receipt.pdf",
              html2canvas: { scale: 2 },
              jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
            })
            .save();
        }
      }, 300);
    }
  }, [hotel, currentUser]);

  if (!hotel || !currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8" ref={pdfRef}>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8 border-b pb-6">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">
            Booking Receipt
          </h1>
          <p className="text-gray-600 text-lg">Thank you for your booking!</p>
        </div>

        {/* Guest Information */}
        <div className="mb-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
            Guest Information
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="font-semibold text-gray-700 mb-1">Name:</p>
              <p className="text-lg">
                {currentUser.firstName} {currentUser.lastName}
              </p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="font-semibold text-gray-700 mb-1">Email:</p>
              <p className="text-lg">{currentUser.email}</p>
            </div>
          </div>
        </div>

        {/* Hotel Details */}
        <div className="mb-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
            Hotel Details
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="font-semibold text-gray-700 mb-1">Hotel Name:</p>
              <p className="text-lg">{hotel.name}</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="font-semibold text-gray-700 mb-1">Location:</p>
              <p className="text-lg">
                {hotel.city}, {hotel.country}
              </p>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="mb-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
            Booking Details
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="font-semibold text-gray-700 mb-1">Check-in Date:</p>
              <p className="text-lg">
                {new Date(
                  hotel.bookings[hotel.bookings.length - 1].checkIn
                ).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="font-semibold text-gray-700 mb-1">
                Check-out Date:
              </p>
              <p className="text-lg">
                {new Date(
                  hotel.bookings[hotel.bookings.length - 1].checkOut
                ).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="font-semibold text-gray-700 mb-1">
                Number of Guests:
              </p>
              <p className="text-lg">
                {hotel.bookings[hotel.bookings.length - 1].adultCount} adults,{" "}
                {hotel.bookings[hotel.bookings.length - 1].childCount} children
              </p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="font-semibold text-gray-700 mb-1">Total Cost:</p>
              <p className="text-lg text-green-600 font-bold">
                £
                {hotel.bookings[hotel.bookings.length - 1].totalCost.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 border-t pt-6">
          <p className="text-lg mb-2">This is your official booking receipt.</p>
          <p className="text-lg">Please keep this document for your records.</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
