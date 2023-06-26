import React, { useContext } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../context/UserContexts.js';
import { AnonymCartContext } from '../../../context/CartContext.js';
import '../navigation.style.css';
import { toast } from 'react-toastify';
import { logout } from '../icons.js';
import { FavoritesContext } from '../../../context/UserContexts';

const NavSignInOut = () => {
	const { users, setUsers } = useContext(AuthContext);
	const { anonymCart, setAnonymCart } = useContext(AnonymCartContext);
	const { setFavoritesSync, setFavorites } = useContext(FavoritesContext);

	function handleLogout() {
		const loggedInUser = users.find((user) => user.isLoggedIn);
		setUsers(
			users.map((user) => (user.isLoggedIn ? { ...user, isLoggedIn: false } : user))
		);
		setAnonymCart([]);
		setFavorites({});
		setFavoritesSync({});
		if (loggedInUser) {
			toast.success(`Sikeres kijelentkezés, Viszlát ${loggedInUser.displayName}!`, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	}

	const isLoggedIn = users.some((user) => user.isLoggedIn);
	if (isLoggedIn) {
		const user = users.find((user) => user.isLoggedIn);
		return (
			<>
				<p className='welcome'>
					Üdvözlöm: <span id='user-nav-name'>{user.displayName}</span>
				</p>
				<NavLink to={`/felhasznalo-profil/${user.item}/adatlap`}>
					<span id='nav-user-icon'>
						<AiOutlineUser />
					</span>
				</NavLink>
				<NavLink
					to='/'
					onClick={handleLogout}
				>
					{logout}
				</NavLink>
			</>
		);
	} else {
		return (
			<NavLink to='/belepes'>
				<span id='nav-user-icon'>
					<AiOutlineUser />
				</span>
			</NavLink>
		);
	}
};

export default NavSignInOut;
