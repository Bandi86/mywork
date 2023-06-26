import { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { MdOutlineFavorite } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnonymCartContext, UserCartContext } from '../../context/CartContext';
import { AuthContext, FavoritesContext } from '../../context/UserContexts';
import { addToCart } from '../../services/cartServices';
import './singleProduct.css';

export default function SingleProduct(props) {
	const { anonymCart, setAnonymCart } = useContext(AnonymCartContext);
	const { userCartFromDB, setUserCartFromDB } = useContext(UserCartContext);
	const { favorites, setFavorites } = useContext(FavoritesContext);
	const { users } = useContext(AuthContext);
	const loggedInUser = users.find((user) => user.isLoggedIn);

	function addToCartHandler() {
		if (!loggedInUser) {
			addToCart(props.product, anonymCart, setAnonymCart);
		} else {
			try {
				addToCart(props.product, userCartFromDB, setUserCartFromDB);
			} catch (error) {}
		}

		toast.success('A termék a kosárba került!', {
			position: 'top-center',
		});
	}

	function favoritesHandler() {
		if (!loggedInUser) {
			toast.warning('A kedvencekhez való hozzáadás csak bejelentkezés után lehetséges!', {
				position: 'top-center',
			});
			return;
		} else {
			if (favorites == null) {				
				setFavorites({ [props.product.item]: props.product.item });
				toast.success('A termék a kedvencekhez került!', {
					position: 'top-center',
				});
			} else {
				const same = Object.keys(favorites).some((i) => i == props.product.item);
				if (!same) {
					setFavorites({ ...favorites, [props.product.item]: props.product.item });
					toast.success('A termék a kedvencekhez került!', {
						position: 'top-center',
					});
				} else {
					toast.info('A termék már szerepel a kedvencei között!', {
						position: 'top-center',
					});
				}
			}
		}
	}

	return (
		<>
			<div className='product'>
				<NavLink to={`/termek/${props.product.item}`}>
					<img
						src={props.product.image}
						alt=''
					/>
					<h3>{props.product.title}</h3>
					<p>Termék Leírása:</p>
				</NavLink>
				<div className='product-bottom'>
					<span className='fav'>
						<MdOutlineFavorite onClick={favoritesHandler} />
					</span>
					<span>
						<FaShoppingCart onClick={addToCartHandler} />
					</span>
				</div>
				<p id='product-price'>{props.product.price} Ft</p>
			</div>
		</>
	);
}
