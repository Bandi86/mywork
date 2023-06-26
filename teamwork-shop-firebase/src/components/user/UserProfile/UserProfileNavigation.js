import { NavLink, useParams, Outlet } from 'react-router-dom';

const UserProfileNavigation = () => {
	const { id } = useParams();
	return (
		<>
			<div className='user-profile-container'>
				<div className='user-profile-menu'>
					<ul>
						<NavLink to={`/felhasznalo-profil/${id}/adatlap`}>
							<li>Profil Adatlap</li>
						</NavLink>
						<NavLink to={`/felhasznalo-profil/${id}/cimjegyzek`}>
							<li>Címjegyzék</li>
						</NavLink>
						<NavLink to={`/felhasznalo-profil/${id}/megrendelesek`}>
							<li>Megrendelések</li>
						</NavLink>
						<NavLink to={`/felhasznalo-profil/${id}/kedvencek`}>
							<li>Kedvencek</li>
						</NavLink>
					</ul>
				</div>
			</div>
			<Outlet />
		</>
	);
};

export default UserProfileNavigation;
