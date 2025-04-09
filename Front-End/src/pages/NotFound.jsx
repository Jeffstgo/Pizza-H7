import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mt-4">
      <div className="card text-center">
        <div className="card-header bg-danger text-white">
          <h2>404 - Página no encontrada</h2>
        </div>
        <div className="card-body">
          <p className="card-text">
            Lo sentimos, la página que buscas no existe.
          </p>
          <Link to="/" className="btn btn-primary">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
