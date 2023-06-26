import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	AnonymCartContext,
	CartItemsContext,
	UserCartContext,
} from '../../../context/CartContext';
import { AuthContext } from '../../../context/UserContexts';
import {
	shippingInputValidation,
	submitOrder,
	submitOrderAnonym,
} from '../../../services/orderServices';
import { read } from '../../../services/productServices';

const OrderForm = () => {
	const navigate = useNavigate();
	const { users, setUsers } = useContext(AuthContext);
	const { userCartFromDB, setUserCartFromDB } = useContext(UserCartContext); // sync cart from db
	const { total } = useContext(CartItemsContext);
	const { anonymCart, setAnonymCart } = useContext(AnonymCartContext);
	const [sameAsBilling, setSameAsBilling] = useState(false);
	const [isCompany, setIsCompany] = useState(false);
	const loggedInUser = users.find((user) => user.isLoggedIn);

	const [orderForm, setOrderForm] = useState({
		billing: {
			name: '',
			postcode: '',
			city: '',
			street: '',
			houseNumber: '',
			floor: '',
			door: '',
			comment: '',
			individual: true,
			company: false,
		},
		shipping: {
			name: '',
			postcode: '',
			city: '',
			street: '',
			houseNumber: '',
			floor: '',
			door: '',
			comment: '',
		},
		contact: {
			email: '',
			phone: '',
		},
		company: {
			companyName: '',
			taxNumber: '',
		},
	});

	const user = users.find((user) => user.isLoggedIn);

	useEffect(() => {
		if (user) {
			try {
				read(`users/${user.item}/profiledetails`)
					.then((res) => res.json())
					.then((json) => {
						const res = json;
						if (json == null) return null;
						else {
							const obj = {
								...orderForm,
								billing: {
									name: res.userName,
									postcode: res.userZipCode,
									city: res.userCity,
									street: res.userStreet,
									houseNumber: res.userHouseNumber,
									floor: res.userFloor,
									door: res.userDoor,
								},
								contact: {
									email: res.userEmail,
									phone: res.userMobile,
								},
							};
							console.log('OBJ', obj);
							setOrderForm(obj);
						}
					});
			} catch (error) {}
		}
	}, [user]);

	const handleIsCompanyChange = () => {
		setIsCompany(!isCompany);
	};

	function handleInputChange(e) {
		const { name, value, type, checked } = e.target;

		setOrderForm((prevState) => {
			let updatedForm = { ...prevState };

			if (name.startsWith('billing')) {
				updatedForm.billing[name.replace('billing-', '')] =
					type === 'checkbox' ? checked : value;
				if (sameAsBilling && name.startsWith('billing') && name !== 'billing-name') {
					updatedForm.shipping[name.replace('billing-', '')] =
						type === 'checkbox' ? checked : value;
				}
			} else if (name.startsWith('shipping')) {
				if (!sameAsBilling) {
					updatedForm.shipping[name.replace('shipping-', '')] =
						type === 'checkbox' ? checked : value;
				}
			} else if (name.startsWith('contact')) {
				updatedForm.contact[name.replace('contact-', '')] = value;
			}
			return updatedForm;
		});
	}

	function handleCheckboxChange(e) {
		const billingInput = e.target.checked;
		setSameAsBilling(billingInput);
		if (billingInput) {
			setOrderForm((prevState) => ({
				...prevState,
				shipping: {
					...prevState.shipping,
					name: prevState.billing.name,
					postcode: prevState.billing.postcode,
					city: prevState.billing.city,
					street: prevState.billing.street,
					houseNumber: prevState.billing.houseNumber,
					floor: prevState.billing.floor,
					door: prevState.billing.door,
					comment: prevState.billing.comment,
				},
			}));
		} else {
			setOrderForm((prevState) => ({
				...prevState,
				shipping: {
					name: '',
					postcode: '',
					city: '',
					street: '',
					houseNumber: '',
					floor: '',
					door: '',
					comment: '',
				},
			}));
		}
	}

	function handleSubmit(e) {
		e.preventDefault();
		console.log('ORDERFORM', orderForm);

		const isShippingValid = shippingInputValidation(orderForm, toast);
		if (!isShippingValid) {
			return;
		}

		if (loggedInUser) {
			try {
				submitOrder(userCartFromDB, loggedInUser.item, setOrderForm, total, orderForm); // submit order with logged in user
				setUserCartFromDB([]); // update user cart from db
				toast.success('Sikeres rendelés');
				navigate('/');
			} catch (error) {
				toast.error('Hiba történt a rendelés során');
			}
		} else {
			try {
				submitOrderAnonym(anonymCart, 'NA', setOrderForm, total, orderForm); // submit order with anonymous user
				setAnonymCart([]); // clear anonymous cart
				toast.success('Sikeres rendelés');
				navigate('/');
			} catch (error) {
				toast.error('Hiba történt a rendelés során');
			}
		}
	}

	return (
		<div className='order-container'>
			<h2>Megrendelés Leadása:</h2>
			<form onSubmit={handleSubmit}>
				<h2>Számlázási információk</h2>
				<label htmlFor='individual'>Magánszemély</label>
				<input
					type='checkbox'
					id='individual'
					name='customerType'
					value='individual'
					checked={!isCompany}
					onChange={handleIsCompanyChange}
				/>
				<label htmlFor='company'>Cég</label>
				<input
					type='checkbox'
					id='company'
					name='customerType'
					checked={isCompany}
					onChange={handleIsCompanyChange}
				/>
				<label htmlFor='billing-name'>Számlázási név:</label>
				<input
					type='text'
					id='billing-name'
					name='billing-name'
					placeholder='Számlázási név'
					value={orderForm.billing.name}
					onChange={handleInputChange} // Módosítva a name attribútumra, hogy a változást kezelje
				/>
				<label htmlFor='postal-code'>Számlázási cím:</label>
				<input
					type='text'
					id='billing-postcode'
					name='billing-postcode'
					placeholder='Irányítószám'
					value={orderForm.billing.postcode}
					onChange={handleInputChange} // Módosítva a name attribútumra, hogy a változást kezelje
				/>
				<input
					type='text'
					id='billing-city'
					name='billing-city'
					placeholder='Város'
					value={orderForm.billing.city}
					onChange={handleInputChange} // Módosítva a name attribútumra, hogy a változást kezelje
				/>
				<input
					type='text'
					id='billing-street'
					name='billing-street'
					placeholder='Utca'
					value={orderForm.billing.street}
					onChange={handleInputChange} // Módosítva a name attribútumra, hogy a változást kezelje
				/>
				<label htmlFor='houseNumber'>Házszám</label>
				<input
					type='text'
					id='billing-houseNumber'
					name='billing-houseNumber'
					placeholder='Házszám'
					value={orderForm.billing.houseNumber}
					onChange={handleInputChange}
				/>

				<label htmlFor='floor'>Emelet</label>
				<input
					type='text'
					id='billing-floor'
					name='billing-floor'
					placeholder='Emelet'
					value={orderForm.billing.floor}
					onChange={handleInputChange}
				/>
				<label htmlFor='door'>Ajtó</label>
				<input
					type='text'
					id='billing-door'
					name='billing-door'
					placeholder='Ajtó'
					value={orderForm.billing.door}
					onChange={handleInputChange}
				/>
				<input
					type='text'
					id='billing-comment'
					name='billing-comment'
					placeholder='Megjegyzés az ügyfélszolgálat számára'
					value={orderForm.billing.comment}
					onChange={handleInputChange} // Módosítva a name attribútumra, hogy a változást kezelje
				/>

				{isCompany ? (
					<>
						<h2>Cégadatok</h2>
						<label htmlFor='company-name'>Cégnév:</label>
						<input
							type='text'
							id='company-name'
							name='companyName'
							placeholder='Cégnév'
							value={orderForm.company.companyName}
							onChange={handleInputChange} // Módosítva a name attribútumra, hogy a változást kezelje
						/>
						<label htmlFor='tax-number'>Adószám:</label>
						<input
							type='text'
							id='tax-number'
							name='taxNumber'
							placeholder='Adószám'
							value={orderForm.company.taxNumber}
							onChange={handleInputChange} // Módosítva a name attribútumra, hogy a változást kezelje
						/>
					</>
				) : null}

				<h2>Szállítási információk</h2>
				<label htmlFor='shipping'>
					Szállítási információk megegyeznek a számlázási információkkal
				</label>
				<input
					type='checkbox'
					id='shipping'
					name='same'
					checked={sameAsBilling}
					onChange={handleCheckboxChange}
				/>
				<label htmlFor='recipient-name'>Címzett neve:</label>
				<input
					type='text'
					id='shipping-name'
					name='shipping-name'
					placeholder='Címzett neve'
					value={sameAsBilling ? orderForm.billing.name : orderForm.shipping.name}
					onChange={handleInputChange}
				/>
				<input
					type='text'
					id='shipping-postcode'
					name='shipping-postcode'
					placeholder='Irányítószám'
					value={sameAsBilling ? orderForm.billing.postcode : orderForm.shipping.postcode}
					onChange={handleInputChange}
				/>
				<input
					type='text'
					id='shipping-city'
					name='shipping-city'
					placeholder='Város'
					value={sameAsBilling ? orderForm.billing.city : orderForm.shipping.city}
					onChange={handleInputChange}
				/>
				<input
					type='text'
					id='shipping-street'
					name='shipping-street'
					placeholder='Utca'
					value={sameAsBilling ? orderForm.billing.street : orderForm.shipping.street}
					onChange={handleInputChange}
				/>
				<label htmlFor='houseNumber'>Házszám</label>
				<input
					type='text'
					id='shipping-houseNumber'
					name='shipping-houseNumber'
					placeholder='Házszám'
					value={
						sameAsBilling ? orderForm.billing.houseNumber : orderForm.shipping.houseNumber
					}
					onChange={handleInputChange}
				/>

				<label htmlFor='floor'>Emelet</label>
				<input
					type='text'
					id='shipping-floor'
					name='shiping-floor'
					placeholder='Emelet'
					value={sameAsBilling ? orderForm.billing.floor : orderForm.shipping.floor}
					onChange={handleInputChange}
				/>
				<label htmlFor='door'>Ajtó</label>
				<input
					type='text'
					id='shipping-door'
					name='shipping-door'
					placeholder='Ajtó'
					value={sameAsBilling ? orderForm.billing.door : orderForm.shipping.door}
					onChange={handleInputChange}
				/>
				<input
					type='text'
					id='shipping-comment'
					name='shipping-comment'
					placeholder='Megjegyzés a futárnak'
					value={orderForm.shipping.comment}
					onChange={handleInputChange} // Módosítva a name attribútumra, hogy a változást kezelje
				/>
				<label htmlFor='email'>Email:</label>
				<input
					type='email'
					id='email'
					name='contact-email'
					placeholder='Kapcsolattartó e-mail cím'
					value={orderForm.contact.email}
					onChange={handleInputChange}
				/>
				<label htmlFor='phone-number'>Telefonszám:</label>
				<input
					type='text'
					id='phone-number'
					name='contact-phone'
					placeholder='Kapcsolattartó telefonszám'
					value={orderForm.contact.phone}
					onChange={handleInputChange}
				/>
				<button type='submit'>Rendelés Leadása</button>
			</form>
		</div>
	);
};
export default OrderForm;
