import { useState } from 'react';
import { useContext } from 'react';
import { ProductsContext } from '../../context/UserContexts';
import { handleFilterByName } from '../../services/productFilterSort';
import { useNavigate } from 'react-router-dom';
import './productFilteringByName.css';

const ProductFilterByName = () => {
	const { productsData, setProductsFiltered } = useContext(ProductsContext);
	const [filteredProductsByName, setFilteredProductsByName] = useState('');
	const navigate = useNavigate();

	const inputChangeHandler = (e) => {
		setFilteredProductsByName(e.target.value);
	};

	function filterByNameHandler() {
		handleFilterByName(
			productsData,
			setProductsFiltered,
			filteredProductsByName,
			navigate,
			'/termekek'
		);
	}

	return (
		<div className='filter-by-name'>
			<input
				type='text'
				id='filter-by-name-input'
				placeholder='Keresés név alapján'
				value={filteredProductsByName}
				onChange={inputChangeHandler}
			/>
			<button onClick={filterByNameHandler}>Keresés</button>
		</div>
	);
};

export default ProductFilterByName;
