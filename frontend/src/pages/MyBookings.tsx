import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const MyBookings = () => {
  const { data: bookings } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if (!bookings || bookings.length === 0) {
    return <span>No bookings found</span>;
  }


  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {bookings.map((booking, idx) => (
        <div key={idx} className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
          <div className="lg:w-full lg:h-[250px]">
            <img
              src={booking?.hotelId?.imageUrls[0]}
              alt={booking.hotelId.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="text-2xl font-bold">
              {booking.hotelId.name}
              <div className="text-xs font-normal">
                {booking.hotelId.city}, {booking.hotelId.country}
              </div>
            </div>

            <div>
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
