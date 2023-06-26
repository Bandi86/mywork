import {
	decreaseAmount,
	increaseAmount,
	setAmount,
	deleteCartItem,
} from '../../services/cartServices';
import { toast } from 'react-toastify';

export default function CartItem(props) {

	return (
		<>
			<div className='cart-item'>
				<div className='cart-item-info'>
					<h3>{props.item.title}</h3>
					<p>Ár: {props.item.price} Ft</p>
					<div className='quantity'>
						<button
							onClick={() => {
								decreaseAmount(props.item, props.cart, props.setter);
							}}
						>
							-
						</button>
						<input
							type='number'
							value={props.item.quantity}
							onChange={(e) => {
								setAmount(e, props.item, props.cart, props.setter);
							}}
						/>
						<button
							onClick={() => {
								increaseAmount(props.item, props.setter);
							}}
						>
							+
						</button>
					</div>
					<button
						onClick={() => {
							deleteCartItem(props.item, props.cart, props.setter);
							toast.success('Termék törölve a kosárból', {
								position: 'top-center',
							});
						}}
						className='delete-cart'
					>
						Törlés a kosárból
					</button>
				</div>
			</div>
		</>
	);
}
