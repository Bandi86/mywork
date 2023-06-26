import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sortIntervalProductsData } from '../../services/productFilterSort';
import { AdminProductsContext } from '../../context/AdminContexts'

const AdminProductFilterPrice = () => {
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(100000);
	const { adminProductsFiltered, setAdminProductsFilteredPrice } = useContext(AdminProductsContext)
	const navigate = useNavigate();

	function HandlePriceFilter() {
		setAdminProductsFilteredPrice(sortIntervalProductsData(adminProductsFiltered, +minPrice, +maxPrice));
		navigate('/admin/termekek/1')
	}

	return (
		<div className='filter-by-price'>
			<p>{minPrice}</p>
			<input
				type='range'
				min='0'
				max='100000'
				className='slider'
				id='myRange'
				onChange={(e) => setMinPrice(e.target.value)}
			/>
			<p>{maxPrice}</p>
			<input
				type='range'
				min='0'
				max='100000'
				className='slider'
				id='myRange'
				onChange={(e) => setMaxPrice(e.target.value)}
			/>
			<button onClick={HandlePriceFilter}>Szűrés</button>
		</div>
	);
};

export default AdminProductFilterPrice;
