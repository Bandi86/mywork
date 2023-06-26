import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { read } from '../../../services/productServices';
import { adminOrderDetailsRender } from '../../../services/orderServices';
import { v4 as uuidv4 } from 'uuid';
import AdminOrderDetailsItem from './AdminOrderDetailsItem';

export default function AdminOrderDetails() {
	const { megrendelesID } = useParams();
	const [productDetails, setProductDetails] = useState([]);
	const [addressDetails, setAddressDetails] = useState({})

	useEffect(() => {
		try {
			read(`orders/${megrendelesID}`)
				.then((res) => res.json())
				.then((json) => {
					try {
						adminOrderDetailsRender(json, setProductDetails);
						setAddressDetails(json.addressData)
					} catch (error) { }
				});
		} catch (error) { }
	}, []);

	return (
		<>
			{productDetails.length !== 0 ? (
				<>
					<div>
						<h3>Számlázási adatok:</h3>
						<p>{addressDetails.billing.name}</p>
						<p>{addressDetails.billing.city}</p>
						<p>{addressDetails.billing.postcode}</p>
						<p>{addressDetails.billing.street}</p>
						<p>{addressDetails.billing.company}</p>
						<p>{addressDetails.billing.individual}</p>
					</div>
					<div>
						<h3>Szállítási adatok: adatok:</h3>
						<p>{addressDetails.billing.name}</p>
						<p>{addressDetails.billing.city}</p>
						<p>{addressDetails.billing.postcode}</p>
						<p>{addressDetails.billing.street}</p>
						<p>{addressDetails.billing.comment}</p>
					</div>
					<div>
						<h3>Kapcsolati adatok:</h3>
						<p>{addressDetails.contact.email}</p>
						<p>{addressDetails.contact.phone}</p>
					</div>
				</>
			) : <h1>Nincsenek címadatok</h1>}

			<br></br>
			<h3>Rendelt termékek:</h3>
			{productDetails.length !== 0 ? (
				productDetails.map((orderItem) => {
					return (
						<div key={uuidv4()}>
							<AdminOrderDetailsItem data={orderItem} />
						</div>
					);
				})
			) : (
				<h1>Nincsenek rendelések.</h1>
			)}
		</>
	);
}
