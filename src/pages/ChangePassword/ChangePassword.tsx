import React, { useState } from "react";
import CustomForm from "../../layouts/CustomForm/CustomForm";
import CustomInput from "../../components/Input/CustomInput";
import CustomButton from "../../components/Buttons/CustomButton";
import Background from "../../layouts/Background/Background";
import FormData from "../../layouts/FormData/FormData";
import imgBackground from "../../assets/images/Fondo.png";
import imgJugador from "../../assets/images/JUGADOR.png";
import iconCandado from "../../assets/images/iconCandado.png";
import "./ChangePassword.css";
import Sidebar from "../../layouts/SideBar/SideBar";

const ChangePassword: React.FC = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    return (
        <Background backgroundImage={imgBackground}>
            <Sidebar showSidebar={showSidebar} toggleSidebar={() => setShowSidebar(!showSidebar)} />
            <FormData
                childLeft={<img src={imgJugador} alt="Jugador de fútbol" />}
                childRight={
                    <CustomForm>
                        <img className="icon-candado" src={iconCandado} alt="Candado de seguridad" />
                        <h1 className="title-change-password">Actualiza tu contraseña</h1>
                        <CustomInput onChange={() => { }} value="" placeholder="Ingresa tu nueva contraseña" />
                        <CustomInput onChange={() => { }} value="" placeholder="Repite contraseña" />
                        <CustomButton onClick={() => { }} text="Guardar Cambios" />
                    </CustomForm>
                }
            />
            
        </Background>
    );
};

export default ChangePassword;
