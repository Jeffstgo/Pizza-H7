const Header = () => {
  return (
    <header
      className="header text-center text-white d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundImage: "url('/assets/img/Header.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "300px",
        width: "100%",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h1 style={{ textShadow: "2px 2px 4px #000" }}>Pizzería Mamma Mia</h1>
        <p style={{ textShadow: "2px 2px 4px #000" }}>
          Las mejores pizzas al mejor precio
        </p>
      </div>
    </header>
  );
};

export default Header;
