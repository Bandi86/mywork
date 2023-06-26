function isObjEmpty(obj) {
	return Object.keys(obj).length === 0;
}

export function addToCart(product, currentCart, setCurrentCart) {
	if (isObjEmpty(currentCart)) {
		setCurrentCart({ [product.item]: 1 });
	} else {
		const exists = Object.keys(currentCart).filter((x) => x === product.item);
		if (exists.length > 0) {
			Object.keys(currentCart).map((x) => {
				if (x == product.item) {
					setCurrentCart(() => ({
						...currentCart,
						[product.item]: +currentCart[product.item] + 1,
					}));
				}
				return x;
			});
		} else {
			setCurrentCart({ ...currentCart, [product.item]: 1 });
		}
	}
}

export function mergeCarts(anonymCart, dbCart) {
	const dbCartEmpty = dbCart == undefined || dbCart == null;
	if (isObjEmpty(anonymCart) && dbCartEmpty) {
		return {};
	} else if (isObjEmpty(anonymCart) && !dbCartEmpty) {
		return dbCart;
	} else if (!isObjEmpty(anonymCart) && dbCartEmpty) {
		return anonymCart;
	} else {
		const mergedCart = { ...dbCart };
		Object.keys(anonymCart).forEach((key) => {
			if (mergedCart[key]) {
				mergedCart[key] += anonymCart[key];
			} else {
				mergedCart[key] = anonymCart[key];
			}
		});
		return mergedCart;
	}
}

export function cartItemsData(cart, products) {
	const cartRenderData = Object.entries(cart).map(([itemId, qty]) => {
		const product = products.find((p) => p.item === itemId);
		if (!product) return null;
		return {
			id: itemId,
			quantity: qty,
			title: product.title,
			price: product.price,
			// További adatok a termékhez
		};
	});
	return cartRenderData;
}

export function cartTotal(cart, products, counter) {
	Object.entries(cart).forEach(([itemId, qty]) => {
		const product = products.find((p) => p.item === itemId);
		if (product) {
			counter += product.price * qty;
		}
	});
	return counter;
}

export function decreaseAmount(item, cart, setter) {
	if (item.quantity > 1) {
		setter((prevCart) => ({
			...prevCart,
			[item.id]: item.quantity - 1,
		}));
	} else {
		const updatedCart = { ...cart };
		delete updatedCart[item.id];
		setter(updatedCart);
	}
}

export function increaseAmount(item, setter) {
	setter((prevCart) => ({
		...prevCart,
		[item.id]: item.quantity + 1,
	}));
}

export function setAmount(e, item, cart, setter) {
	const newQty = parseInt(e.target.value);
	if (newQty === 0) {
		const updatedCart = { ...cart };
		delete updatedCart[item.id];
		setter(updatedCart);
	} else {
		setter((prevCart) => ({
			...prevCart,
			[item.id]: newQty,
		}));
	}
}

export function deleteCartItem(item, cart, setter) {
	console.log('item', item);
	const updatedCart = { ...cart };
	delete updatedCart[item.id];
	setter(updatedCart);
}

export function setTotalCartAmount(products) {
	if (Object.values(products).length === 0) return 0;
	return Object.values(products).reduce((acc, quantity) => acc + quantity, 0);
}
