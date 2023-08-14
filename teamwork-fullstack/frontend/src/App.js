import { RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { userContext } from "./contexts/userContext";
import { adminContext } from "./contexts/adminContext";
import { searchContext } from "./contexts/searchContext";
import { readEntry, createEntry } from "./repositories/crud";
import {
  cartEndpoint,
  favoritesEndpoint,
  userProfileEndpoint,
} from "./repositories/apiEndPoints";
import { useCookies } from "react-cookie";
import { router } from "./services/path";

//Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState({});
  const [searchTerm, setSearchTerm] = useState({
    show: true,
    text:"",
});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quantityMap, setQuantityMap] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  // const [anonymCart, setAnonymCart] = useState([]);
  const [updateCart, setUpdateCart] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [updateFavorites, setUpdateFavorites] = useState(true);
  const [favoritesQuantity, setFavoritesQuantity] = useState(0);
  const [profileData, setProfileData] = useState({});
  const userFromLocalStorage = localStorage.getItem("user");
  const [cookies] = useCookies(["sessionID"]);
  const id = user?.localId;
  const [updateProfile, setUpdateProfile] = useState(true)
  const [adminRefresh, setAdminRefresh] = useState(true)

  //USER DATA
  useEffect(() => {
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
      setIsLoggedIn(true);
    }
    else {
      document.cookie = "sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }, [userFromLocalStorage, isLoggedIn]);

  // AUTHORIZATION
  useEffect(() => {
    if (cookies?.sessionID) {
      setUser(JSON.parse(userFromLocalStorage));
      setIsLoggedIn(true);
    } else {
      localStorage.clear();
      setUser({});
      setIsLoggedIn(false);
    }
  }, []);

  // CART
  useEffect(() => {
    if (!id) {
      setCartItems([]);
    } else {
      readEntry(cartEndpoint)
        .then((res) => res.json())
        .then((data) => {
          if (data.resdata) {
            setCartItems(data.resdata);
          }
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
        });
    }
  }, [id, updateCart, user, isLoggedIn]);

  // // ANONYM AND USER CART CONCATENATION
  // useEffect(() => {
  //   if (anonymCart.length > 0) {
  //     anonymCart.forEach(element => {
  //       const cart = { [element]: anonymCart[element] }

  //       createEntry(cart, cartEndpoint)
  //         .then((res) => {
  //           if (res.ok) {
  //             //alert("Product added to cart");
  //             return setUpdateCart(!updateCart);
  //           } else {
  //             throw new Error("Failed to add product to cart");
  //           }
  //         })
  //         .catch((error) => console.error("Failed to add product to cart:", error));
  //     });
  //   }

  // }, [id, user, isLoggedIn])

  // QUANTITY
  useEffect(() => {
    let count = 0;
    cartItems.forEach((item) => {
      count += item.quantity;
    });
    setQuantityMap(count);
  }, [cartItems, user, updateCart, isLoggedIn]);

  // FAVORITES
  useEffect(() => {
    isLoggedIn &&
      readEntry(favoritesEndpoint)
        .then((res) => res.json())
        .then((data) => {
          if (data.resdata) {
            setFavorites(data.resdata);
          }
        });
  }, [id, updateFavorites, user, isLoggedIn]);

  // FAVORITES QUANTITY
  useEffect(() => {
    setFavoritesQuantity(favorites.length);
  }, [favorites, user, updateFavorites, isLoggedIn]);

  // USERPROFILE DATA
  useEffect(() => {
    if (isLoggedIn) {
      try {
        readEntry(`${userProfileEndpoint}/${user.localId}`)
          .then((res) => res.json())
          .then((data) => {
            setProfileData(data.resdata);
          });
      } catch (err) { }
    } else setProfileData({});
  }, [user, updateProfile, isLoggedIn]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <searchContext.Provider value={{
        searchTerm, setSearchTerm
      }}>
        <userContext.Provider
          value={{
            user, setUser,
            isLoggedIn, setIsLoggedIn,
            cartItems, setCartItems,
            // anonymCart, setAnonymCart,
            quantityMap, setQuantityMap,
            updateCart, setUpdateCart,
            favorites, setFavorites,
            updateFavorites, setUpdateFavorites,
            favoritesQuantity, setFavoritesQuantity,
            profileData, setProfileData,
            updateProfile, setUpdateProfile,
          }}
        >
          <adminContext.Provider value={{ adminRefresh, setAdminRefresh }}>
            <RouterProvider router={router} />
          </adminContext.Provider>
        </userContext.Provider>
      </searchContext.Provider>
    </>
  );
}

export default App;
