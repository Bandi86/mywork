import { AUTH_REG_API_URL, AUTH_LOGIN_API_URL } from '../repositories/API_repo';
import { read, update } from './productServices';
import { createFireBase } from '../repositories/crud';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//REGISZTRÁCIÓ
export const createNewUser = (formData, setUsers) => {
	if (formData.name === '') {
		toast.warn('Név megadása kötelező!', {
			position: toast.POSITION.TOP_RIGHT,
		});
		return;
	} else if (formData.name.length < 2) {
		toast.warn('A névnek legalább két karakterből kell állnia!', {
			position: toast.POSITION.TOP_RIGHT,
		});
		return;
	} else if (/^\d+$/.test(formData.name)) {
		toast.warn('A név nem tartalmazhat csak számot!', {
			position: toast.POSITION.TOP_RIGHT,
		});
		return;
	}

	if (formData.email === '') {
		toast.warn('Email megadása kötelező!', {
			position: toast.POSITION.TOP_RIGHT,
		});
		return;
	} else if (!isValidEmail(formData.email)) {
		toast.warn('Helytelen email formátum!', {
			position: toast.POSITION.TOP_RIGHT,
		});
		return;
	}

	if (formData.password === '') {
		toast.warn('Jelszó megadása kötelező!', {
			position: toast.POSITION.TOP_RIGHT,
		});
		return;
	} else if (formData.password.length < 6) {
		toast.warn('A jelszónak legalább 6 karakternek kell lennie!', {
			position: toast.POSITION.TOP_RIGHT,
		});
		return;
	}

	if (formData.passwordConfirm !== formData.password) {
		toast.warn('A jelszavak nem egyeznek!', {
			position: toast.POSITION.TOP_RIGHT,
		});
		return;
	}

	function isValidEmail(email) {
		// Email formátum ellenőrzése (egyszerű ellenőrzés)
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	try {
		createFireBase(
			{
				email: formData.email,
				password: formData.password,
				returnSecureToken: true,
			},
			AUTH_REG_API_URL
		)
			.then((resp) => resp.json())
			.then((data) => {
				if (data.error) {
					toast.warn('Az email már foglalt', {
						position: toast.POSITION.TOP_RIGHT,
					});
				} else return data;
			})
			.then((data) => {
				if (data) {
					toast.success('Sikeres Regisztráció !', {
						position: toast.POSITION.TOP_CENTER,
					});
					update(
						{
							email: formData.email,
							displayName: formData.name,
							role: 'user',
						},
						`users/`,
						data.localId
					).then((res) => {
						read('users', setUsers);
					});
				} else if (data.status === 400) {
					toast.warn('Az email már foglalt', {
						position: toast.POSITION.TOP_RIGHT,
					});
				}
			})
			.catch((error) => {});
	} catch (error) {}
};

//BELÉPÉS
export const userLogin = async (formData, users, setUsers, navigate) => {
	if (formData.email === '') {
		toast.warn('Név megadása kötelező !', {
			position: toast.POSITION.TOP_RIGHT,
		});
		return;
	}
	if (formData.password === '') {
		toast.warn('Jelszó megadása kötelező!', {
			position: toast.POSITION.TOP_RIGHT,
		});
	} else if (formData.password.length < 6) {
		toast.warn('A jelszónak legalább 6 karakternek kell lennie!', {
			position: toast.POSITION.TOP_RIGHT,
		});
		return;
	}

	try {
		await createFireBase(
			{
				email: formData.email,
				password: formData.password,
			},
			AUTH_LOGIN_API_URL
		)
			.then((response) => {
				if (response.ok) {
					const loggedInUser = users.find((user) => user.email === formData.email);
					setUsers(
						users.map((user) =>
							user.email === formData.email ? { ...user, isLoggedIn: true } : user
						)
					);
					const updatedUsers = users.map((user) =>
						user.email === formData.email ? { ...user, isLoggedIn: true } : user
					);
					setUsers(updatedUsers);
					const message = loggedInUser
						? `Sikeres bejelentkezés, Üdvözöllek ${loggedInUser.displayName}!`
						: 'Sikeres bejelentkezés!';
					toast.success(message, {
						position: toast.POSITION.TOP_RIGHT,
					});
					return response.json();
				} else {
					throw new Error(response.statusText);
				}
			})

			.then((data) => {
				if (data.error) {
					throw new Error(data.error.message);
				} else {
					return data;
				}
			})
			.then((data) => {
				if (data.registered === true) {
					read(`users/${data.localId}`)
						.then((res) => res.json())
						.then((json) => {
							if (json.role === 'admin') navigate('/admin');
							else {
								navigate('/');
							}
						});
					const index = users.findIndex((user) => user.email === formData.email);
					if (index !== -1) {
						const updatedUser = { ...users[index], isLoggedIn: true };
						const updatedUsers = [
							...users.slice(0, index),
							updatedUser,
							...users.slice(index + 1),
						];
						setUsers(updatedUsers);
					}
				} else {
					const errorMessage = data.error.message;
					if (errorMessage === 'auth/wrong-password') {
						toast.warn('Hibás jelszó!', {
							position: toast.POSITION.TOP_RIGHT,
						});
					} else if (errorMessage === 'auth/user-not-found') {
						toast.warn('Nincs ilyen felhasználó!', {
							position: toast.POSITION.TOP_RIGHT,
						});
					} else {
						throw new Error(errorMessage);
					}
				}
			})
			.catch((error) => {
				toast.warn('Hiba a bejelentkezés során', {
					position: toast.POSITION.TOP_RIGHT,
				});
			});
	} catch (error) {}
};
