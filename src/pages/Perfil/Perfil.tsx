import React from "react";
import Background from "../../layouts/Background/Background";
import fondo from "../../assets/images/Fondo.png";
import CustomForm from "../../layouts/Form/CustomForm";
import FormData from "../../layouts/FormData/FormData";
import jugador from "../../assets/images/JUGADOR.png";
import iconperfil from "../../assets/images/person_circle.png";
import CustomInput from "../../components/Input/CustomInput";
import "./perfil.css"

const Perfil: React.FC = () => {
  return (
    <Background backgroundImage={fondo}>
      <FormData
        childLeft={<img src={jugador} />}
        childRight={
          <CustomForm>

            <h1 className="title-perfil">Actualiza los siguientes datos</h1>
            <img src={iconperfil} />
            <h3 className="title-perfil">Editar imagen de perfil</h3>




          </CustomForm>
        }
      ></FormData>
    </Background>
  );
};

export default Perfil;
