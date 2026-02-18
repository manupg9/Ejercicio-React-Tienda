import { useState } from "react";
import { seedProductosEnFirestore } from "../services/seedService";

export default function SeedProductos() {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const subir = async () => {
    setLoading(true);
    setMsg("");
    try {
      const res = await seedProductosEnFirestore();
      setMsg(res.message);
    } catch (e) {
      console.error(e);
      setMsg("❌ Error subiendo productos. Revisa firebase.js o reglas de Firestore.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <section className="auth">
        <h2>Subir productos a Firestore</h2>
        <p className="muted">Pulsa una vez. Si ya hay productos, no duplica.</p>

        <button className="btn" onClick={subir} disabled={loading}>
          {loading ? "Subiendo..." : "Subir 10 productos"}
        </button>

        {msg && <p className="muted" style={{ marginTop: 12 }}>{msg}</p>}
      </section>
    </main>
  );
}
