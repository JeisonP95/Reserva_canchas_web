import React, { useEffect, useState } from "react";
import Forma from "../../assets/images/Forma.png";
import JugadorLogin from "../../assets/images/JugadorLogin.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../store";
import "./Login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, setAdmin } = useAuth();

  console.log("isAdmin", isAdmin);

  useEffect(() => {
    // Verificamos si la ruta es para admin
    if (location.pathname === "/admin") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [location, setAdmin]);

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
          <div className="form-container">
            <div className="login-form-header">
              <h1 className="login-title">INICIAR</h1>
              <h1 className="login-title">SESIÓN</h1>
            </div>
            <form className="login-form">
              <div className="input-container">
                <label className="label-form">{isAdmin ? "Administrador" : "Usuario"}</label>
                <input type="text" placeholder="Escribeaqui@tucorreo.com" className="login-input" />
              </div>
              <div className="input-container">
                <label className="label-form">Contraseña</label>
                <input type="password" placeholder="*********" className="login-input" />
              </div>
              <a href="#" className="forgot-password">¿Olvidó su contraseña?</a>
              <div className="buttons">
                <button type="submit" onClick={() => navigate("/home")} className="btn-login">Iniciar</button>
                {isAdmin ? "" : <button type="button" className="btn-register" onClick={() => navigate("/registro-usuario")}>Registrarse</button>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;