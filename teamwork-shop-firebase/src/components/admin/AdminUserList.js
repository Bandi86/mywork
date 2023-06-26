import { useContext } from 'react';
import { AuthContext } from '../../context/UserContexts';

const AdminUserList = () => {
	const { users } = useContext(AuthContext);
	const nonAdminUsers = users.filter((user) => user.role !== 'admin');

	return (
		<div className='user-list'>
			<h1>Felhasználók Listája</h1>
			<ul>
				{nonAdminUsers?.map((user, index) => (
					<li key={user.item}>
						<h2>Név: {user.displayName}</h2>
						<p>Email: {user.email}</p>
						<p>Állapot: {user.isLoggedIn ? 'Bejelentkezve' : 'Nincs bejelentkezve'}</p>
						<p>Kosár Tartalom! Ez még nem dinamikus</p>
						<p>ID: {user.item}</p>
						<p>Index: {index}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AdminUserList;
