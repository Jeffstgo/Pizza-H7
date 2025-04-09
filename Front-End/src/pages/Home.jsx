import React, { useState, useEffect } from "react";
import CardPizza from "../components/CardPizza";

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pizzas");
        const data = await response.json();
        setPizzas(data.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pizzas:", error);
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
     
      <div className="row g-4 mb-4">
        {pizzas.slice(0, 3).map((pizza) => (
          <div key={pizza.id} className="col-md-4">
            <CardPizza pizza={pizza} />
          </div>
        ))}
      </div>

      
      <div className="row g-4">
        {pizzas.slice(3, 6).map((pizza) => (
          <div key={pizza.id} className="col-md-4">
            <CardPizza pizza={pizza} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
