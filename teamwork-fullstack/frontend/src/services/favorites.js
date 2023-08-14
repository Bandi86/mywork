import { createEntry, removeEntry } from "../repositories/crud";
import {
  favoritesEndpoint,
  emptyFavoritesEndpoint,
} from "../repositories/apiEndPoints";

export function addtoFavorites(productId, state, toast, isLoggedIn) {
  if (isLoggedIn) {
    const data = {
      product_id: productId,
    };

    return createEntry(data, favoritesEndpoint)
      .then((res) => {
        if (res.ok) {
          //alert("Product added to cart");
          toast.success("Product saved into favorites", {
            position: toast.POSITION.TOP_RIGHT,
          });
          return !state;
        } else {
          toast.error("Failed to save product into favorites or already a favorite", {
            position: toast.POSITION.TOP_RIGHT,
          });
          throw new Error("Failed to save product into favorites");
        }
      })
      .catch((error) =>
        console.error("Failed to save product into favorites:", error)
      );
  }
  else {
    toast.error("Login required to access this action", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
}

export function removeFavorites(productId, state, toast, isLoggedIn) {
  if (isLoggedIn) {
    const data = {
      url: `${favoritesEndpoint}/${productId}`,
    };

    return removeEntry(data)
      .then((res) => {
        if (res.ok) {
          toast.success("Product removed from favorites", {
            position: toast.POSITION.TOP_RIGHT,
          });
          return !state
        }
        else {
          toast.error("Failed to remove product from favorites", {
            position: toast.POSITION.TOP_RIGHT,
          });
          throw new Error("Failed to remove product from favorites");
        }
      })
      .catch((error) =>
        console.error("Failed to remove product from favorites:", error)
      );
  }
  else {
    toast.error("Login required to access this action", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
}

export function emptyFavorites(state, toast, isLoggedIn) {
  if (isLoggedIn) {
    const data = {
      url: emptyFavoritesEndpoint,
    };

    return removeEntry(data)
      .then((res) => {
        if (res.ok) {
          toast.success("Favorites has been emptied", {
            position: toast.POSITION.TOP_RIGHT,
          });
          return !state;
        }
        else {
          toast.error("Failed to empty favorites", {
            position: toast.POSITION.TOP_RIGHT,
          });
          throw new Error("Failed to empty favorites");
        }
      })
      .catch((error) =>
        console.error("Failed to empty favorites:", error)
      );
  }
  else {
    toast.error("Login required to access this action", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
}
