import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (username.trim().length < 3) return setError("Usuario mínimo 3 caracteres.");
    if (password.trim().length < 4) return setError("Contraseña mínimo 4 caracteres.");

    login(username.trim());
    navigate("/", { replace: true });
  };

  return (
    <main className="container">
      <section className="auth">
        <h2>Login</h2>

        <form className="form" onSubmit={onSubmit}>
          <label className="label">Usuario</label>
          <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} required />

          <label className="label">Contraseña</label>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          {error && <p className="error">{error}</p>}

          <button className="btn" type="submit">Entrar</button>

          <p className="muted" style={{ marginTop: 12 }}>
            ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
