export default function CartTotal() {
	return (
		<>
			<button
				onClick={() => {
					setAnonymCart({});
					toast.success('Kosár teljes tartalma törölve', {
						position: 'top-center',
					});
				}}
				className='delete-cart-all'
			>
				Kosár törlése
			</button>
			<p>
				<span>Fizetendő összesen:</span> <span id='cost'>{totalAmount}</span>
			</p>
			<button className='pay'>Megrendelés</button>
		</>
	);
}
