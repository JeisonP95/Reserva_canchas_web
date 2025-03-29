import React, { useState } from "react";
import imgBackground from "../../assets/images/Fondo.png";
import imgJugador from "../../assets/images/JUGADOR.png";
import Background from "../../layouts/Background/Background";
import fondo from "../../assets/images/Fondo.png";
import CustomForm from "../../layouts/Form/CustomForm";
import FormData from "../../layouts/FormData/FormData";
import jugador from "../../assets/images/JUGADOR.png";
import iconperfil from "../../assets/images/person_circle.png";
import CustomInput from "../../components/Input/CustomInput";
import "./Home.css";
import CustomButton from "../../components/Buttons/CustomButton";

const Perfil: React.FC = () => {
  return (
    <Background backgroundImage={fondo}>
      <FormData
        childLeft={<img src={jugador || "/placeholder.svg"} />}
        childRight={
          <CustomForm>
            <h1 className="title-perfil">Actualiza los siguientes datos</h1>
            <img src={iconperfil || "/placeholder.svg"} />
            <h3 className="title-perfil">Editar imagen de perfil</h3>
          </CustomForm>
        }
      ></FormData>
    </Background>
  );
};

// Componente de Calendario
const Calendar: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(18);

  // Días de la semana en español
  const daysOfWeek = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];

  // Generar dias para Enero
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Crear grid del calendario
  const renderCalendarGrid = () => {
    const rows: React.ReactNode[] = [];
    let cells: React.ReactNode[] = [];

    // Añadir encabezado con dias de la semana
    const headerCells = daysOfWeek.map((day, index) => (
      <div key={`header-${index}`} className="calendar-day-header">
        {day}
      </div>
    ));

    rows.push(
      <div key="header" className="calendar-row">
        {headerCells}
      </div>
    );

    // Añadir celdas de dias
    days.forEach((day, index) => {
      const isSelected = day === selectedDay;

      cells.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${isSelected ? 'selected-day' : ''}`}
          onClick={() => setSelectedDay(day)}
        >
          {day}
        </div>
      );

      // Crear una nueva fila para cada semana
      if ((index + 1) % 7 === 0 || index === days.length - 1) {
        // Rellenar celdas restantes si es necesario
        while (cells.length % 7 !== 0) {
          cells.push(
            <div key={`empty-${cells.length}`} className="calendar-day empty"></div>
          );
        }

        rows.push(
          <div key={`row-${Math.floor(index / 7)}`} className="calendar-row">
            {cells}
          </div>
        );
        cells = [];
      }
    });

    return rows;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>ENERO</h2>
      </div>
      <div className="calendar-grid">
        {renderCalendarGrid()}
      </div>
    </div>
  );
};

// Componente de Disponibilidad de Canchas
interface Court {
  id: string;
  name: string;
  time: string;
  available: boolean;
}

const CourtAvailability: React.FC = () => {
  const [activeTab, setActiveTab] = useState("todos");
  // Aquí se crea un nuevo estado para cada tarjeta
  const [activeCards, setActiveCards] = useState<{ [key: string]: boolean }>({});

  // Función para manejar el clic en una tarjeta
  const handleActiveCard = (id: string) => {
    setActiveCards({
      ...activeCards,
      [id]: !activeCards[id], // Invierte el estado de la tarjeta
    });
  };

  // Datos de ejemplo de canchas
  const courts: Court[] = [
    { id: "1-1", name: "Cancha #1", time: "3pm - 4pm", available: true },
    { id: "1-2", name: "Cancha # 2", time: "4pm - 5pm", available: true },
    { id: "1-3", name: "Cancha # 1", time: "6pm - 7pm", available: true },
    { id: "1-4", name: "Cancha #2", time: "9pm - 10pm", available: true },
    { id: "2-1", name: "Cancha #3", time: "3pm - 4pm", available: true },
    { id: "2-2", name: "Cancha # 2", time: "4pm - 5pm", available: true },
    { id: "2-3", name: "Cancha #2", time: "8pm - 9pm", available: true },
    { id: "2-4", name: "Cancha # 3", time: "9pm - 10pm", available: true },
    { id: "3-1", name: "Cancha #°5", time: "3pm - 4pm", available: true },
    { id: "3-2", name: "Cancha # 4", time: "6pm - 7pm", available: true },
    { id: "3-3", name: "Cancha #3", time: "8pm - 9pm", available: true },
    { id: "3-4", name: "Cancha #5", time: "9pm - 10pm", available: true },
  ];

  // Agrupar canchas por periodo de tiempo
  const morningCourts = courts.filter(court =>
    court.time.includes("3pm") || court.time.includes("4pm")
  );

  const afternoonCourts = courts.filter(court =>
    court.time.includes("4pm") || court.time.includes("5pm") ||
    court.time.includes("6pm") || court.time.includes("7pm")
  );

  const eveningCourts = courts.filter(court =>
    court.time.includes("8pm") || court.time.includes("9pm") || court.time.includes("10pm")
  );

  // Renderizar tarjeta de cancha
  const renderCourtCard = (court: Court) => (
    <div key={court.id} className={`court-card`}>
      <div className="court-card-header">
        <h3>{court.name}</h3>
        <span className="court-time">{court.time}</span>
      </div>
      <button onClick={() => handleActiveCard(court.id)} className={`court-availability-button ${activeCards[court.id] ? 'selectedCard' : ''}`}>
        {!activeCards[court.id] ? 'DISPONIBLE':'RESERVADO'}
      </button>
    </div>
  );

  // Renderizar canchas en una cuadricula
  const renderCourtGrid = (courtList: Court[]) => (
    <div className="court-grid">
      {courtList.map(renderCourtCard)}
    </div>
  );

  return (
    <div className="court-availability-container">
      <div className="tabs-container">
        <div className="tabs-header">
          <button
            className={`tab-button ${activeTab === "todos" ? "active" : ""}`}
            onClick={() => setActiveTab("todos")}
          >
            Todos
          </button>
          <button
            className={`tab-button ${activeTab === "manana" ? "active" : ""}`}
            onClick={() => setActiveTab("manana")}
          >
            Mañana
          </button>
          <button
            className={`tab-button ${activeTab === "tarde" ? "active" : ""}`}
            onClick={() => setActiveTab("tarde")}
          >
            Tarde
          </button>
          <button
            className={`tab-button ${activeTab === "noche" ? "active" : ""}`}
            onClick={() => setActiveTab("noche")}
          >
            Noche
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "todos" && renderCourtGrid(courts)}
          {activeTab === "manana" && renderCourtGrid(morningCourts)}
          {activeTab === "tarde" && renderCourtGrid(afternoonCourts)}
          {activeTab === "noche" && renderCourtGrid(eveningCourts)}
        </div>
      </div>
    </div>
  );
};

// Componente Modal de Confirmacion
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Confirmar Reserva</h2>
        <p>¿Estás seguro que deseas confirmar esta reserva?</p>
        <div className="modal-buttons">
          <button className="modal-button cancel" onClick={onClose}>Cancelar</button>
          <button className="modal-button confirm" onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

// Componente Home actualizado
const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmReservation = () => {
    // Lógica para confirmar la reserva
    console.log('Reserva confirmada');
    setShowModal(false);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Background backgroundImage={fondo}>
      <div className="reservation-system">
        {/* Botón de menú móvil */}
        <button className="menu-button" onClick={toggleSidebar}>
          ☰
        </button>

        {/* Sidebar */}
        <div className={`sidebar ${showSidebar ? 'open' : ''}`}>
          <div className="sidebar-menu">
            <button className="sidebar-button">
              <span className="sidebar-icon">🏠</span>
              <span>Inicio</span>
            </button>
            <button className="sidebar-button">
              <span className="sidebar-icon">👤</span>
              <span>Perfil</span>
            </button>
            <button className="sidebar-button">
              <span className="sidebar-icon">🔑</span>
              <span>Cambiar Contraseña</span>
            </button>
          </div>
          <button className="logout-button">
            <span className="sidebar-icon">🚪</span>
            <span>Cerrar Sesion</span>
          </button>
        </div>

        {/* Contenido principal */}
        <div className="main-content">
          <div className="reservation-container">
            {/* Sección de Calendario */}
            <div className="calendar-section">
              <Calendar />
            </div>

            {/* Leyenda y Acciones */}
            <div className="legend-actions-section">
              <div className="legend-container">
                <div className="legend-item">
                  <div className="legend-color available"></div>
                  <span>CON DISPONIBILIDAD</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color your-reservation"></div>
                  <span>TU RESERVA</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color unavailable"></div>
                  <span>SIN DISPONIBILIDAD</span>
                </div>
              </div>

              <div className="action-buttons">
                <div className="action-button-header">
                  <button className="action-button modify">Modificar Reserva</button>
                  <button className="action-button cancel" onClick={handleOpenModal}>Cancelar Reserva</button>
                </div>
                <div className="action-button-footer">
                  <button className="action-button pay">Pagar Reserva</button>
                </div>
              </div>
            </div>

            {/* Sección de Disponibilidad de Canchas */}
            <div className="courts-section">
              <CourtAvailability />
            </div>
          </div>
        </div>

        {/* Modal de Confirmación */}
        <ConfirmationModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onConfirm={handleConfirmReservation}
        />
      </div>
    </Background>
  );
};

export default Home;
