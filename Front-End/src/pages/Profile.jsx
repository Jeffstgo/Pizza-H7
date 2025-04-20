import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { email, getProfile, logout } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getProfile();
      if (!result.success) {
        setError("No se pudo obtener el perfil.");
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <p className="text-center mt-4">Cargando perfil...</p>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2>Perfil de Usuario</h2>
        </div>
        <div className="card-body">
          <p className="card-text">
            <strong>Email:</strong> {email}
          </p>
          <button onClick={handleLogout} className="btn btn-danger">
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
