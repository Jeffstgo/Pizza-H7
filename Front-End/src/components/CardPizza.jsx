import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CardPizza = ({ pizza }) => {
  const { addToCart } = useCart();

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={pizza.img}
        className="card-img-top"
        alt={pizza.name}
        style={{
          height: "180px",
          objectFit: "cover",
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{pizza.name}</h5>
        <ul className="mb-3">
          {pizza.ingredients.map((ingrediente, index) => (
            <li key={index} className="small">
              {ingrediente}
            </li>
          ))}
        </ul>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fw-bold">${pizza.price}</span>
          <div>
            <Link
              to={`/pizza/${pizza.id}`}
              className="btn btn-sm btn-primary me-2"
            >
              Ver más
            </Link>
            <button
              onClick={() => addToCart(pizza)}
              className="btn btn-sm btn-success"
            >
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;
