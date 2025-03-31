import React, { useState } from "react";
import Background from "../../layouts/Background/Background";
import fondo from "../../assets/images/Fondo.png";
import FormData from "../../layouts/FormData/FormData";
import CustomForm from "../../layouts/Form/CustomForm";
import CustomInput from "../../components/Input/CustomInput";
import CustomSelect from "../../components/Select/CustomSelect";
import imgPse from "../../assets/images/image_pse.png";
import CustomButton from "../../components/Buttons/CustomButton";
import "./Pago.css";

const Pago: React.FC = () => {
  const [correo, setCorreo] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [tipodocumento, setTipoDocumento] = React.useState("");
  const [numerodocumento, setNumeroDocumento] = React.useState("");
  const [valorreservamin, setValorreservamin] = React.useState("");
  const [banco, setBanco] = useState("");
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const handleSelectBox = (box: string, event: React.MouseEvent) => {
    // Si el clic ocurre dentro del input, no hacer nada
    if ((event.target as HTMLElement).tagName === "INPUT") return;
    setSelectedBox((prev) => (prev === box ? null : box)); // Si ya está seleccionada, la deselecciona
  };
  return (
    <Background backgroundImage={fondo}>
      <FormData
        childLeft={
          <CustomForm>
            <h2 className="title-pago">Detalles del cliente</h2>
            <CustomInput
              value={correo}
              onChange={(value) => setCorreo(value)}
              placeholder="Correo*"
              editable
            />
            <CustomInput
              value={apellido}
              onChange={(value) => setApellido(value)}
              placeholder="apellido*"
              editable
            />
            <CustomInput
              value={telefono}
              onChange={(value) => setTelefono(value)}
              placeholder="Teléfono*"
              editable
            />
            <CustomInput
              value={correo}
              onChange={(value) => setCorreo(value)}
              placeholder="Correo*"
              editable
            />
            <CustomSelect
              value={tipodocumento}
              onChange={setTipoDocumento}
              options={[
                { value: "CC", label: "Cédula de ciudadanía" },
                { value: "CE", label: "Cédula de extranjería" },
              ]}
              placeholder="Tipo de documento*"
            />
            <CustomInput
              value={numerodocumento}
              onChange={(value) => setNumeroDocumento(value)}
              placeholder="Numero de  documento*"
              editable
            />
            {/* Formulario de compra */}
          </CustomForm>
        }
        childRight={
          <div className="child-right">
            <h2 className="title-perfil">Servicio a pagar</h2>
            <div style={{ display: "flex", gap: "20px" }}>
              <div className="custom-container">
                {/* Caja de Pago Total */}
                <div
                  onClick={(e) => handleSelectBox("total", e)}
                  className={`clickable-icon ${
                    selectedBox === "total" ? "selected" : ""
                  }`}
                >
                  <div className="payment-box">
                    <p>Pago total:</p>
                    <p>$120.000</p>
                  </div>
                </div>
                {/*Caja de pago parcial*/}
                <div
                  onClick={(e) => handleSelectBox("parcial", e)}
                  className={`clickable-icon ${
                    selectedBox === "parcial" ? "selected" : ""
                  }`}
                >
                  <div className="payment-box">
                    <p>Pago parcial:</p>
                    <div className="input-container">
                      <CustomInput
                        value={valorreservamin}
                        onChange={(value) => setValorreservamin(value)}
                        placeholder="Valor min: $50.000"
                        editable
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="title-perfil">El pago lo puede realizar a traves del siguiente medio.</h2>
            <img src={imgPse} alt="Pago" className="img-pse" />
            <h2 className="title-perfil">Escoge tu Banco para continuar con el pago.</h2>
            <CustomSelect
              value={banco}
              onChange={setBanco}
              options={[
                { value: "AF", label: "ALIANZA FIDUCIARIA S.A." },
                { value: "AV", label: "AV Villas" },
                { value: "BI", label: "Banco Itau" },
                { value: "BC", label: "Bancolombia" },
                { value: "D", label: "Davivienda" },
                { value: "DP", label: "DaviPlata" },
                { value: "N", label: "Nequi" },
              ]}
              placeholder="Elija su Banco"
            />
            <div style={{ display: 'flex', gap: '20px' }}>
              <CustomButton variant="secondary" onClick={() => { }} text="Cancelar" />
              <CustomButton variant="primary" onClick={() => { }} text="Pagar ahora" />
            </div>
          </div>
        }
      />
    </Background>
  );
};

export default Pago;
