import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const items = cart.reduce((acc, i) => acc + i.cantidad, 0);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="brand">
          Tienda<span>Lite</span>
        </Link>

        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Inicio
          </NavLink>
          <NavLink
            to="/productos"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Productos
          </NavLink>
          <NavLink
            to="/carrito"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Carrito <span className="badge">{items}</span>
          </NavLink>
        </nav>

        <div className="header__right">
          {user ? (
            <>
              <span className="chip">Hola, {user.username}</span>
              <button className="btn btn--ghost" onClick={logout}>
                Salir
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn--ghost" to="/login">
                Login
              </Link>
              <Link className="btn" to="/registro">
                Registro
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
