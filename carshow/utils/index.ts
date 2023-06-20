import dotenv from 'dotenv'; // dotenv importálása

dotenv.config(); // dotenv konfiguráció

export async function fetchCars() {
    const headers: { [key: string]: string } = {
        'X-RapidAPI-Key': process.env.API_KEY!, // Környezeti változó használata
        'X-RapidAPI-Host': process.env.API_HOST! // Környezeti változó használata
    };

    const response = await fetch('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars', { headers });
    const result = await response.json();
    return result;
}

