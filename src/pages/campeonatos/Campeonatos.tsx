import React, { useState } from "react";
import "./Campeonatos.css";
import Background from "../../layouts/Background/Background";
import fondocam from "../../assets/images/Fondo.png";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/Input/CustomInput";
import CustomSelect from "../../components/Select/CustomSelect";
import CustomButton from "../../components/Buttons/CustomButton";
const Campeonatos: React.FC = () => {
  const [nombreequipo, setNombreequipo] = React.useState("");
  const [seleccampeo, setSeleccampeo] = React.useState("");
  const [nombrecapi, setNombrecapi] = React.useState("");
  const [correo, setCorreo] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const navigate = useNavigate();

  const [mostrarRegistroJugadores, setMostrarRegistroJugadores] =
    useState(false);

  const continuarRegistroJugadores = () => {
    if (
      nombreequipo.trim() === "" ||
      seleccampeo.trim() === "" ||
      nombrecapi.trim() === "" ||
      correo.trim() === "" ||
      telefono.trim() === ""
    ) {
      alert(
        "Por favor, complete todos los campos del equipo antes de continuar."
      );
      return;
    }

    setMostrarRegistroJugadores(true);
  };

  const [nombreJugador, setNombreJugador] = useState("");
  const [edadJugador, setEdadJugador] = useState("");
  const [posicionJugador, setPosicionJugador] = useState("");
  const [jugadores, setJugadores] = useState<
    { nombre: string; edad: string; posicion: string }[]
  >([]);

  const agregarJugador = () => {
    if (
      nombreJugador.trim() === "" ||
      edadJugador.trim() === "" ||
      posicionJugador.trim() === ""
    ) {
      alert("Por favor, completa todos los campos del jugador.");
      return;
    }

    setJugadores([
      ...jugadores,
      {
        nombre: nombreJugador,
        edad: edadJugador,
        posicion: posicionJugador,
      },
    ]);

    setNombreJugador("");
    setEdadJugador("");
    setPosicionJugador("");
  };

  const eliminarJugador = (index: number) => {
    setJugadores(jugadores.filter((_, i) => i !== index));
  };

  return (
    <Background backgroundImage={fondocam}>
      <div className="campeonatos-container">
        <h2 className="title-perfil-cam">🏆Registro para Campeonatos</h2>
        <p className="form-subtitle">
          Complete el formulario para registrar a su equipo en un campeonato
        </p>

        {!mostrarRegistroJugadores ? (
          <div className="custom-form-campeo">
            <h1>Informacion del equipo</h1>
            <p>
              {" "}
              Proporcione los detalles de su equipo para el registro en el
              campeonato
            </p>
            <div className="form-buttons">
              <CustomInput
                value={nombreequipo}
                onChange={(value) => setNombreequipo(value)}
                placeholder="Ingrese nombre del equipo*"
                editable
              />
            </div>
            <div className="form-select">
              <CustomSelect
                value={seleccampeo}
                onChange={setSeleccampeo}
                options={[
                  { value: "1", label: "Torneo Apertura 2025 - Grupo 1" },
                  { value: "2", label: "Torneo Apertura 2025 - Grupo 2" },
                  { value: "3", label: "Torneo Apertura 2025 - Grupo 3" },
                  { value: "4", label: "Torneo Apertura 2025 - Grupo 4" },
                ]}
                placeholder="Seleccione un campeonato*"
              />
            </div>
            <div className="form-buttons">
              <CustomInput
                value={nombrecapi}
                onChange={(value) => setNombrecapi(value)}
                placeholder="Ingrese el nombre del capitán*"
                editable
              />
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <CustomInput
                value={correo}
                onChange={(value) => setCorreo(value)}
                placeholder="Correo@ejemplo.com*"
                editable
              />
              <CustomInput
                value={telefono}
                onChange={(value) => setTelefono(value)}
                placeholder="Teléfono*"
                editable
              />
            </div>
            <div style={{ display: "flex", gap: "55px" }}>
              <CustomButton
                variant="secondary"
                onClick={() => {
                  navigate("/home");
                }}
                text="Cancelar"
              />
              <CustomButton
                variant="primary"
                onClick={continuarRegistroJugadores}
                text="Continuar al Registro de Jugadores"
              />
            </div>
          </div>
        ) : (
          <div className="registro-jugadores">
            <div className="equipo-info">
              <h3>Información del Equipo</h3>
              <p>
                <strong>Equipo:</strong> {nombreequipo}
              </p>
              <p>
                <strong>Campeonato:</strong> {seleccampeo}
              </p>
              <p>
                <strong>Capitán:</strong> {nombrecapi}
              </p>
              <p>
                <strong>Correo:</strong> {correo}
              </p>
              <p>
                <strong>Teléfono:</strong> {telefono}
              </p>
            </div>

            <div className="jugadores-form">
              <h3>Registrar Jugadores</h3>
              <p className="form-subtitle-2">
                Registre a todos los jugadores que participarán en el campeonato
                (mínimo 7, máximo 15)
              </p>
              <div className="form-buttons-2">
                <div style={{ display: "flex", gap: "40px" }}>
                  <div className="form-jugador-row">
                    <CustomInput
                      value={nombreJugador}
                      onChange={setNombreJugador}
                      placeholder="Nombre del jugador"
                      editable
                    />

                    <CustomInput
                      value={edadJugador}
                      onChange={setEdadJugador}
                      placeholder="Edad del jugador"
                      editable
                    />

                    <CustomSelect
                      value={posicionJugador}
                      onChange={setPosicionJugador}
                      options={[
                        { value: "Portero", label: "Portero" },
                        { value: "Defensa", label: "Defensa" },
                        { value: "Mediocampista", label: "Mediocampista" },
                        { value: "Delantero", label: "Delantero" },
                      ]}
                      placeholder="Selecciona una posición"
                    />
                  </div>
                </div>
              </div>

              <div className="button-agre">
                <CustomButton text="Agregar jugador" onClick={agregarJugador} />
              </div>

              <ul
                style={{
                  marginTop: "20px",
                  listStyle: "none",
                  padding: 0,
                  color: "white",
                }}
              >
                {jugadores.map((jugador, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {index + 1}. {jugador.nombre} - {jugador.edad} años -{" "}
                    {jugador.posicion}
                    <button
                      onClick={() => eliminarJugador(index)}
                      style={{
                        marginLeft: "10px",
                        background: "transparent",
                        color: "white",
                        border: "none",
                        padding: "5px 55px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", gap: "55px" }}>
                <CustomButton
                  variant="secondary"
                  onClick={() => {
                    navigate("/home");
                  }}
                  text="Cancelar"
                />
                <CustomButton
                  variant="primary"
                  onClick={() => {
                    navigate("/home");
                  }}
                  text="Registrar equipo"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Background>
  );
};

export default Campeonatos;
