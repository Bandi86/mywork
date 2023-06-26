import { useState, useContext } from 'react';
import { AuthContext } from '../../../context/UserContexts';
import { createNewUser } from '../../../services/userServices';

const SignUpComp = () => {
	const { users, setUsers } = useContext(AuthContext);

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		passwordConfirm: '',
	});

	function handleSubmit(e, formData) {
		e.preventDefault();
		createNewUser(formData, setUsers);
	}

	return (
		<>
			<h2>Regisztráció</h2>
			<form>
				<label htmlFor='name'>Felhasználó Név:</label>
				<input
					type='text'
					name='text'
					id='name'
					autoComplete='name'
					placeholder='Név'
					required
					value={formData.name}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
				/>
				<label htmlFor='email'>Email Cím:</label>
				<input
					type='email'
					name='email'
					id='signInEmail'
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
					id='signInPassword'
					autoComplete='current-password'
					placeholder='Jelszó'
					required='required'
					value={formData.password}
					onChange={(e) => setFormData({ ...formData, password: e.target.value })}
				/>
				<label htmlFor='passwordConfirm'>Jelszó megerősítése:</label>
				<input
					type='password'
					name='passwordConfirm'
					id='passwordConfirm'
					autoComplete='currentConfirm-password'
					placeholder='Jelszó megerősítése'
					required
					value={formData.passwordConfirm}
					onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
				/>
				<button
					type='submit'
					className='form-button'
					onClick={(e) => handleSubmit(e, formData)}
				>
					Regisztráció
				</button>
			</form>
		</>
	);
};

export default SignUpComp;
