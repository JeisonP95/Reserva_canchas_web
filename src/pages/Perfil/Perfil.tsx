import React from "react";
import Background from "../../layouts/Background/Background";
import fondo from "../../assets/images/Fondo.png";
import CustomForm from "../../layouts/Form/CustomForm";
import FormData from "../../layouts/FormData/FormData";
import jugador from "../../assets/images/JUGADOR.png";
import iconperfil from "../../assets/images/🦆 icon _person circle outline_.png";
import CustomInput from "../../components/Input/CustomInput";

const Perfil: React.FC = () => {
  return (
    <Background backgroundImage={fondo}>
      <FormData
        childLeft={<img src={jugador} />}
        childRight={
          <CustomForm>

            <h1>Actualiza los siguientes datos</h1>
            <img src={iconperfil} />
            <h3>Editar imagen de perfil</h3>




          </CustomForm>
        }
      ></FormData>
    </Background>
  );
};

export default Perfil;
