import SearchBar from "./SearchBar";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo 2.png";
import Categories from "./NavCategories";
import DropdownItemsWithIcon from "./NavProfile";
import CartDropDown from "../cart/CartDropDown";
import FavoritesDropDown from "../favorites/FavoritesDropDown";
import { useContext } from "react";
import { userContext } from "../../contexts/userContext";
import { searchContext } from "../../contexts/searchContext";

export default function Navbar() {
  const { user } = useContext(userContext);
  const location = useLocation();
  const { searchTerm, setSearchTerm } = useContext(searchContext);

  return (
    <>
      <div className="w-full bg-main text-first font-bold">
        <div className="flex flex-row items-center justify-evenly p-4 md:gap-[10rem]">
          <div className="pl-[10rem]">
            <NavLink to="/">
              <img
                src={logo}
                className="h-[5rem] w-[8rem] object-contain"
                alt="Logo"
              />
            </NavLink>
          </div>
          {/* For mobile responsiveness, stack the elements vertically */}
          <div className="flex flex-col items-center md:flex-row md:items-center md:gap-4">
            {/* Display the search bar as a full-width input */}
            {searchTerm.show && window.location.pathname != "/" && !window.location.pathname.includes("login") && !window.location.pathname.includes("registration") && (
              <div className="w-full md:w-auto md:flex-1">
                <SearchBar />
              </div>
            )}
          </div>
          <div className="pr-[10rem]">
            <div className="flex items-center gap-4 py-2 md:gap-20">
              {/* Display the user's favorites, cart, and dropdown items */}
              {user.localId ? <FavoritesDropDown /> : null }
              <CartDropDown />
              <DropdownItemsWithIcon />
            </div>
            {/* Optional: Add some empty space on the right side of the navbar */}
          </div>
        </div>
      </div>
      {/* Hide the Categories component on smaller screens */}
      {location.pathname === "/registration" ||
      location.pathname === "/login" ? null : (
        <div className="hidden md:block">
          <Categories />
        </div>
      )}
    </>
  );
}
