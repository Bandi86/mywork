import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { removeFavorites } from "../../services/favorites";
import { removeFromCart } from "../../services/cart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { userContext } from "../../contexts/userContext";

export default function ProductBox({
  product,
  imageSrc,
  updateFavorites,
  setUpdateFavorites,
  updateCart,
  setUpdateCart,
  isFavorites,
}) {
  const { isLoggedIn } = useContext(userContext);
  function handleDelete() {
    try {
      if (updateFavorites) {
        setUpdateFavorites(
          removeFavorites(product.id, updateFavorites, toast, isLoggedIn)
        );
      } else if (updateCart) {
        setUpdateCart(
          removeFromCart(product.id, updateCart, toast, isLoggedIn)
        );
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  return (
    <div className="product-card flex flex-row w-full h-min-fit justify-between items-center p-2 gap-2 border-2 border-slate-200 bg-white shadow-md rounded-lg transition duration-300 ease-in-out transform hover:shadow-lg">
      <Link
        to={`/products/${product.id}`}
        key={nanoid()}
        className="flex flex-row gap-2"
      >
        <img
          src={imageSrc}
          alt={product.name}
          className="w-20 h-20 object-cover"
        />
        <div className="flex flex-col ml-6 gap-2">
          <p>{product.name}</p>

          {isFavorites ? (
            <>
              <p className="text-second">
                {product.price} €
              </p>
            </>
          ) : (
            <>
              <p className="text-second">
                {product.price * product.quantity} €
              </p>
              <p>qty: {product.quantity}</p>
            </>
          )}
        </div>
      </Link>
      <button
        className="bg-second text-white border-2 rounded-md p-2 cursor-pointer hover:bg-red-600 hover:text-second transition duration-300 ease-in-out"
        onClick={() => handleDelete()}
      >
        X
      </button>
    </div>
  );
}
