

import CartWidget from "./CartWidget";
import { Link } from "react-router-dom";

import "./navbar.css";

function NavBar() {
  return (
    <nav className="nav-menu">
      <Link to="/">
        <h3>Mi Verduleria Online</h3>
      </Link>

      <Link to="/category/verdura">Verduras</Link>
      <Link to="/category/fruta">Frutas</Link>
      <Link to="/cart">Carrito</Link>

      <CartWidget />
    </nav>
  );
}

export default NavBar;
