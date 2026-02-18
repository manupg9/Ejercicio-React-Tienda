import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function esMayorDeEdad(fechaStr) {
  const nacimiento = new Date(fechaStr);
  const hoy = new Date();

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;

  return edad >= 18;
}

export default function Registro() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    nombre: "",
    apellidos: "",
    email: "",
    nacimiento: "",
  });

  const [error, setError] = useState("");

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (form.username.trim().length < 3) return setError("Usuario mínimo 3 caracteres.");
    if (form.password.trim().length < 4) return setError("Contraseña mínimo 4 caracteres.");
    if (form.nombre.trim().length < 2) return setError("Nombre inválido.");
    if (form.apellidos.trim().length < 2) return setError("Apellidos inválidos.");
    if (!form.email.includes("@")) return setError("Email inválido.");
    if (!form.nacimiento) return setError("Indica fecha de nacimiento.");
    if (!esMayorDeEdad(form.nacimiento)) return setError("Debes ser mayor de edad.");

    login(form.username.trim()); // auto-login
    navigate("/", { replace: true });
  };

  return (
    <main className="container">
      <section className="auth">
        <h2>Registro</h2>

        <form className="form" onSubmit={onSubmit}>
          <label className="label">Usuario</label>
          <input className="input" value={form.username} onChange={(e) => set("username", e.target.value)} required />

          <label className="label">Contraseña</label>
          <input className="input" type="password" value={form.password} onChange={(e) => set("password", e.target.value)} required />

          <label className="label">Nombre</label>
          <input className="input" value={form.nombre} onChange={(e) => set("nombre", e.target.value)} required />

          <label className="label">Apellidos</label>
          <input className="input" value={form.apellidos} onChange={(e) => set("apellidos", e.target.value)} required />

          <label className="label">Email</label>
          <input className="input" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required />

          <label className="label">Fecha de nacimiento</label>
          <input className="input" type="date" value={form.nacimiento} onChange={(e) => set("nacimiento", e.target.value)} required />

          {error && <p className="error">{error}</p>}

          <button className="btn" type="submit">Crear cuenta</button>

          <p className="muted" style={{ marginTop: 12 }}>
            ¿Ya tienes cuenta? <Link to="/login">Login</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
