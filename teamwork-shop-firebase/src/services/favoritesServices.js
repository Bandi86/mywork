export function delFavorite(item, favorites, setter) {
	const updatedFavorites = { ...favorites };
	const match = Object.keys(updatedFavorites).find((i) => i === item);
	delete updatedFavorites[match];
	setter(updatedFavorites);
}

export function favoritesData(favorites, products) {
	const favoritesRenderData = Object.keys(favorites).map((itemId) => {
		const product = products.find((p) => p.item === itemId);
		if (!product) return null;
		return product
	});
	return favoritesRenderData;
}