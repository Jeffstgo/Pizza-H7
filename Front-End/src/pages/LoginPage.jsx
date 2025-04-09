import { useState } from "react";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setMessage("Todos los campos son obligatorios.");
      return;
    }

    if (form.password.length < 6) {
      setMessage("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setMessage("Inicio de sesión exitoso ✅");
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        {message && <p className="text-danger">{message}</p>}
        <button type="submit" className="btn btn-success w-100">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
