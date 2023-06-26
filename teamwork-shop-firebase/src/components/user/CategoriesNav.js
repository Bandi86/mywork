import './categoriesNav.css';
import { Link } from 'react-router-dom';

export default function CategoriesNav() {
	return (
		<div className='cat-navi-container'>
			<p>
				{' '}
				<Link to='#'>
					<span>FUTÁS</span>
				</Link>
			</p>
			<p>
				{' '}
				<Link to='#'>
					<span>KERÉKPÁR</span>
				</Link>
			</p>
			<p>
				{' '}
				<Link to='#'>
					<span>EJTŐERNYŐ</span>
				</Link>
			</p>
			<p>
				{' '}
				<Link to='#'>
					<span>SZIKLAMÁSZÁS</span>
				</Link>
			</p>
			<p>
				{' '}
				<Link to='#'>
					<span>FITNESS</span>
				</Link>
			</p>
			<p>
				{' '}
				<Link to='#'>
					<span>SPORTRUHÁZAT</span>
				</Link>
			</p>
		</div>
	);
}
