export default function UserOrderItem(props) {
	return (
		<>
			<p>Rendelés azonosító: {props.data.id}</p>
			<p>Végösszeg: {props.data.total} Ft</p>
			<p>Számlázási név: {props.data.addressData.billing.name}</p>
			<p>Rendelés státusza: {props.data.status}</p>
		</>
	);
}
