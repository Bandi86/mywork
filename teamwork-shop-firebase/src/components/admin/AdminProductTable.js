// React:
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

// Contexts:
import { AdminProductsContext } from '../../context/AdminContexts'

// Services:
import { read } from '../../services/productServices';
import { sortProductsData } from '../../services/productFilterSort';
import formatData from '../../services/formatData';

// Componenets:
import AdminSingleProduct from './AdminSingleProduct';
import AdminFilteringByName from './AdminProductFilteringByName'
import AdminProductFilterPrice from './AdminProductFilterPrice'
import AdminCategoryListOptions from './AdminCategoryListOptions';

// CSS:
import '../../styles/admin.style.css';


export default function AdminProductTable() {
    const navigate = useNavigate();
    const { rendezes, currentPage } = useParams();
    const {
        adminProductsData, setAdminProductsData,
        adminProductsFiltered, setAdminProductsFiltered,
        adminProductsFilteredPrice, setAdminProductsFilteredPrice,
        adminProductsFilteredSorted, setAdminProductsFilteredSorted } = useContext(AdminProductsContext);
    const [sort, setSort] = useState('--');
    const [categoryNames, setCategoryNames] = useState([]);
    const URL = window.location.href.slice(-1);
    const displayDataFirst = displayIndicator()[0];
    const displayDataLast = displayIndicator()[1];
    const totalCountOfProducts = adminProductsFiltered.length;

    const pageSize = 9;
    const pageCount = Math.ceil(adminProductsFilteredSorted.length / pageSize);

    useEffect(() => {
        read('termekek').then((res) => res.json())
            .then((json) => {
                setAdminProductsData(formatData(json))
                setAdminProductsFiltered(formatData(json))
                setAdminProductsFilteredPrice(formatData(json))
                setAdminProductsFilteredSorted(formatData(json))
            });
    }, []);

	useEffect(() => {
		read('categories')
			.then((res) => res.json())
			.then((json) => {
				const catName = [];
				Object.values(json).map((c) => {
					catName.push(c.name);
				});
				setCategoryNames(catName);
			});
	}, []);

    useEffect(() => {
        setAdminProductsFilteredPrice(adminProductsFiltered)
    }, [adminProductsFiltered])

    useEffect(() => {
        const direction = rendezes || '--';
        setSort(direction);
        setAdminProductsFilteredSorted(sortProductsData(adminProductsFilteredSorted, direction, adminProductsFilteredPrice));
    }, [rendezes, sort, adminProductsFilteredPrice]);

    useEffect(() => {
        if (adminProductsFilteredSorted.length > 0) {
            if (+currentPage > pageCount || +currentPage == 0 || currentPage === undefined || isNaN(currentPage)) {
                navigate(`/admin/termekek/1`)
            }
        }
    }, [adminProductsFilteredSorted])

    function displayIndicator() {
        return [0 + (URL - 1) * 9, 9 * URL];
    }

    function selectHandler(e) {
        setSort(e.target.value);
        const urlMap = {
            '--': '/admin/termekek/1',
            'csokkeno-ar': '/admin/termekek/csokkeno-ar/1',
            'novekvo-ar': '/admin/termekek/novekvo-ar/1',
            'novekvo-cim': '/admin/termekek/novekvo-cim/1',
            'csokkeno-cim': '/admin/termekek/csokkeno-cim/1',
        };
        let path = urlMap[e.target.value];
        navigate(path);


    }

    function selectCategoryHandler(e) {
        setSort(e.target.value);
        console.log("select-category-handler");
        
    }

    return (
        <>
                <div className='admin-totalproducts'>
                    <h1>Összes Termék: {totalCountOfProducts}</h1>
                </div>


            <div className='admin-filters'>
                <div className='filter-by-name'>
                    <AdminFilteringByName />
                </div>
                <div className='filter-by-name2'>
                    <AdminProductFilterPrice />
                </div>
                <div className='admin-filter-sorting'>

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
                            onChange={selectCategoryHandler}
                            value={sort}
                        >
                            <option value='besorolatlan'>besorolatlan</option>
                            <AdminCategoryListOptions categoryList={categoryNames}/>
                        </select>
                    </div>
                </div>

            <div className="table">

                <div className="table-header">

                    <div className="table-row">
                        <div className="table-header-cells">Cikkszám</div>
                        <div className="table-header-cells">Termék megnevezése
                            <span><AiFillCaretUp onClick={()=> {
                                setSort('novekvo-cim');
                                navigate('/admin/termekek/novekvo-cim/1')}
                                }/>
                            </span> 
                            <span><AiFillCaretDown onClick={()=>{
                                setSort('csokkeno-cim');
                                navigate('/admin/termekek/csokkeno-cim/1')}
                                }/>
                            </span>
                        </div>
                        <div className="table-header-cells">Ár</div>
                        <div className="table-header-cells">Kép</div>
                        <div className="table-header-cells">Művelet</div>
                    </div>
                </div>

                <div className="table-body">
                    {
                        adminProductsFilteredSorted.slice(displayDataFirst, displayDataLast).map(product => (
                            <div className="table-row" key={uuidv4()}>
                                <AdminSingleProduct products={product} />
                                <div className="table-body-cell">
                                    <Link to={`/admin/termekek/${product.item}/modositas/${URL}`}>Módosítás |</Link>
                                    <Link to={`/admin/termekek/${product.item}/torles/${URL}`}>| Törlés</Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div >
        </>
    )
}
