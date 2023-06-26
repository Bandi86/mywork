import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductsContext } from '../../context/UserContexts';
import { sortIntervalProductsData } from '../../services/productFilterSort';
import './productFilterPrice.css';

const ProductFilterPrice = () => {
	const { productsFiltered, setProductsFilteredPrice } = useContext(ProductsContext);
	const maxPriceProduct = productsFiltered.reduce((maxPrice, currentProduct) => {
		const currentPrice = parseInt(currentProduct.price);
		if (!isNaN(currentPrice) && currentPrice > maxPrice) {
			return currentPrice;
		}
		return maxPrice;
	}, 0);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(maxPriceProduct);
	const navigate = useNavigate();


	function HandlePriceFilter() {
		if (minPrice > maxPrice) {
			[minPrice, maxPrice] = [maxPrice, minPrice];
			setMinPrice(minPrice);
			setMaxPrice(maxPrice);
		}
		setProductsFilteredPrice(
			sortIntervalProductsData(productsFiltered, +minPrice, +maxPrice)
		);
		navigate('/termekek/1');
	}

	return (
		<div className='filter-by-price'>
			<h3>{minPrice}</h3>
			<input
				type='range'
				min='0'
				max={maxPriceProduct}
				className='slider'
				id='minRange'
				value={minPrice}
				onChange={(e) => {
					const value = parseInt(e.target.value);
					if (e.target.id === 'minRange' && value > maxPrice) {
						return;
					}
					if (e.target.id === 'maxRange' && value < minPrice) {
						return;
					}
					if (e.target.id === 'minRange') {
						setMinPrice(value);
					} else {
						setMaxPrice(value);
					}
				}}
			/>
			<h3>{maxPrice}</h3>
			<input
				type='range'
				min='0'
				max={maxPriceProduct}
				className='slider'
				id='maxRange'
				value={maxPrice}
				onChange={(e) => {
					const value = parseInt(e.target.value);
					if (e.target.id === 'minRange' && value > maxPrice) {
						return;
					}
					if (e.target.id === 'maxRange' && value < minPrice) {
						return;
					}
					if (e.target.id === 'minRange') {
						setMinPrice(value);
					} else {
						setMaxPrice(value);
					}
				}}
			/>
			<button onClick={HandlePriceFilter}>Szűrés</button>
		</div>
	);
};

export default ProductFilterPrice;
