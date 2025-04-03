import React from "react";
import Fondo from "../../assets/images/FondoRegistroUsuario.png";
import HeaderFondo from "../../assets/images/HeaderFondoRegistroUsuario.png";
import LogoFacebook from "../../assets/images/logoFacebook.png";
import LogoGmail from "../../assets/images/logoGmail.png";
import { useNavigate } from "react-router-dom";
import "./RegistroUsuario.css";

const RegistroUsuario: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="registro-usuario-container">
            <div className="fondo-registro-usuario">
                <img src={Fondo} alt="Fondo" className="fondo-imagen" />
            </div>
            <div className="header-fondo-registro-usuario">
                <img src={HeaderFondo} alt="Header" className="header-imagen" />
            </div>
            <div className="registro-usuario-overlay">
                <div className="registro-usuario-container-left">
                    <div className="group-inputs">
                        <label htmlFor="nombres">Nombres</label>
                        <input type="text" id="nombres" placeholder="Nombres Completos" className="registro-usuario-input" />
                    </div>
                    <div className="group-inputs">
                        <label htmlFor="apellidos">Apellidos</label>
                        <input type="text" id="apellidos" placeholder="Apellidos Completos" className="registro-usuario-input" />
                    </div>
                    <div className="group-inputs">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Escribeaqui@tucorreo.com" className="registro-usuario-input" />
                    </div>
                    <div className="group-inputs">
                        <label htmlFor="celular">Celular</label>
                        <input type="tel" id="celular" placeholder="3214567890" className="registro-usuario-input" />
                    </div>
                    <div className="group-inputs">
                        <label htmlFor="contrasena">Contraseña</label>
                        <input type="password" id="contrasena" placeholder="*********" className="registro-usuario-input" />
                    </div>
                    <div className="group-inputs">
                        <label htmlFor="repite-contrasena">Repite la Contraseña</label>
                        <input type="password" id="repite-contrasena" placeholder="**********" className="registro-usuario-input" />
                    </div>
                </div>
                <div className="registro-usuario-container-right" onClick={() => navigate("/home")}>                
                    <button type="submit" className="btn-registrar">Registrarse</button>
                    <div className="group-buttons">
                        <button type="button" className="btn-redes">
                            <img className="icono-facebook" src={LogoFacebook} alt="Facebook"/>
                            Registrarse con Facebook
                        </button>
                    </div>
                    <div className="group-buttons">
                        <button type="button" className="btn-redes">
                            <img className="icono-gmail" src={LogoGmail} alt="Gmail"/>
                            Registrarse con Gmail
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistroUsuario;