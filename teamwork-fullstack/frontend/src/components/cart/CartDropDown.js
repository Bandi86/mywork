import { Dropdown } from "flowbite-react";
import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../../contexts/userContext";
import { GiShoppingCart } from "react-icons/gi";
import { cartEndpoint } from "../../repositories/apiEndPoints";
import { readEntry } from "../../repositories/crud";
import NavigationCartInsert from "./NavigationCartInsert";
import { TbShoppingCartOff } from "react-icons/tb";

export default function CartDropDown() {
  const {
    user,
    setUser,
    cartItems,
    setCartItems,
    quantityMap,
    setQuantityMap,
  } = useContext(userContext);

  const [littleCart, setLittleCart] = useState([]); // last 5 item

  useEffect(() => {
    try {
      if (user?.localId) {
        readEntry(cartEndpoint, user.localId)
          .then((res) => res.json())
          .then((data) => {
            const lastFiveItem = data.resdata.slice(-5);
            setLittleCart(lastFiveItem);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        setLittleCart([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user?.localId, setUser, cartItems]);

  return (
    <div className="flex flex-row items-center gap-4 text-3xl">
      <Dropdown
        inline
        label={
          <>
            <div className="flex flex-row relative">
              <GiShoppingCart className="text-4xl" />
              <span className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center text-xs bg-second rounded-full text-first">
                {quantityMap}
              </span>
            </div>
            <span className="text-sm p-2">Cart</span>
          </>
        }
      >
        {quantityMap === 0 ? (
          <Dropdown.Item
            disabled
            className="flex flex-col items-center gap-6 p-4"
          >
            {" "}
            Cart is empty
            <TbShoppingCartOff className="text-3xl" />
          </Dropdown.Item>
        ) : (
          <>
            <Dropdown.Item>
              <NavigationCartInsert
                cartItems={littleCart}
                setCartItems={setLittleCart}
                user={user}
              />
            </Dropdown.Item>
          </>
        )}
      </Dropdown>
    </div>
  );
}
