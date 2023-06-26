import { useContext } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdOutlineFavorite } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { CartItemsContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/UserContexts';
import NavSignInOut from './Auth/NavSignInOut';
import NavigationSearchBar from './NavigationSearchBar';
import Logo from './logo.png';
import './navigation.style.css';

export default function Navigation() {
	const { cartItemsCount } = useContext(CartItemsContext);
	const { favoritesSync } = useContext(FavoritesContext);

	return (
		<div className='navi'>
			<div className='navi-left'>
				<NavLink
					id='logo'
					to='/'
				>
					<img
						src={Logo}
						alt='logo'
						width='100px'
						height='40px'
					/>
				</NavLink>
			</div>
			<div className='navi-right'>
				<NavigationSearchBar />
				<NavSignInOut />
				<div className='icon-container'>
					<div id='nav-cart-icon'>
						<NavLink to='/kosar'>
							<AiOutlineShoppingCart />
							<span>{cartItemsCount}</span>
						</NavLink>
					</div>
					<div id='nav-heart-icon'>
						<NavLink to='/kedvencek'>
							<MdOutlineFavorite style={{ color: 'red' }} />
							<span>
								{favoritesSync !== null ? Object.keys(favoritesSync).length : 0}
							</span>
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
}
