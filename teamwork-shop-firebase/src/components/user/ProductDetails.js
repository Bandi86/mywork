import { useContext, useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { MdOutlineFavorite } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnonymCartContext, UserCartContext } from '../../context/CartContext';
import { AuthContext, FavoritesContext } from '../../context/UserContexts';
import { addToCart } from '../../services/cartServices';
import { read } from '../../services/productServices';

export default function ProductDetails() {
	const { termekID } = useParams();
	const [productDetail, setProductDetail] = useState({});

	const { anonymCart, setAnonymCart } = useContext(AnonymCartContext);
	const { userCartFromDB, setUserCartFromDB } = useContext(UserCartContext);
	const { favorites, setFavorites } = useContext(FavoritesContext);
	const { users } = useContext(AuthContext);
	const loggedInUser = users.find((user) => user.isLoggedIn);

	useEffect(() => {
		try {
			read(`/termekek/${termekID}`)
				.then((res) => res.json())
				.then((json) => {
					try {
						let obj = {
							...json,
							item: termekID,
						};
						setProductDetail(obj);
					} catch (error) {}
				});
		} catch (error) {}
	}, []);

	function addToCartHandler() {
		if (!loggedInUser) {
			addToCart(productDetail, anonymCart, setAnonymCart);
		} else {
			try {
				addToCart(productDetail, userCartFromDB, setUserCartFromDB);
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
				setFavorites({ [productDetail.item]: productDetail.item });
				toast.success('A termék a kedvencekhez került!', {
					position: 'top-center',
				});
			} else {
				const same = Object.keys(favorites).some((i) => i == productDetail.item);
				if (!same) {
					setFavorites({ ...favorites, [productDetail.item]: productDetail.item });
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
			<h2>Termék Adatlapja</h2>
			{Object.keys(productDetail).length !== 0 ? (
				<>
					<img
						src={productDetail.image}
						alt={productDetail.title}
					/>
					<h3>{productDetail.title}</h3>
					<p>{productDetail.description}</p>
					<p>{productDetail.price}</p>
					<div className='product-bottom'>
						<span className='fav'>
							<MdOutlineFavorite onClick={favoritesHandler} />
						</span>
						<span>
							<FaShoppingCart onClick={addToCartHandler} />
						</span>
					</div>
				</>
			) : (
				<h2>Termék nem található</h2>
			)}
		</>
	);
}
