import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { update, read } from '../../../services/productServices';
import { AuthContext } from '../../../context/UserContexts';

const UserAddress = () => {
	const { users } = useContext(AuthContext);
	const [userAddress, setUserAddress] = useState({
		userCountry: '',
		userCity: '',
		userZipCode: '',
		userStreet: '',
		userHouseNumber: '',
		userFloor: '',
		userDoor: '',
		userMobile: '',
	});

	const user = users.find((user) => user.isLoggedIn);

	useEffect(() => {
		if (user) {
			try {
				read(`users/${user.item}/profiledetails`)
					.then((res) => res.json())
					.then((json) => {
						if (json == null) return null;
						else setUserAddress(json);
					});
			} catch (error) {}
		}
	}, [user]);

	const handleInputChange = (e) => {
		setUserAddress((prevAddress) => ({
			...prevAddress,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			update(userAddress, `users/${user.item}`, 'profiledetails');
			toast.success('Sikeres mentés', {
				position: toast.POSITION.TOP_RIGHT,
			});
		} catch (error) {}
	};

	return (
		<div>
			<h1>Személyes Címadatok</h1>

			<form
				onSubmit={handleSubmit}
				className='fa-form'
			>
				<label htmlFor='country'>Ország</label>
				<input
					type='text'
					id='country'
					name='userCountry'
					value={userAddress.userCountry}
					onChange={handleInputChange}
				/>

				<label htmlFor='city'>Város</label>
				<input
					type='text'
					id='city'
					name='userCity'
					value={userAddress.userCity}
					onChange={handleInputChange}
				/>

				<label htmlFor='zipCode'>Irányítószám</label>
				<input
					type='text'
					id='zipCode'
					name='userZipCode'
					value={userAddress.userZipCode}
					onChange={handleInputChange}
				/>

				<label htmlFor='street'>Utca</label>
				<input
					type='text'
					id='street'
					name='userStreet'
					value={userAddress.userStreet}
					onChange={handleInputChange}
				/>

				<label htmlFor='houseNumber'>Házszám</label>
				<input
					type='text'
					id='houseNumber'
					name='userHouseNumber'
					value={userAddress.userHouseNumber}
					onChange={handleInputChange}
				/>

				<label htmlFor='floor'>Emelet</label>
				<input
					type='text'
					id='floor'
					name='userFloor'
					value={userAddress.userFloor}
					onChange={handleInputChange}
				/>

				<label htmlFor='door'>Ajtó</label>
				<input
					type='text'
					id='door'
					name='userDoor'
					value={userAddress.userDoor}
					onChange={handleInputChange}
				/>
				<label htmlFor='mobile'>Mobil Szám</label>
				<input
					type='text'
					id='mobile'
					name='userMobile'
					value={userAddress.userMobile}
					onChange={handleInputChange}
				/>
				<button type='submit'>Mentés</button>
			</form>
		</div>
	);
};

export default UserAddress;
