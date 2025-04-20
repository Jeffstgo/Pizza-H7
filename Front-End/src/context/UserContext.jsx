import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  }, [token, email]);

  const login = async ({ email, password }) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Error al iniciar sesión");

      const data = await res.json();
      setToken(data.token);
      setEmail(data.email);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const register = async ({ email, password }) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Error al registrarse");

      const data = await res.json();
      setToken(data.token);
      setEmail(data.email);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al obtener el perfil");

      const data = await res.json();
      setEmail(data.email);
      return { success: true, data };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    setToken("");
    setEmail("");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  return (
    <UserContext.Provider
      value={{
        token,
        email,
        login,
        register,
        getProfile,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
