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
          <div className="form-container">
            <div className="login-form-header">
              <h1 className="login-title">INICIAR</h1>
              <h1 className="login-title">SESIÓN</h1>
            </div>
            <form className="login-form">
              <div className="input-container">
                <label className="label-form">Usuario</label>
                <input type="text" placeholder="Escribeaqui@tucorreo.com" className="login-input" />
              </div>
              <div className="input-container">
                <label className="label-form">Contraseña</label>
                <input type="password" placeholder="*********" className="login-input" />
              </div>
              <a href="#" className="forgot-password">¿Olvidó su contraseña?</a>
              <div className="buttons">
                <button type="submit" onClick={() => navigate("/home")} className="btn-login">Iniciar</button>
                <button type="button" className="btn-register">Registrarse</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;