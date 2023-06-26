import { create, remove, update, read } from './productServices';

export function submitOrder(cart, userID, setter, total, addressData) {
	let order = {
		products: cart,
		uid: userID,
		total: total,
		addressData: addressData,
		status: 'Processing',
	};
	create(order, 'orders').then((res) => {
		order = { ...order, id: res.name };
		let orderID = res.name;
		update(order, 'orders', res.name).then((res) => {
			remove(`${userID}/cart`, 'users/').then((res) => {
				setter({});
			});
		});
		read(`users/${userID}/orders`)
			.then((res) => res.json())
			.then((json) => {
				try {
					update({ ...json, [orderID]: orderID }, `users/${userID}`, 'orders');
				} catch (error) {
					update({ [orderID]: orderID }, `users/${userID}`, 'orders');
				}
			});
	});
}

export function submitOrderAnonym(cart, userID, setter, total, addressData) {
	let order = {
		products: cart,
		uid: userID,
		total: total,
		addressData: addressData,
		status: 'Processing',
	};
	create(order, 'orders').then((res) => {
		order = { ...order, id: res.name };
		update(order, 'orders', res.name).then((res) => {
			setter({});
		});
	});
}

export function userOrdersData(orders, setter) {
	let datas = {};
	orders.map((i) => {
		read(`orders/${i}`)
			.then((res) => res.json())
			.then((json) => {
				datas = { ...datas, [i]: json };
				setter(datas);
			});
	});
}

export function userOrdersRender(data, setter) {
	let formatted = null;
	data.map((i) => {
		read(`users/${i.uid}`)
			.then((res) => res.json())
			.then((json) => {
				if (json == null) return null
				else {
					let obj = {
						// orderID: i.id,
						// userName: json.displayName,
						// total: i.total,
						// status: i.status

						id: i.id,
						addressData: i.addressData,
						products: i.products,
						status: i.status,
						total: i.total,
						uid: i.uid,
					};
					if (formatted == null) formatted = [obj];
					else formatted = [...formatted, obj];

					setter(formatted);
				}

			});
	});
}

export function adminOrdersRender(data, setter) {
	let formatted = null;

	data.map((i) => {
		if (i.uid == 'ANONYM') {
			try {
				let obj = {
					id: i.id,
					addressData: i.addressData,
					products: i.products,
					status: i.status,
					total: i.total,
					uid: i.uid,
					name: i.addressData.billing.name,

				};
				if (formatted == null) formatted = [obj];
				else formatted = [...formatted, obj];
				setter(formatted);
			} catch (error) { }
		}
		else {
			// read(`users/${i.uid}`)
			// 	.then((res) => res.json())
			// 	.then((json) => {
			try {
				let obj = {
					id: i.id,
					addressData: i.addressData,
					products: i.products,
					status: i.status,
					total: i.total,
					uid: i.uid,
					name: i.addressData.billing.name,
				};
				if (formatted == null) formatted = [obj];
				else formatted = [...formatted, obj];
				setter(formatted);
			} catch (error) { }
			// });
		}

	});
}

export function adminOrderDetailsRender(data, setter) {
	let formatted = null;
	try {
		Object.keys(data.products).map((i) => {
			read(`termekek/${i}`)
				.then((res) => res.json())
				.then((json) => {
					let obj = {
						id: json.id,
						title: json.title,
						desc: json.description,
						img: json.image,
						qty: data.products[i],
					};
					if (formatted == null) formatted = [obj];
					else formatted = [...formatted, obj];
					setter(formatted);
				});
		});
	} catch (error) { }
}

export const shippingInputValidation = (orderForm, toast) => {
	// Form validáció
	if (
		!orderForm.billing.name ||
		!orderForm.billing.postcode ||
		!orderForm.billing.city ||
		!orderForm.billing.street ||
		!orderForm.billing.houseNumber ||
		(!orderForm.shipping.name && !orderForm.shipping.same) ||
		(!orderForm.shipping.postcode && !orderForm.shipping.same) ||
		(!orderForm.shipping.city && !orderForm.shipping.same) ||
		(!orderForm.shipping.street && !orderForm.shipping.same)
	) {
		toast.warn('Hiányzó mezők. Kérlek töltsd ki az összes kötelező mezőt.', {
			position: toast.POSITION.TOP_RIGHT,
		});
		return false;
	}

	// Ellenőrzés, ha rossz karakterek vannak beírva
	const invalidCharacters = /[!@#$%^&*(),.?":{}|<>]/;
	if (
		invalidCharacters.test(orderForm.billing.name) ||
		invalidCharacters.test(orderForm.billing.postcode) ||
		invalidCharacters.test(orderForm.billing.city) ||
		invalidCharacters.test(orderForm.billing.street) ||
		invalidCharacters.test(orderForm.billing.houseNumber) ||
		invalidCharacters.test(orderForm.billing.door) ||
		invalidCharacters.test(orderForm.billing.floor) ||
		invalidCharacters.test(orderForm.shipping.name) ||
		invalidCharacters.test(orderForm.shipping.postcode) ||
		invalidCharacters.test(orderForm.shipping.city) ||
		invalidCharacters.test(orderForm.shipping.street) ||
		invalidCharacters.test(orderForm.shipping.houseNumber) ||
		invalidCharacters.test(orderForm.shipping.door) ||
		invalidCharacters.test(orderForm.shipping.floor) ||
		invalidCharacters.test(orderForm.contact.phone)
	) {
		toast.warn('Hibás karakterek. Kérlek csak érvényes karaktereket használj.', {
			position: toast.POSITION.TOP_RIGHT,
		});
		return false;
	}

	return true;
};
