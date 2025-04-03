import React, { useState, useEffect } from "react";
import Background from "../../layouts/Background/Background";
import fondo from "../../assets/images/Fondo.png";
import Calendar from "../../layouts/Calendar/Calendar";
import CourtAvailability from "../../layouts/CourtAvailability/CourtAvailability";
import Modal from "../../layouts/Modal/Modal";
import Sidebar from "../../layouts/SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store";
import "./Home.css";

const Home: React.FC = () => {
  const [modalState, setModalState] = useState({
    modificar: false,
    cancelar: false,
    recurrente: false,
  });
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const options = ["Juan Pérez", "María Gómez", "Carlos Rodríguez", "Laura Martínez", "Jhoan Castro"];

  useEffect(() => {
    setModalState((prev) => ({ ...prev, recurrente: true }));
  }, []);

  const toggleModal = (type: "modificar" | "cancelar" | "recurrente", state: boolean) => {
    setModalState((prev) => ({ ...prev, [type]: state }));
  };

  return (
    <Background backgroundImage={fondo}>
      <div className="reservation-system">
        <Sidebar showSidebar={showSidebar} toggleSidebar={() => setShowSidebar(!showSidebar)} />

        <div className="main-content">
          <div className="reservation-container">
            <div className="calendar-section"><Calendar /></div>
            <div className="legend-actions-section">
            {useAuth().isAdmin && (
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Buscar persona"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  list="personas"
                />
                <datalist id="personas">
                  {options.map((option, index) => (
                    <option key={index} value={option} />
                  ))}
                </datalist>
              </div>
            )}
              <div className="legend-container">
                {[
                  { className: "available", label: "CON DISPONIBILIDAD" },
                  { className: "your-reservation", label: "TU RESERVA" },
                  { className: "unavailable", label: "SIN DISPONIBILIDAD" }
                ].map((legend, index) => (
                  <div key={index} className="legend-item">
                    <div className={`legend-color ${legend.className}`}></div>
                    <span>{legend.label}</span>
                  </div>
                ))}
              </div>

              <div className="action-buttons">
                <div className="action-button-header">
                  <button className="action-button modify" onClick={() => toggleModal("modificar", true)}>Modificar Reserva</button>
                  <button className="action-button cancel" onClick={() => toggleModal("cancelar", true)}>Cancelar Reserva</button>
                </div>
                <div className="action-button-footer">
                  <button className="action-button pay" onClick={() => navigate("/pago")}>Pagar Reserva</button>
                </div>
              </div>
            </div>

            <div className="courts-section"><CourtAvailability /></div>
          </div>
        </div>

        {modalState.cancelar && (
          <Modal
            titleModal="Cancelar Reserva"
            children={
              <div className="cancelar-modal-content">
                <p className="paragraph title">¿Escriba su motivo por la cual cancela la reserva?</p>
                <input type="textarea" className="cancelar-modal-input" placeholder="Escribe aquí..." />
                <p className="paragraph footer-cancelar">Nota: El monto consignado para la reserva no será reembolsado</p>
              </div>
            }
            onConfirm={() => toggleModal("cancelar", false)}
            onCancel={() => toggleModal("cancelar", false)}
          />
        )}

        {modalState.modificar && (
          <Modal
            titleModal="Modificar Reserva"
            children={<div className="modificar-modal-content">
              <div className="modificar-modal left">
                <p className="modificar-modal-title">Día</p>
                <button className="modificar-modal-button-dia selected">Lunes</button>
                <button className="modificar-modal-button-dia">Martes</button>
                <button className="modificar-modal-button-dia">Miércoles</button>
              </div>
              <div className="modificar-modal right">
                <p className="modificar-modal-title">Hora</p>
                <button className="modificar-modal-button-hora selected">6:00 - 7:00pm</button>
                <button className="modificar-modal-button-hora">7:00 - 8:00pm</button>
                <button className="modificar-modal-button-hora">9:00 - 10:00pm</button>
              </div>

            </div>}
            onConfirm={() => toggleModal("modificar", false)}
            onCancel={() => toggleModal("modificar", false)}
          />
        )}

        {modalState.recurrente && (
          <Modal
            titleModal="Reserva Recurrente"
            children={<div className="recurrente-modal-content">
              <p className="paragraph title">Reserva fácil y rápido</p>
              <p className="paragraph">Hemos notado que sueles</p>
              <p className="paragraph">reservar el [DIA] a las [HORA] en</p>
              <p className="paragraph">la cancha [CANCHA]</p>
              <p className="paragraph footer">¿Quieres confirmar tu próxima reserva?</p>
            </div>}
            onConfirm={() => toggleModal("recurrente", false)}
            onCancel={() => toggleModal("recurrente", false)}
          />
        )}
      </div>
    </Background>
  );
};

export default Home;
