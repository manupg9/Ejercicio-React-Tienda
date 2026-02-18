import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Carrito() {
  const { cart, setQty, removeFromCart, total, clearCart } = useContext(CartContext);

  return (
    <main className="container">
      <section className="section">
        <div className="section__head">
          <h2>Carrito</h2>
          <p className="muted">Modifica cantidades o elimina productos.</p>
        </div>

        {cart.length === 0 ? (
          <div className="empty">
            <p className="muted">Tu carrito está vacío.</p>
            <Link className="btn" to="/productos">Ir a productos</Link>
          </div>
        ) : (
          <>
            <div className="cart">
              {cart.map((item) => (
                <div className="cart__row" key={item.id}>
                  <img className="cart__img" src={item.imagen} alt={item.nombre} />
                  <div className="cart__info">
                    <strong>{item.nombre}</strong>
                    <span className="muted">{item.precio}€ unidad</span>
                  </div>

                  <div className="cart__qty">
                    <label className="muted">Cantidad</label>
                    <input
                      className="input input--qty"
                      type="number"
                      min="1"
                      value={item.cantidad}
                      onChange={(e) => setQty(item.id, e.target.value)}
                    />
                  </div>

                  <div className="cart__actions">
                    <strong className="price">{(item.precio * item.cantidad).toFixed(2)}€</strong>
                    <button
                      className="btn btn--ghost btn--small"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart__footer">
              <div>
                <p className="muted">Total</p>
                <h3>{total.toFixed(2)}€</h3>
              </div>
              <div className="cart__footerActions">
                <button className="btn btn--ghost" onClick={clearCart}>Vaciar carrito</button>
                <button className="btn" onClick={() => alert("Compra simulada ✅")}>Comprar</button>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
