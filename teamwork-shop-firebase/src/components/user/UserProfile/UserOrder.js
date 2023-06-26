import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/UserContexts';
import formatData from '../../../services/formatData';
import { userOrdersData, userOrdersRender } from '../../../services/orderServices';
import { read } from '../../../services/productServices';
import UserOrderItem from './UserOrderItem';

export default function UserOrder() {
	const { users } = useContext(AuthContext);

	// const [userOrders, setUserOrders] = useState([]);
	const [orderData, setOrderData] = useState({});
	const [ordersRender, setOrdersRender] = useState([]);
	const [ordersRenderSync, setOrdersRenderSync] = useState([]);

	useEffect(() => {
		const user = users.find((user) => user.isLoggedIn);
		try {
			read(`users/${user.item}/orders`)
				.then((res) => res.json())
				.then((json) => {
					try {
						userOrdersData(Object.keys(json), setOrderData);
					} catch (error) {}
				});
		} catch (error) {}
	}, []);

	// useEffect(() => {
	// 	try {
	// 		userOrdersData(userOrders, setOrderData);
	// 	} catch (error) {}
	// }, [userOrders]);

	useEffect(() => {
		try {
			userOrdersRender(formatData(orderData), setOrdersRender);
		} catch (error) {}
	}, [orderData]);

	useEffect(() => {
		setOrdersRenderSync(ordersRender);
	}, [ordersRender]);

	return (
		<div>
			{ordersRender.length !== 0 ? (
				ordersRender.map((orderItem) => {
					return (
						<div key={orderItem.orderID}>
							<UserOrderItem data={orderItem} />
						</div>
					);
				})
			) : (
				<h1>Még nem rendeltél semmit.</h1>
			)}
		</div>
	);
}
