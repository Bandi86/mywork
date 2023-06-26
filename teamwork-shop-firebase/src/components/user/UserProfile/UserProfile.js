import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/UserContexts';
import { read, update } from '../../../services/productServices';
import { useNavigate } from 'react-router-dom';
import './userprofile.css';

const UserProfile = () => {
	const navigate = useNavigate();

	const { users } = useContext(AuthContext);
	const [userDetails, setUserDetails] = useState({
		userName: '',
		userEmail: '',
		userAge: '',
		userGender: '',
		userImage: '',
		userBio: '',
	});
	const user = users.find((user) => user.isLoggedIn);

	useEffect(() => {
		if (user) {
			try {
				read(`users/${user.item}/profiledetails`)
					.then((res) => res.json())
					.then((json) => {
						if (json == null) return null;
						else setUserDetails(json);
					});
			} catch (error) {}
		}
	}, [user]);

	const handleInputChange = (e) => {
		setUserDetails((prevDetails) => ({
			...prevDetails,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		updateUserData();
	};

	const updateUserData = async () => {
		if (user) {
			try {
				const response = await update(
					userDetails,
					`users/${user.item}`,
					'profiledetails'
				);
				// Sikeres mentés esetén végrehajtandó műveletek
				toast.success('Sikeres mentés', {
					position: toast.POSITION.TOP_RIGHT,
				});
			} catch (error) {
				// Hiba esetén végrehajtandó műveletek
				console.error(error);
				toast.error('Hiba történt a mentés során', {
					position: toast.POSITION.TOP_RIGHT,
				});
			}
		}
	};

	return (
		<>
			{user ? (
				<div>
					<h1>Felhasználói Adatok</h1>

					<form
						className='fa-form'
						onSubmit={handleSubmit}
					>
						<label htmlFor='name'>Név</label>
						<input
							type='text'
							id='name'
							name='userName'
							value={userDetails.userName}
							onChange={handleInputChange}
						/>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							name='userEmail'
							value={userDetails.userEmail}
							onChange={handleInputChange}
						/>
						<label htmlFor='age'>Életkor</label>
						<input
							type='number'
							id='age'
							name='userAge'
							value={userDetails.userAge}
							onChange={handleInputChange}
						/>
						Nem
						<div>
							<label htmlFor='male'>
								{' '}
								Férfi
								<input
									type='radio'
									id='male'
									name='userGender'
									value='férfi'
									checked={userDetails.userGender === 'férfi'}
									onChange={handleInputChange}
								/>
							</label>
							<label htmlFor='female'>
								Nő
								<input
									type='radio'
									id='female'
									name='userGender'
									value='nő'
									checked={userDetails.userGender === 'nő'}
									onChange={handleInputChange}
								/>
							</label>
						</div>
						<label htmlFor='image'>Kép</label>
						{/* kép feltöltés rész */}
						<label htmlFor='bio'>Magamról</label>
						<textarea
							name='userBio'
							id='bio'
							value={userDetails.userBio}
							onChange={handleInputChange}
						></textarea>
						<button type='submit'>Mentés</button>
					</form>
				</div>
			) : (
				navigate('/')
			)}
		</>
	);
};

export default UserProfile;
