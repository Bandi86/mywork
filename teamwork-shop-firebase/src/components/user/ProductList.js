// React:
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// Contexts:
import { ProductsContext } from '../../context/UserContexts';

// Services:
import { read } from '../../services/productServices';
import { sortProductsData } from '../../services/productFilterSort';
import formatData from '../../services/formatData';

// Components:
import ProductFilteringByName from './ProductFilteringByName';
import SingleProduct from './SingleProduct';
import ProductFilterPrice from './ProductFilterPrice';
import AdminCategoryList from '../admin/AdminCategoryList';

// Styles:
/*import '../../styles/products.css';*/

import './productList.css';

const ProductList = () => {
	const navigate = useNavigate();
	const { rendezes, currentPage } = useParams();
	const {
		productsData, setProductsData,
		productsFiltered, setProductsFiltered,
		productsFilteredPrice, setProductsFilteredPrice,
		productsFilteredSorted,setproductsFilteredSorted } = useContext(ProductsContext);
	const [sort, setSort] = useState('--');
	const URL = window.location.href.slice(-1);
	const displayDataFirst = displayIndicator()[0];
	const displayDataLast = displayIndicator()[1];
	const totalCountOfProducts = productsFilteredSorted.length;

	const pageSize = 9;
	const pageCount = Math.ceil(productsFilteredSorted.length / pageSize);

	useEffect(() => {
		read('termekek').then((res) => res.json())
			.then((json) => {
				setProductsData(formatData(json));
				setProductsFiltered(formatData(json));
				setProductsFilteredPrice(formatData(json));
				setproductsFilteredSorted(formatData(json));
			});
	}, []);

	useEffect(()=>{
		setProductsFilteredPrice(productsFiltered)
	}, [productsFiltered])

	useEffect(() => {
		const direction = rendezes || '--';
		setSort(direction);
		setproductsFilteredSorted(sortProductsData(productsFilteredSorted, direction, productsFilteredPrice));
	}, [rendezes, sort, productsFilteredPrice]);

	useEffect(() => {
		if (productsFilteredSorted.length > 0) {
			if (+currentPage > pageCount || +currentPage == 0 || currentPage === undefined || isNaN(currentPage)) {
				navigate(`/termekek/1`)
			}
		}
	}, [productsFilteredSorted])

	function displayIndicator() {
		return [0 + (URL - 1) * 9, 9 * URL];
	}

	function selectHandler(e) {
		setSort(e.target.value);
		const urlMap = {
			'--': '/termekek/1',
			'csokkeno-ar': '/termekek/csokkeno-ar/1',
			'novekvo-ar': '/termekek/novekvo-ar/1',
			'novekvo-cim': '/termekek/novekvo-cim/1',
			'csokkeno-cim': '/termekek/csokkeno-cim/1',
		};
		let path = urlMap[e.target.value];
		navigate(path);
	}

	return (
		<>
			<h3 className='prod-cat-title'>Összes Termék ({totalCountOfProducts})</h3>
			<div className='c-s'>
				<div className='filter-container'>
					<div className='sorting'>
						<label htmlFor='sort'>Rendezés:</label>
						<select
							name='sort'
							id='sort'
							onChange={selectHandler}
							value={sort}
						>
							<option value='--'>--</option>
							<option value='csokkeno-ar'>Ár csökkenő</option>
							<option value='novekvo-ar'>Ár növekvő</option>
							<option value='novekvo-cim'>Cím növekvő</option>
							<option value='csokkeno-cim'>Cím csökkenő</option>
						</select>
						<label htmlFor='sortCat'>Kategóriák:</label>
						<select
                        name='sortCat'
                        id='sortCat'
                        onChange={selectHandler}
                        value={sort}
                    >
                        <option value='besorolatlan'>besorolatlan</option>
                        <AdminCategoryList/>
                    </select>
					</div>
				</div>
				<ProductFilterPrice />
				<div className='filter'>
					<ProductFilteringByName />
				</div>
			</div>
			<div className='productlist-container'>
				{productsFilteredSorted.length !== 0 ? (
					productsFilteredSorted.slice(displayDataFirst, displayDataLast).map((item) => {
						return (
							<SingleProduct
								key={uuidv4()}
								product={item}
							/>
						);
					})
				) : (
					<div className='product-not-found'>
						<h1>Nincs Ilyen Termék</h1>
					</div>
				)}
			</div>
		</>
	);
};

export default ProductList;
