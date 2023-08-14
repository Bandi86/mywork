import React, { useContext, useState, useEffect } from "react";
import { userContext } from "../../contexts/userContext";
import { AiFillHeart } from "react-icons/ai";
import { Dropdown } from "flowbite-react";
import NavigationFavoritesInsert from "./NavigationFavoritesInsert";
import { readEntry } from "../../repositories/crud";
import { favoritesEndpoint } from "../../repositories/apiEndPoints";
import { IoIosHeartDislike } from "react-icons/io";

const FavoritesDropDown = () => {
  const { user, setUser, favorites, favoritesQuantity } =
    useContext(userContext);

  const [littleFavorites, setLittleFavorites] = useState([]); // last 5 item

  useEffect(() => {
    try {
      if (user?.localId) {
        readEntry(favoritesEndpoint, user.localId)
          .then((res) => res.json())
          .then((data) => {
            const lastFiveItem = data.resdata.slice(-5);
            setLittleFavorites(lastFiveItem);
          });
      } else {
        setLittleFavorites([]);
      }
    } catch (error) {}
  }, [user?.localId, setUser, favorites]);

  return (
    <div className="flex flex-row items-center gap-4 text-3xl">
      <Dropdown
        inline
        label={
          <>
            <div className="flex flex-row relative">
              <AiFillHeart className="text-4xl" />
              <span className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center text-xs bg-second rounded-full text-first">
                {favoritesQuantity}
              </span>
            </div>
            <span className="text-sm p-2">Favorites</span>
          </>
        }
      >
        {favoritesQuantity === 0 ? (
          <Dropdown.Item
            disabled
            className="flex flex-col items-center gap-6 p-4"
          >
            {" "}
            Favorites is empty
            <IoIosHeartDislike className="text-3xl" />
          </Dropdown.Item>
        ) : (
          <>
            <Dropdown.Item>
              <NavigationFavoritesInsert
                littleFavorites={littleFavorites}
                setLittleFavorites={setLittleFavorites}
                user={user}
              />
            </Dropdown.Item>
          </>
        )}
      </Dropdown>
    </div>
  );
};

export default FavoritesDropDown;
