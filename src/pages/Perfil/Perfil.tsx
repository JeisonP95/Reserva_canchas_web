import React from "react"; 
import Background from "../../layouts/Background/Background";
import fondo from "../../assets/images/Fondo.png";
import CustomForm from "../../layouts/Form/CustomForm";
import FormData from "../../layouts/FormData/FormData";
import jugador from "../../assets/images/JUGADOR.png";
import iconperfil from "../../assets/images/person_circle.png";
import CustomInput from "../../components/Input/CustomInput";
import CustomButton from "../../components/Buttons/CustomButton";
import "./perfil.css"

const Perfil: React.FC = () => {
  const [nombre, setNombre] = React.useState("Jesus Yeison");
  const [apellido, setApellido] = React.useState("Pencue Talaga");
  const [telefono, setTelefono] = React.useState("3104994168");
  const [correo, setCorreo] = React.useState("jesus@gmail.com");
  
  return (
    <Background backgroundImage={fondo}>
      <FormData
        childLeft={<img src={jugador} />}
        childRight={
          <CustomForm>
            <h2 className="title-perfil">Actualiza los siguientes datos</h2>
            <img src={iconperfil} alt="Perfil" className="perfil-icono" />
            <div onClick={() => {}} className="clickable-icon">
              <h3 className="title-perfil">Editar imagen de perfil</h3>
            </div>
            <CustomInput value={nombre} onChange={(value) => setNombre(value)}placeholder="Nombre" editable/>
            <CustomInput value={apellido} onChange={(value) => setApellido(value)} placeholder="apellido" editable />
            <CustomInput value={telefono} onChange={(value) => setTelefono(value)}placeholder="Teléfono" editable />
            <CustomInput value={correo} onChange={(value) => setCorreo(value)}placeholder="Correo" editable />
            <div style={{ display: 'flex', gap: '20px' }}>
              <CustomButton variant="secondary" onClick={() => { }} text="Cancelar" />
              <CustomButton variant="primary" onClick={() => { }} text="Guardar Cambios" />
            </div>
          </CustomForm>
        }
      ></FormData>
    </Background>
  );
};

export default Perfil;