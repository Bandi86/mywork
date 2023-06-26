import { useContext, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductsContext } from '../../context/UserContexts';
import { handleFilterByName } from '../../services/productFilterSort';

const NavigationSearchBar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { productsData, setProductsFiltered } = useContext(ProductsContext);
	const [filteredProductsByName, setFilteredProductsByName] = useState('');
	// contextbe kell ezt áthelyezni és amikor az oldal betölt csináljon egy alap keresést
	console.log('filteredProductsByName', filteredProductsByName);

	function inputChangeHandler(e) {
		setFilteredProductsByName(e.target.value);
	}

	function filterByNameHandler() {
		handleFilterByName(
			productsData,
			setProductsFiltered,
			filteredProductsByName,
			navigate,
			'/termekek'
		);
	}

	const showBar = () => {
		if (location.pathname.includes('termekek')) {
			return null;
		}
		return (
			<>
				<BsSearch onClick={filterByNameHandler} />
				<input
					type='text'
					id='filter-by-name-input'
					placeholder='Keresés'
					value={filteredProductsByName}
					onChange={inputChangeHandler}
				/>
			</>
		);
	};

	return <>{showBar()}</>;
};

export default NavigationSearchBar;
