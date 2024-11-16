// components/Header.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import routes from "@/utils/routes";

const Header = () => {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("currentUser");
      if (data) {
        setUserData(JSON.parse(data));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("users");
    localStorage.removeItem("products");
    router.push(routes.login);
  };

  const toggleProfilePopup = () => {
    setIsProfilePopupOpen(!isProfilePopupOpen);
  };

  return (
    <header className="bg-gray-800 text-white py-4 px-6 sm:px-4">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
      <nav className="flex space-x-4">
          <Link
            href={routes.home}
            className={`hover:underline ${
              router.pathname === routes.home ? "text-yellow-400 font-bold" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href={routes.product}
            className={`hover:underline ${
              router.pathname === routes.product ? "text-yellow-400 font-bold" : ""
            }`}
          >
            Product
          </Link>
        </nav>

        {/* Right side: Logged-in user details */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleProfilePopup}
            className="flex items-center space-x-2 p-2 bg-gray-700 rounded-full hover:bg-gray-600"
          >
            <span>{userData ? userData.name : "Guest"}</span>
          </button>
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        </div>
      </div>

      {/* Profile Popup */}
      {isProfilePopupOpen && (
        <div
          className="absolute top-16 right-4 shadow-md rounded-lg w-72 p-4 z-50 bg-white sm:w-64 sm:right-2"
          style={{ zIndex: 50 }}
        >
          <h3 className="font-semibold text-lg mb-2 text-black">
            User Profile
          </h3>
          <img
            src={userData.userImage}
            alt="Uploaded Preview"
            className="border mt-2 object-contain rounded w-14 h-14"
          />
          <p className="text-sm text-black">
            Name: {userData ? userData.name : "N/A"}
          </p>
          <p className="text-sm text-black">
            Email: {userData ? userData.email : "N/A"}
          </p>
          <button
            onClick={toggleProfilePopup}
            className="mt-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
