import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { remove, update } from '../../../services/productServices';
import { AdminOrdersContext } from '../../../context/AdminContexts';
import { useContext } from 'react';


export default function AdminOrderItem(props) {
	const navigate = useNavigate();
	const { adminOrdersTrigger, setAdminOrdersTrigger } = useContext(AdminOrdersContext);


	function prdPageHandler() {
		console.log('props.data', props.data)
		navigate(`/admin/megrendelesek/${props.data.id}`);
	}

	function prdDelHandler() {
		try {
			let updatedData = { ...props.data, status: 'Törölve' }
			if (window.confirm('Are you sure?')) {
				update(updatedData, 'orders', props.data.id)
					.then(res => {
						setAdminOrdersTrigger(!adminOrdersTrigger)
					})
			}
		}
		catch (error) { }

	}

	return (
		<>
			<p>Rendelés azonosító: {props.data.id}</p>
			<p>Ügyfél azonosító: {props.data.uid}</p>
			<p>Számlázási név: {props.data.addressData.billing.name}</p>
			<p>Rendelés státusza: {props.data.status}</p>
			<div>
				<h4>Megrendelés tartalma:</h4>
				{
					Object.keys(props.data.products).map((i) => {
						return (
							<p key={uuidv4()}>
								Termék ID: {i} Darabszám: {props.data.products[i]}
							</p>
						);
					})
				}
			</div>
			<button onClick={() => prdPageHandler()}>Adatlap</button>
			<button onClick={() => prdDelHandler()}>Megrendelés törlése</button>
			<br />
			<br />
		</>
	);
}
