import { NavLink } from 'react-router-dom';
import { logout } from '../user/icons';
import NavSignInOut from './../user/Auth/NavSignInOut';
import "./adminNavigation.css"
import Logo from '../user/logo.png';

export default function AdminNavigation () {
    return (
        <div className="admin-navi">
            <div className='admin-navi-left'>
                <NavLink id='logo' to='/'><img
					src={Logo}
					alt='logo'
					width='100px'
					height='40px'
				/></NavLink>
                </div>
                {/* <NavLink to="/admin/">Admin</NavLink> */}
                <div className='admin-navi-centre'>
                <NavLink to="/admin/termekek/1">Terméklista</NavLink>
                <NavLink to="/admin/termek-felvitel">Termékfelvitel</NavLink>
                <NavLink to='/admin/kategoriak'>Kategóriák</NavLink>
                <NavLink to='/admin/kategoriak/uj-kategoria'>Kategória felvitel</NavLink>
                <NavLink to='/admin/users'>Felhasználók Listája</NavLink>
                <NavLink to='/admin/megrendelesek'>Megrendelések</NavLink>
                </div>
                <div className='admin-navi-right'>
                <NavSignInOut /> 
                </div>
        </div>
    )
}