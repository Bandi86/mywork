export async function fetchCars() {
    const  headers = {
		'X-RapidAPI-Key': 'dd02fe10demshd99d28f1a60d569p130c9fjsn6e226f43f3e8',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	}

    const response = await fetch( 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars', { headers });
    const result = await response.json();
    return result;
};
