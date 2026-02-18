import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductos } from "../services/productosService";

export default function Home() {
  const [destacados, setDestacados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargar() {
      const data = await getProductos();
      setDestacados(data.filter((p) => p.destacado).slice(0, 10));
      setLoading(false);
    }
    cargar();
  }, []);

  return (
    <main className="container">
      <section className="hero">
        <div className="hero__text">
          <h1>TiendaLite</h1>
          <p className="muted">
            Dirección: <strong>Calle Balaídos, Vigo</strong>
          </p>
          <div className="hero__actions">
            <Link className="btn" to="/productos">Ver productos</Link>
            <Link className="btn btn--ghost" to="/seed">Subir productos</Link>
          </div>
        </div>

        <div className="hero__card">
          <p className="muted">Horario</p>
          <p>L–V: 10:00–20:00</p>
          <p>S: 10:00–14:00</p>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Destacados</h2>
          <p className="muted">5–10 productos destacados</p>
        </div>

        {loading ? (
          <p className="muted">Cargando...</p>
        ) : (
          <div className="grid">
            {destacados.map((p) => (
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
                    <Link className="btn btn--small" to={`/producto/${p.id}`}>Ver</Link>
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
