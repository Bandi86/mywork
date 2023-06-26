import {Outlet} from 'react-router-dom';
import Navigation from "./Navigation";
import "./layout.style.css";
import Footer from "./Footer";
import FeaturedTopBar from './FeaturedTopBar';
import CategoriesNav from './CategoriesNav';


export default function Layout (){
    return (
			<div className='layout-flex'>
				<FeaturedTopBar/>
				<Navigation />
				<CategoriesNav/>
				<main>
					<Outlet />
				</main>
				<Footer />
			</div>
		);
}