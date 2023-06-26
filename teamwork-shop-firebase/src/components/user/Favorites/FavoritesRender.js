import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext, FavoritesContext } from '../../../context/UserContexts';
import SingleFavorites from './SingleFavorites';
import './favorites.style.css';
import { read } from '../../../services/productServices';
import { toast } from 'react-toastify';
import { favoritesData } from '../../../services/favoritesServices'
import formatData from '../../../services/formatData';

export default function FavoritesRender() {
	const { favorites, favoritesSync } = useContext(FavoritesContext);
	const { users } = useContext(AuthContext);
	const [favoritesRender, setFavoritesRender] = useState([]);
	const loggedInUser = users.find((user) => user.isLoggedIn);

	useEffect(() => {
		read(`termekek`)
			.then(res => res.json())
			.then(json => {
				setFavoritesRender(favoritesData(favorites, formatData(json)));
			})
	}, [favoritesSync])

	function favoritesRendering() {
		return (
			<>
				<h2 id='favorites-h2'>
					{favoritesSync !== null ? Object.keys(favoritesSync).length : 0} Találat
				</h2>
				<div className='favorites-container'>
					{favoritesRender !== null ? (
						favoritesRender?.map((product) => (
							<div
								className='favorites-product-container'
								key={uuidv4()}
							>
								<SingleFavorites product={product} />
							</div>
						))
					) : (
						<p></p>
					)}
				</div>
			</>
		);
	};

	return (
		<>
			{loggedInUser
				? favoritesRendering()
				: toast.warning(
					'A kedvencekhez való hozzáadás csak bejelentkezés után lehetséges!',
					{
						position: 'top-center',
					}
				)}
		</>
	);
}