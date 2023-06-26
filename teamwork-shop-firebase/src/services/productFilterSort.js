export function handleFilterByName(
	productsData,
	productsDataSetter,
	input,
	navigate,
	path
) {
	const filteredProducts = productsData.filter((product) =>
		product.title.toLowerCase().includes(input.toLowerCase())
		// product.category.toLowerCase().includes(input.toLowerCase());  // Kategória szerinti szűréshez.
	);
	if (input === '') {
		productsDataSetter(productsData);
	} else productsDataSetter(filteredProducts);
	navigate(`${path}/1`);
}

export const sortProductsData = (data, direction, initial) => {
	if (direction === '--') {
		return initial;
	}
	if (direction === 'csokkeno-cim') {
		return [...data].sort((a, b) => b.title.localeCompare(a.title));
	}
	if (direction === 'novekvo-cim') {
		return [...data].sort((a, b) => a.title.localeCompare(b.title));
	}
	if (direction === 'csokkeno-ar') {
		return [...data].sort((a, b) => b.price - a.price);
	}
	if (direction === 'novekvo-ar') {
		return [...data].sort((a, b) => a.price - b.price);
	}
};

export function sortIntervalProductsData(data, minPrice, maxPrice) {
	if ((minPrice !== 0 || maxPrice !== 100000) && minPrice <= maxPrice) {
		return [...data].filter((a) => {
			return a.price <= maxPrice && a.price >= minPrice;
		});
	}
	return data;
}

export function sortCategoryProductsData(data, category) {
	if(category === 'besorolatlan'){
		return [...data].filter((a) => {
			return a.category === undefined;
		})
	}
	else{
		return [...data].filter((a) => {
			return a.category === category;
		});
	}
}
