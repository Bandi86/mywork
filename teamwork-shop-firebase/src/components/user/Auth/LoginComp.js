import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/UserContexts';
import { userLogin } from '../../../services/userServices';

const LoginComp = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const { users, setUsers } = useContext(AuthContext);

	function handleSubmit(e) {
		e.preventDefault();
		userLogin(formData, users, setUsers, navigate);
	}

	return (
		<>
			<h2>Bejelentkezés</h2>
			<form>
				<label htmlFor='email'>Email Cím:</label>
				<input
					type='email'
					id='loginEmail'
					name='email'
					autoComplete='email'
					placeholder='Email'
					required
					value={formData.email}
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
				/>
				<label htmlFor='password'>Jelszó:</label>
				<input
					type='password'
					name='password'
					id='loginPassword'
					autoComplete='current-password'
					placeholder='Jelszó'
					required
					value={formData.password}
					onChange={(e) => setFormData({ ...formData, password: e.target.value })}
				/>
				<button
					type='submit'
					className='form-button'
					onClick={(e) => handleSubmit(e)}
				>
					Bejelentkezés
				</button>
			</form>
		</>
	);
};

export default LoginComp;