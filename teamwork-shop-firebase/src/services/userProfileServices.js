export const userProfileInputProfileChecker = (userDetails, toast) => {
	if (userDetails.userName.trim() === '') {
		toast.warn('A név hibásan van megadva', {
			position: toast.POSITION.TOP_RIGHT,
		});
		return true;
	} else if (userDetails.userEmail.trim() === '') {
		toast.warn('Az email cím hibásan van megadva', {
			position: toast.POSITION.TOP_RIGHT,
		});
		return true;
	} else if (userDetails.userAge.trim() === '') {
		toast.warn('Az életkor hibásan van megadva', {
			position: toast.POSITION.TOP_RIGHT,
		});
		return true;
	} else if (userDetails.userGender.trim() === '') {
		toast.warn('A nem hibásan van megadva', {
			position: toast.POSITION.TOP_RIGHT,
		});
		return true;
	}
	return false;
};

export function isValidEmail(email) {
	// Email formátum ellenőrzése (egyszerű ellenőrzés)
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export const userProfileInputAdressChecker = (userAdress, toast) => {
	if (userAdress.userCountry.trim() === '') {
		toast.warn('Az ország neve nem lehet üres', {
			position: toast.POSITION.TOP_RIGHT,
		});
		return true;
	}

	if (userAdress.userCity.trim() === '') {
		toast.warn('A város neve nem lehet üres', {
			position: toast.POSITION.TOP_RIGHT,
		});
		return true;
	}

	if (userAdress.userZipCode.trim() === '') {
		toast.warn('Az irányítószám nem lehet üres', {
			position: toast.POSITION.TOP_RIGHT,
		});
		return true;
	}

	if (userAdress.userStreet.trim() === '') {
		toast.warn('Az utca neve nem lehet üres', {
			position: toast.POSITION.TOP_RIGHT,
		});
		return true;
	}

	if (userAdress.userHouseNumber.trim() === '') {
		toast.warn('A házszám nem lehet üres', {
			position: toast.POSITION.TOP_RIGHT,
		});
		return true;
	}

	return false;
};
