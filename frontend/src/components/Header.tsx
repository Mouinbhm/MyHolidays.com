import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  const { data: user } = useQuery("getMe", apiClient.getMe, {
    onError: () => {},
  });

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">MyHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              {user && user.role !== "ADMIN" ? (
                <Link
                  className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                  to="/my-bookings"
                >
                  My Bookings
                </Link>
              ) : (
                <></>
              )}
              {user && user.role === "ADMIN" ? (
                <>
                  <Link
                    className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                    to="/my-hotels"
                  >
                    My Hotels
                  </Link>
                  <Link
                    className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                    to="/all-bookings"
                  >
                    All Bookings
                  </Link>
                </>
              ) : (
                <></>
              )}
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
