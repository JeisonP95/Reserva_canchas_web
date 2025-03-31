import React from "react";
import Forma from "../../assets/images/Forma.png";
import JugadorLogin from "../../assets/images/JugadorLogin.png";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login: React.FC = () => {

  const navigate = useNavigate();
  return (
    <div className="login-container">
      <div className="forma-imag">
        <img src={Forma} alt="Forma" className="image" />
      </div>
      <div className="login-overlay">
        <div className="login-container-left">
          <img src={JugadorLogin} alt="Jugador" />
        </div>
        <div className="login-container-right">
          <h1 className="login-title">INICIAR SESIÓN</h1>
          <form className="login-form">
            <input type="text" placeholder="Usuario" className="login-input" />
            <input type="password" placeholder="Contraseña" className="login-input" />
            <a href="#" className="forgot-password">Olvidó su contraseña?</a>
            <div className="buttons">
              <button type="submit" onClick={() => navigate("/home")}  className="btn-login">Iniciar</button>
              <button type="button" className="btn-register">Registrarse</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
