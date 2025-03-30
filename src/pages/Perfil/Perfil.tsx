import React from "react";
import Background from "../../layouts/Background/Background";
import fondo from "../../assets/images/Fondo.png";
import CustomForm from "../../layouts/CustomForm/CustomForm";
import FormData from "../../layouts/FormData/FormData";
import jugador from "../../assets/images/JUGADOR.png";
import iconperfil from "../../assets/images/person_circle.png";
import CustomInput from "../../components/Input/CustomInput";
import "./perfil.css"
import CustomButton from "../../components/Buttons/CustomButton";

const Perfil: React.FC = () => {
  return (
    <Background backgroundImage={fondo}>
      <FormData
        childLeft={<img src={jugador} />}
        childRight={
          <CustomForm>

            <h2 className="title-perfil">Actualiza los siguientes datos</h2>
            <img src={iconperfil} alt="Perfil" className="perfil-icono" />
            <h3 className="title-perfil">Editar imagen de perfil</h3>
            <CustomInput value="Jesus Yeison" onChange={() => { }} editable />
            <CustomInput value="Pencue Talaga" onChange={() => { }} editable />
            <CustomInput value="jesus@correo.com" onChange={() => { }} editable />
            <CustomInput value="3104994168" onChange={() => { }} editable />
            <div className="perfil-buttons">
              <CustomButton variant="secondary" onClick={() => { }} text="Cancelar"/>
              <CustomButton variant="primary" onClick={() => { }} text="Guardar Cambios" />
            </div>
          </CustomForm>
        }
      ></FormData>
    </Background>
  );
};

export default Perfil;