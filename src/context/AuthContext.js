import { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext(null);
const LS_KEY = "tienda_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (username) => {
    const u = { username };
    setUser(u);
    localStorage.setItem(LS_KEY, JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LS_KEY);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
