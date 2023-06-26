import { useContext } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserCartContext } from '../../../context/CartContext';
import { AuthContext, FavoritesContext } from '../../../context/UserContexts';
import { addToCart } from '../../../services/cartServices';
import { delFavorite } from '../../../services/favoritesServices';

export default function SingleFavorites(props) {
	const { favorites, setFavorites, setFavoritesSync } = useContext(FavoritesContext);
	const { users } = useContext(AuthContext);
	const { userCartFromDB, setUserCartFromDB } = useContext(UserCartContext);
	const loggedInUser = users.find((user) => user.isLoggedIn);

	function addToCartHandler() {
		if (!loggedInUser) {
			toast.warning('A kedvencekhez való hozzáadás csak bejelentkezés után lehetséges!', {
				position: 'top-center',
			});
		} else {
			addToCart(props.product, userCartFromDB, setUserCartFromDB);
			toast.success('A termék a kosárba került!', {
				position: 'top-center',
			});
		}
	}

	function removeFromFavorites() {
		
		delFavorite(props.product.item, favorites, setFavorites);
		console.log('favorites', favorites);

		// setFavorites(favorites.filter((item) => item !== productId));
		toast.success('A termék a kedvencekből törölve!', {
			position: 'top-center',
		});
	}
	return (
		<div className='favorites-product'>
			<img
				src={props.product.image}
				alt=''
				className='favorites-product-image'
			/>
			<div className='favorites-bottom'>
				<h3>{props.product.title}</h3>
				<p id='favorite-price'>{props.product.price} Ft</p>
				<div className='favorites-icons'>
					<span id='remove-favorites-icon'>
						<MdRemoveShoppingCart onClick={() => removeFromFavorites()} />{' '}
					</span>
					<span className='favorites-addtocart'>
						<AiOutlineShoppingCart onClick={addToCartHandler} />
					</span>
				</div>
			</div>
		</div>
	);
}
