import { useState } from 'react';
import { useContext } from 'react';
import { AdminProductsContext } from '../../context/AdminContexts';
import { handleFilterByName } from '../../services/productFilterSort';
import { useNavigate } from 'react-router-dom';

const AdminProductFilterByName = () => {
	const { adminProductsData, setAdminProductsFiltered } = useContext(AdminProductsContext);
	const [filteredProductsByName, setFilteredProductsByName] = useState('');
	const navigate = useNavigate();

	const inputChangeHandler = (e) => {
		setFilteredProductsByName(e.target.value);
	};

	function filterByNameHandler() {
		handleFilterByName(
			adminProductsData,
			setAdminProductsFiltered,
			filteredProductsByName,
			navigate,
            '/admin/termekek'
		);
	}

	return (
		<div className='filter-by-name'>
			<input
				type='text'
				placeholder='Keresés név alapján'
				value={filteredProductsByName}
				onChange={inputChangeHandler}
			/>
			<button onClick={filterByNameHandler}>Keresés</button>
		</div>
	);
};

export default AdminProductFilterByName;
