import { Outlet } from 'react-router-dom';
import AdminNavigation from './AdminNavigation';
import Footer from '../../components/user/Footer';
import { AuthContext } from '../../context/UserContexts';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

export default function AdminLayout() {
	const { users } = useContext(AuthContext);
	const role = users.map( o => {if(o.isLoggedIn) return o.role }); //,,,admin || ,,user, || ,,,,
	const isAdmin = role.some(o => o === "admin");

	return (
		<>
			{isAdmin ? (
				<div className='layout-flex'>
					<AdminNavigation />
					<main>
						<div className='admin'>
							<Outlet />
						</div>
					</main>
					<Footer />
				</div>
			) : (
				<>
				<h1>Nincs hozzáférés.</h1>
				<NavLink to="/">Vissza a kezdőlapra</NavLink>
				</>
			)}
		</>
	);
}
