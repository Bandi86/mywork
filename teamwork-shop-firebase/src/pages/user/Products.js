import Pagination from '../../components/user/Pagination';
import ProductList from '../../components/user/ProductList';
import './products.css';


export default function Products() {
	return (
		<div className='product-main'>
			<ProductList />
			<Pagination page={'/termekek'} />
		</div>
	);
}
