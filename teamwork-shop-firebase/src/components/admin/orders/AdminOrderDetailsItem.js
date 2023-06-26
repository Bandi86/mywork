export default function AdminOrderDetailsItem(props) {
	return (
		<>
			<div>
				<h2>Terméknév: {props.data.title}</h2>
				<p>Cikkszám: {props.data.id}</p>
				<p>Rendelt mennyiség: {props.data.qty}</p>
				<div>
					<h4>Temékleírás:</h4>
					<p>
						{props.data.desc == '' ? 'Ennek a terméknek nincs leírása' : props.data.desc}
					</p>
				</div>

				<br />
				<img
					src={props.data.img}
					alt={props.data.title}
				/>
			</div>
		</>
	);
}
