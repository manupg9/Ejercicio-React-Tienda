import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductos } from "../services/productosService";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargar() {
      const data = await getProductos();
      setProductos(data);
      setLoading(false);
    }
    cargar();
  }, []);

  const producto = useMemo(
    () => productos.find((p) => String(p.id) === String(id)),
    [productos, id]
  );

  const handleAdd = () => {
    if (!user) return navigate("/login", { replace: true });
    addToCart(producto);
    navigate("/carrito");
  };

  if (loading) {
    return (
      <main className="container">
        <p className="muted">Cargando...</p>
      </main>
    );
  }

  if (!producto) {
    return (
      <main className="container">
        <p className="muted">Producto no encontrado.</p>
        <Link className="btn btn--ghost" to="/productos">Volver</Link>
      </main>
    );
  }

  return (
    <main className="container">
      <section className="detail">
        <img className="detail__img" src={producto.imagen} alt={producto.nombre} />

        <div className="detail__info">
          <div className="detail__top">
            <h2>{producto.nombre}</h2>
            <span className="pill">{producto.categoria}</span>
          </div>

          <p className="muted">{producto.descripcion}</p>

          <div className="detail__meta">
            <div className="meta">
              <span className="muted">Precio</span>
              <strong className="price">{producto.precio}€</strong>
            </div>
            <div className="meta">
              <span className="muted">Stock</span>
              <strong>{producto.stock}</strong>
            </div>
          </div>

          <div className="detail__actions">
            <button className="btn" onClick={handleAdd}>
              {user ? "Añadir al carrito" : "Inicia sesión para comprar"}
            </button>
            <Link className="btn btn--ghost" to="/productos">Volver</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
