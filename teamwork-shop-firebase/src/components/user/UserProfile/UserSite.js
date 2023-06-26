import UserProfileNavigation from './UserProfileNavigation';
import { AuthContext } from '../../../context/UserContexts';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

const UserSite = () => {
	const navigate = useNavigate();
	const { users } = useContext(AuthContext);
	const user = users.find((user) => user.isLoggedIn);
	return (
		<div className='user-profile'>{user ? <UserProfileNavigation /> : navigate('/')}</div>
	);
};

export default UserSite;
