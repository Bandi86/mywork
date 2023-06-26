import { useContext, useEffect, useState } from 'react';
import formatData from '../../../services/formatData';
import { userOrdersData, userOrdersRender } from '../../../services/orderServices';
import { read, update } from '../../../services/productServices';
import AdminOrderItem from './AdminOrderItem';
import { adminOrdersRender } from '../../../services/orderServices';
import { v4 as uuidv4 } from 'uuid';
import { AdminOrdersContext } from '../../../context/AdminContexts';

export default function AdminOrderList() {
	// const {orders, setOrders} = useContext(AdminOrdersContext);
	const [userNames, setUsernames] = useState([]);
	const { adminOrders, setAdminOrders, adminOrdersTrigger, setAdminOrdersTrigger } = useContext(AdminOrdersContext);

	useEffect(() => {

		try {
			read(`orders`)
				.then((res) => res.json())
				.then((json) => {
					try {
						console.log('json',json)
						adminOrdersRender(formatData(json), setAdminOrders);
					} catch (error) { }
				});
		} catch (error) { }
	}, [adminOrdersTrigger]);

	return (
		<div>
			{adminOrders.length !== 0 ? (
				adminOrders.map((orderItem) => {
					return (
						<div key={uuidv4()}>
							<AdminOrderItem data={orderItem} />
						</div>
					);
				})
			) : (
				<h1>Nincsenek rendelések.</h1>
			)}
		</div>
	);
}
