import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2>Perfil de Usuario</h2>
        </div>
        <div className="card-body">
          <p className="card-text">
            <strong>Email:</strong> usuario@example.com
          </p>
          <Link to="/" className="btn btn-primary">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
