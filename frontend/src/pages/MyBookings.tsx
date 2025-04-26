import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const MyBookings = () => {
  const { data: bookings, isLoading } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!bookings || bookings.length === 0) {
    return <span>No bookings found</span>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {bookings.map((booking) => (
        <div key={booking._id} className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
          <div className="text-2xl font-bold">
            {booking.hotelName}
            <div className="text-xs font-normal">
              {booking.hotelCity}, {booking.hotelCountry}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-bold mr-2">Dates: </span>
              <span>
                {new Date(booking.checkIn).toDateString()} -
                {new Date(booking.checkOut).toDateString()}
              </span>
            </div>
            <div>
              <span className="font-bold mr-2">Guests:</span>
              <span>
                {booking.adultCount} adults, {booking.childCount} children
              </span>
            </div>
            <div>
              <span className="font-bold mr-2">Total Cost:</span>
              <span>${booking.totalCost}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
