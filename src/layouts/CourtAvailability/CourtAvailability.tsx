import React, { useState } from "react";

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

  export default CourtAvailability;