import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const AdminBookings = () => {
  const { data: bookings, isLoading } = useQuery(
    "fetchAllBookings",
    apiClient.fetchAllBookings,
    {
      refetchOnWindowFocus: false,
      staleTime: 300000, // 5 minutes
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!bookings || bookings.length === 0) {
    return <span>No bookings found</span>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">All Bookings</h1>
      <div className="grid grid-cols-1 gap-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="border border-slate-300 rounded-lg p-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-xl font-bold">{booking.hotelName}</h2>
                <p className="text-gray-600">
                  {booking.hotelCity}, {booking.hotelCountry}
                </p>
              </div>
              <div className="text-right">
                <p className="text-green-600 font-bold">
                  Total: ${booking.totalCost}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p>
                <span className="font-bold">Guest: </span>
                {booking.firstName} {booking.lastName}
              </p>
              <p>
                <span className="font-bold">Dates: </span>
                {new Date(booking.checkIn).toLocaleDateString()} -
                {new Date(booking.checkOut).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookings;
