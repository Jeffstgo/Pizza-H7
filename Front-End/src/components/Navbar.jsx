import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const { token, logout } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
    setShowMobileMenu(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={closeDropdown}>
          Pizzería Mamma Mia
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${showMobileMenu ? "show" : ""}`}
          id="navbarContent"
        >
          <div className="d-flex gap-2 ms-auto flex-column flex-lg-row align-items-lg-center">
            <Link to="/" className="btn btn-light" onClick={closeDropdown}>
              🍕 Home
            </Link>

            <div className="dropdown position-relative" ref={dropdownRef}>
              <button
                className="btn btn-success dropdown-toggle"
                type="button"
                onClick={handleDropdownToggle}
                aria-expanded={showDropdown}
              >
                🌟 Más Opciones
              </button>
              <ul
                className={`dropdown-menu ${showDropdown ? "show" : ""}`}
                style={{
                  position: "absolute",
                  zIndex: 1000,
                  display: showDropdown ? "block" : "none",
                }}
              >
                <li>
                  <Link
                    to="/offers"
                    className="dropdown-item"
                    onClick={closeDropdown}
                  >
                    🎉 Ofertas Especiales
                  </Link>
                </li>
                <li>
                  <Link
                    to="/track-order"
                    className="dropdown-item"
                    onClick={closeDropdown}
                  >
                    🚚 Seguir Pedido
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="dropdown-item"
                    onClick={closeDropdown}
                  >
                    ℹ️ Sobre Nosotros
                  </Link>
                </li>
              </ul>
            </div>

            {token ? (
              <>
                <Link
                  to="/profile"
                  className="btn btn-info"
                  onClick={closeDropdown}
                >
                  👤 Perfil
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    logout();
                    closeDropdown();
                  }}
                >
                  🔒 Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-primary"
                  onClick={closeDropdown}
                >
                  🔐 Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-secondary"
                  onClick={closeDropdown}
                >
                  📝 Register
                </Link>
              </>
            )}

            <Link
              to="/cart"
              className="btn btn-warning position-relative"
              onClick={closeDropdown}
            >
              🛒 Carrito
              {cartItems.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
