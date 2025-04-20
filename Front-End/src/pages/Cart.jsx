import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useState } from "react";

const Cart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, clearCart, total } =
    useCart();
  const { token } = useUser();
  const [message, setMessage] = useState("");

  const handleCheckout = async () => {
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart: cartItems }),
      });

      if (!res.ok) throw new Error("No se pudo procesar la compra.");

      setMessage("✅ ¡Compra realizada con éxito!");
      clearCart();
    } catch (err) {
      setMessage("❌ Hubo un problema al procesar la compra.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Carrito de Compras</h2>

      {message && <div className="alert alert-info">{message}</div>}

      {cartItems.length === 0 ? (
        <p className="text-center">El carrito está vacío</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="card-body d-flex justify-content-between">
                <div>
                  <h5>{item.name}</h5>
                  <p>
                    Precio: ${item.price} x {item.quantity}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="btn btn-danger btn-sm"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="btn btn-success btn-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="text-end">
            <h4>Total: ${total.toFixed(2)}</h4>
            <button onClick={clearCart} className="btn btn-danger me-2">
              Vaciar Carrito
            </button>
            <button
              onClick={handleCheckout}
              className="btn btn-primary"
              disabled={!token}
            >
              Pagar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
