import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../layouts/SideBar/SideBar"; // Ajusta esta ruta según tu estructura de proyecto
import "./VerInscripcionCampeonato.css";
import Background from "../../layouts/Background/Background";
import fondo from "../../assets/images/Fondo.png";

// Definición de tipos
interface CampeonatoProps {
  id: number;
  nombre: string;
  categoria: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  equipos: number;
  partidos: number;
  posicion: number | null;
}

// Datos de ejemplo para los campeonatos
const campeonatosEjemplo: CampeonatoProps[] = [
  {
    id: 1,
    nombre: "Torneo Apertura 2024",
    categoria: "Adultos",
    fechaInicio: "15/05/2024",
    fechaFin: "30/06/2025",
    estado: "En curso",
    equipos: 8,
    partidos: 28,
    posicion: 3
  },
  {
    id: 2,
    nombre: "Copa Verano 2024",
    categoria: "Juvenil",
    fechaInicio: "10/07/2024",
    fechaFin: "25/08/2024",
    estado: "Finalizado",
    equipos: 12,
    partidos: 66,
    posicion: 1
  },
  {
    id: 3,
    nombre: "Liga Regional 2025",
    categoria: "Adultos",
    fechaInicio: "10/04/2025",
    fechaFin: "20/11/2025",
    estado: "Próximo",
    equipos: 10,
    partidos: 45,
    posicion: null
  },
  {
    id: 4,
    nombre: "Torneo Clausura 2023",
    categoria: "Adultos",
    fechaInicio: "01/10/2023",
    fechaFin: "15/12/2023",
    estado: "Culminado",
    equipos: 8,
    partidos: 28,
    posicion: 5
  }
];

const VerInscripcionCampeonato: React.FC = () => {
  // Estados
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [campeonatos, setCampeonatos] = useState<CampeonatoProps[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string>("Todos");
  const [campeonatoSeleccionado, setCampeonatoSeleccionado] = useState<CampeonatoProps | null>(null);
  const [mostrarDetalles, setMostrarDetalles] = useState<boolean>(false);

  const navigate = useNavigate();

  // Cargar datos de ejemplo
  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      setCampeonatos(campeonatosEjemplo);
    }, 500);
  }, []);

  // Función para filtrar campeonatos
  const filtrarCampeonatos = () => {
    if (filtroEstado === "Todos") {
      return campeonatos;
    }
    return campeonatos.filter(camp => camp.estado === filtroEstado);
  };

  // Función para ver detalles de un campeonato
  const verDetallesCampeonato = (campeonato: CampeonatoProps) => {
    setCampeonatoSeleccionado(campeonato);
    setMostrarDetalles(true);
  };

  // Función para cerrar el modal de detalles
  const cerrarDetalles = () => {
    setMostrarDetalles(false);
    setCampeonatoSeleccionado(null);
  };

  // Función para alternar el sidebar
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Obtener campeonatos filtrados
  const campeonatosFiltrados = filtrarCampeonatos();

  return (
    <Background backgroundImage={fondo}>
      <div className="inscripcion-campeonato-container">
        <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />

        <div className="main-content">
          <div className="campeonato-header">
            <h1>Inscripciones a Campeonatos</h1>
            <div className="filtro-container">
              <label htmlFor="filtro-estado">Filtrar por estado:</label>
              <select
                id="filtro-estado"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="filtro-select"
              >
                <option value="Todos">Todos</option>
                <option value="En curso">En curso</option>
                <option value="Finalizado">Finalizado</option>
                <option value="Próximo">Próximo</option>
              </select>
            </div>
          </div>

          <div className="campeonatos-grid">
            {campeonatosFiltrados.length > 0 ? (
              campeonatosFiltrados.map((campeonato) => (
                <div key={campeonato.id} className="campeonato-card">
                  <div className={`estado-badge estado-${campeonato.estado.toLowerCase().replace(" ", "-")}`}>
                    {campeonato.estado}
                  </div>
                  <h2>{campeonato.nombre}</h2>
                  <div className="campeonato-info">
                    <p><span>Categoría:</span> {campeonato.categoria}</p>
                    <p><span>Fecha inicio:</span> {campeonato.fechaInicio}</p>
                    <p><span>Fecha fin:</span> {campeonato.fechaFin}</p>
                    <p><span>Equipos:</span> {campeonato.equipos}</p>
                    {campeonato.posicion !== null && (
                      <p className="posicion">
                        <span>Posición actual:</span>
                        <strong>{campeonato.posicion}º</strong>
                      </p>
                    )}
                  </div>
                  <div className="campeonato-actions">
                    <button
                      className="action-button view"
                      onClick={() => verDetallesCampeonato(campeonato)}
                    >Ver Detalles
                    </button>
                    
                  </div>
                </div>
              ))
            ) : (
              <div className="no-campeonatos">
                <p>No hay campeonatos que coincidan con el filtro seleccionado.</p>
              </div>
            )}
          </div>

          <div className="inscripcion-footer">
            <button
              className="new-inscription-button"
              onClick={() => navigate("/inscripcion-campeonato")}
            >
              Inscribirse en Nuevo Campeonato
            </button>
          </div>
        </div>

        {/* Modal de detalles - Solo se renderiza cuando mostrarDetalles es true */}
        {mostrarDetalles && campeonatoSeleccionado !== null && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick={cerrarDetalles}>×</button>
              <h2>{campeonatoSeleccionado.nombre}</h2>

              <div className="modal-info">
                <div className="info-section">
                  <h3>Información General</h3>
                  <p><span>Categoría:</span> {campeonatoSeleccionado.categoria}</p>
                  <p><span>Estado:</span> {campeonatoSeleccionado.estado}</p>
                  <p><span>Fecha inicio:</span> {campeonatoSeleccionado.fechaInicio}</p>
                  <p><span>Fecha fin:</span> {campeonatoSeleccionado.fechaFin}</p>
                </div>

                <div className="info-section">
                  <h3>Estadísticas</h3>
                  <p><span>Equipos participantes:</span> {campeonatoSeleccionado.equipos}</p>
                  <p><span>Total partidos:</span> {campeonatoSeleccionado.partidos}</p>
                  {campeonatoSeleccionado.posicion !== null && (
                    <p><span>Posición actual:</span> {campeonatoSeleccionado.posicion}º</p>
                  )}
                </div>
              </div>

              <div className="modal-actions">
                <button className="action-button results">Ver Resultados</button>
                {campeonatoSeleccionado.estado !== "Finalizado" && (
                  <button className="action-button cancel">Cancelar Inscripción</button>
                )}
              </div>
            </div>
          </div>
        )}
      </div></Background>
  );
};

export default VerInscripcionCampeonato;
