import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	AnonymCartContext,
	CartItemsContext,
	UserCartContext,
} from '../../context/CartContext';
import { AuthContext } from '../../context/UserContexts';
import { cartItemsData, cartTotal } from '../../services/cartServices';
import formatData from '../../services/formatData';
import { read } from '../../services/productServices';
import CartItem from './CartItem';
import './cart.style.css';

export default function Cartcomponent() {
	const navigate = useNavigate();
	// USER
	const { users } = useContext(AuthContext);
	const loggedInUser = users.find((user) => user.isLoggedIn);

	// ALL PRODUCTS
	const { cartItems, setCartItems, total, setTotal } = useContext(CartItemsContext);

	// CART VARS
	const { anonymCart, setAnonymCart } = useContext(AnonymCartContext); // anonym user cart
	const { userCartFromDB, setUserCartFromDB, userCartDBSync, setUserCartDBSync } =
		useContext(UserCartContext); // sync cart from db

	// CART RENDER VARS
	const [cartItemsRender, setCartItemsRender] = useState([]);

	useEffect(() => {
		read('termekek')
			.then((res) => res.json())
			.then((json) => {
				setCartItems(formatData(json));
				if (loggedInUser)
					try {
						setCartItemsRender(cartItemsData(userCartDBSync, formatData(json)));
					} catch (error) {}
				else {
					setCartItemsRender(cartItemsData(anonymCart, formatData(json)));
				}
			});
	}, [anonymCart, userCartDBSync]);

	useEffect(() => {
		if (loggedInUser) {
			try {
				setTotal(cartTotal(userCartDBSync, cartItems, 0));
			} catch (error) {}
		} else setTotal(cartTotal(anonymCart, cartItems, 0));
	}, [cartItemsRender]);

	function delAllCartHandler() {
		setAnonymCart({});
		if (loggedInUser) {
			setUserCartFromDB({});
		}
		toast.success('Kosár teljes tartalma törölve', {
			position: 'top-center',
		});
	}

	return (
		<div className='cart-container'>
			<div className='cart'>
				{cartItemsRender !== null ? (
					cartItemsRender.map((prd) => {
						return (
							<div key={prd.id}>
								{loggedInUser ? (
									<CartItem
										item={prd}
										cart={userCartFromDB}
										setter={setUserCartFromDB}
									/>
								) : (
									<CartItem
										item={prd}
										cart={anonymCart}
										setter={setAnonymCart}
									/>
								)}
							</div>
						);
					})
				) : (
					<>
						<h1>Kosarad üres</h1>
					</>
				)}
			</div>
			<div className='cart-bottom'>
				{cartItemsRender.length === 0 ? (
					<p>A kosár üres</p>
				) : (
					<>
						<button
							onClick={delAllCartHandler}
							className='delete-cart-all'
						>
							Kosár törlése
						</button>
						<p>
							<span>Fizetendő összesen:</span> <span id='cost'>{`${total} Ft`}</span>
						</p>
						<button
							className='pay'
							onClick={() => navigate('/megrendeles')}
						>
							Tovább a megrendeléshez
						</button>
					</>
				)}
			</div>
		</div>
	);
}
