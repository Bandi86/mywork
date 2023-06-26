import './featuredTopBar.css';
import { Link } from 'react-router-dom';
import {AiOutlineDoubleRight} from 'react-icons/ai'

export default function FeaturedTopBar() {
    return (
        <div className= 'topbar'>
            <p className='top-featured-link-container' >
            	<Link to='/termekek/1' className='top-featured-link' ><span>TERMÉKEK </span><span id='icon-double-right'><AiOutlineDoubleRight/></span> </Link>
            </p>        
        </div>
    )
}