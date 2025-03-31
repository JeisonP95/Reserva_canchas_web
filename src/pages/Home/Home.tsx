import React, { useState, useEffect } from "react";
import Background from "../../layouts/Background/Background";
import fondo from "../../assets/images/Fondo.png";
import Calendar from "../../layouts/Calendar/Calendar";
import CourtAvailability from "../../layouts/CourtAvailability/CourtAvailability";
import Modal from "../../layouts/Modal/Modal";
import Sidebar from "../../layouts/SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const [modalState, setModalState] = useState({
    modificar: false,
    cancelar: false,
    recurrente: false,
  });
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

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

        {/* Contenido principal */}
        <div className="main-content">
          <div className="reservation-container">
            <div className="calendar-section"><Calendar /></div>

            <div className="legend-actions-section">
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

        {/* Modales */}
        {modalState.cancelar && (
          <Modal
            titleModal="Cancelar Reserva"
            children={<div>Esta acción no se puede deshacer.</div>}
            onConfirm={() => toggleModal("cancelar", false)}
            onCancel={() => toggleModal("cancelar", false)}
          />
        )}

        {modalState.modificar && (
          <Modal
            titleModal="Modificar Reserva"
            children={<div>Esta acción no se puede deshacer.</div>}
            onConfirm={() => toggleModal("modificar", false)}
            onCancel={() => toggleModal("modificar", false)}
          />
        )}

        {modalState.recurrente && (
          <Modal
            titleModal="Reserva Recurrente"
            children={<div>Este es un mensaje de reserva recurrente.</div>}
            onConfirm={() => toggleModal("recurrente", false)}
            onCancel={() => toggleModal("recurrente", false)}
          />
        )}
      </div>
    </Background>
  );
};

export default Home;
