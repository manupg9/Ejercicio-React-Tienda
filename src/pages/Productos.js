import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProductos } from "../services/productosService";

export default function Productos() {
  const [q, setQ] = useState("");
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

  const filtrados = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return productos;
    return productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(t) ||
        p.descripcion.toLowerCase().includes(t)
    );
  }, [q, productos]);

  return (
    <main className="container">
      <section className="section">
        <div className="section__head">
          <h2>Productos</h2>
          <p className="muted">Busca por nombre o descripción.</p>
        </div>

        <div className="searchbar">
          <input
            className="input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ej: consola, monitor..."
          />
          <button className="btn" onClick={() => setQ(q.trim())}>Buscar</button>
        </div>

        {loading ? (
          <p className="muted">Cargando productos...</p>
        ) : (
          <div className="grid">
            {filtrados.map((p) => (
              <article className="card" key={p.id}>
                <img className="card__img" src={p.imagen} alt={p.nombre} />
                <div className="card__body">
                  <div className="card__top">
                    <h3 className="card__title">{p.nombre}</h3>
                    <span className="pill">{p.categoria}</span>
                  </div>
                  <p className="card__desc">{p.descripcion}</p>
                  <div className="card__bottom">
                    <strong className="price">{p.precio}€</strong>
                    <Link className="btn btn--small" to={`/producto/${p.id}`}>
                      Detalles
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

