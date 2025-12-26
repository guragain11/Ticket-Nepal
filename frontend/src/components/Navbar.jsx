import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  MenuIcon,
  SearchIcon,
  TicketPlus,
  XIcon,
} from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate(); // ✅ FIXED

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 lg:px-36 py-5">
      <Link to="/" className="max-md:flex-1">
        <img src={assets.logo} alt="Logo" className="w-36 h-auto" />
      </Link>

      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 z-50 flex flex-col md:flex-row items-center
        gap-8 px-8 py-3 max-md:h-screen bg-black/70 md:bg-white/10 md:border
        border-gray-300/20 transition-all duration-300 ${
          isOpen ? "max-md:w-full" : "max-md:w-0"
        }`}
      >
        <XIcon
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
          onClick={() => setIsOpen(false)}
        />

        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/movies" onClick={() => setIsOpen(false)}>Movies</Link>
        <Link to="/favorite" onClick={() => setIsOpen(false)}>Favorites</Link>
      </div>

      <div className="flex items-center gap-6">
        <SearchIcon className="hidden md:block w-6 h-6 cursor-pointer" />

        {!user ? (
          <button
            onClick={openSignIn}
            className="px-6 py-2 bg-primary rounded-full font-medium"
          >
            Login
          </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<TicketPlus width={15} />} // ✅ FIXED
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}

        <MenuIcon
          className="md:hidden w-8 h-8 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    </div>
  );
};

export default Navbar;
