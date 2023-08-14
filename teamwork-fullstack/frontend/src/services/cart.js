import { createEntry, updateEntry, removeEntry } from "../repositories/crud";
import {
  cartEndpoint,
  decreaseCartEndpoint,
  emptyCartEndpoint,
} from "../repositories/apiEndPoints";

export function addToCart(productId, quantity, state, toast, isLoggedIn) {
  if (isLoggedIn) {
    const cart = {
      product_id: productId,
      quantity: quantity,
    };

    return createEntry(cart, cartEndpoint)
      .then((res) => {
        if (res.ok) {
          //alert("Product added to cart");
          toast.success("Product added to cart", {
            position: toast.POSITION.TOP_RIGHT,
          });
          return !state;
        } else {
          toast.error("Failed to add product to cart", {
            position: toast.POSITION.TOP_RIGHT,
          });
          throw new Error("Failed to add product to cart");
        }
      })
      .catch((error) => console.error("Failed to add product to cart:", error));
  }
  else {
    toast.error("Login required to access this action", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
}

export function decreaseCart(productId, quantity, state, toast, isLoggedIn) {
  if (isLoggedIn) {
    const cart = {
      product_id: productId,
      quantity: quantity,
    };

    return updateEntry(cart, decreaseCartEndpoint)
      .then((res) => {
        if (res.ok) {
          //alert("Product added to cart");
          toast.success("Product removed from cart", {
            position: toast.POSITION.TOP_RIGHT,
          });
          return !state;
        } else {
          toast.error("Failed to remove product from cart", {
            position: toast.POSITION.TOP_RIGHT,
          });
          throw new Error("Failed to remove product from cart");
        }
      })
      .catch((error) => console.error("Failed to remove product from cart:", error));
  }
  else {
    toast.error("Login required to access this action", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
}

export function removeFromCart(productId, state, toast, isLoggedIn) {
  if (isLoggedIn) {
    const data = {
      url: `${cartEndpoint}/${productId}`,
    };

    return removeEntry(data).then((res) => {
      if (res.ok) {
        //alert("Product added to cart");
        toast.success("Product removed from cart", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return !state;
      } else {
        toast.error("Failed to remove product from cart", {
          position: toast.POSITION.TOP_RIGHT,
        });
        throw new Error("Failed to remove product from cart");
      }
    })
      .catch((error) => console.error("Failed to remove product from cart:", error))
  }
  else {
    toast.error("Login required to access this action", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
}

export function emptyCart(state, toast, isLoggedIn) {
  if (isLoggedIn) {

    const data = {
      url: emptyCartEndpoint,
    };

    return removeEntry(data).then((res) => {
      if (res.ok) {
        //alert("Product added to cart");
        toast.success("Cart has been emptied", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return !state;
      } else {
        toast.error("Failed to empty your cart", {
          position: toast.POSITION.TOP_RIGHT,
        });
        throw new Error("Failed to empty your cart");
      }
    })
      .catch((error) => console.error("Failed to empty your cart:", error))
  }
  else {
    toast.error("Login required to access this action", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
}
