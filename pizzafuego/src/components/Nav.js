import "./../style/nav.css"
import { Link } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BiLogIn } from 'react-icons/bi'
import { CiPizza } from 'react-icons/ci'
import { AiFillPhone } from 'react-icons/ai'
import { useContext } from 'react'
import { CartContext } from './CartContext'
import { BsSearch } from 'react-icons/bs';


export default function Nav(props) {

    const menu = ["Shop", "Contact", "About", "Galery"];
  
    const { cart } = useContext(CartContext);
    
    /* ha kattintok a nagyítóra, akkor a searchActive értéke true lesz, és megjeleník ott ahol a kompenensét meghívom, ha még egyszer kattintok, akkor false lesz és eltűnik */

    function handleClick() {
      props.setSearchActive(!props.searchActive);
    }   
  
    return (
      <nav>
        <div className="nav-left">
          <h1>
            <CiPizza />
            <span>Pizza Fuego </span>
            <CiPizza />
          </h1>
        </div>
        <span className="phonespan">
          <AiFillPhone />
          <span className="phonenumber">+36 83/315 504</span>
        </span>
        <div className="nav-center">
          <Link to="/" className="home">
            Kezdőlap
          </Link>
          {menu.map((item, index) => {
            return (
              <div key={index} className="text">
                <Link to={`/${item.toLowerCase()}`}>{item}</Link>
              </div>
            );
          })}
        </div>
        <div className="nav-right">
          <BsSearch className="searchicon" onClick={handleClick}></BsSearch>
          <div className="cartdiv">

          <Link to="/cart"><AiOutlineShoppingCart className="carticon" /></Link>

          {/* ha a kosárban van valami, akkor a kosár ikon mellett megjelenik a kosárban lévő termékek száma  amit a globális contextből olvas ki*/}
          {cart.length > 0 && <span className="cartnumber">{cart.length}</span>}
          
            <Link to="/login">
              <span className="spanlogin">
                <BiLogIn className="loginicon" />
                <span className="textlogin">Login</span>
              </span>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
