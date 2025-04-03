import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store";
import "./Sidebar.css";

interface SidebarProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ showSidebar, toggleSidebar }) => {

  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  console.log("isAdmin", isAdmin);

  return (
    <>
      {/* Botón de menú móvil */}
      <button className="menu-button" onClick={toggleSidebar}>☰</button>

      {/* Sidebar */}

      <div className={`sidebar ${showSidebar ? "open" : ""}`}>
        <div className="sidebar-menu">

          {
            isAdmin ?  <button className="sidebar-button" onClick={() => navigate("/registro-campeonato")}>
              <span className="sidebar-icon">⚽</span>
              <span>Registro Campeonatos</span>
            </button>
            :""
          }


          <button className="sidebar-button" onClick={() => navigate("/home")}>
            <span className="sidebar-icon">🏠</span>
            <span>Inicio</span>
          </button>

          <button className="sidebar-button" onClick={() => navigate("/perfil")}>
            <span className="sidebar-icon">👤</span>
            <span>Perfil</span>
          </button>
          <button className="sidebar-button" onClick={() => navigate("/home")}>
            <span className="sidebar-icon">⚽</span>
            <span>Inscripcion Campeonato</span>
          </button>

          <button className="sidebar-button" onClick={() => navigate("/")}>
          <span className="sidebar-icon">📑</span>
          <span>Ver Inscripcion Campeonato</span>
        </button>

          <button className="sidebar-button" onClick={() => navigate("/change-password")}>
            <span className="sidebar-icon">🔑</span>
            <span>Cambiar Contraseña</span>
          </button>
        </div>

        <button className="logout-button" onClick={() =>  {isAdmin ? navigate("/admin") : navigate("/login")} }>
          <span className="sidebar-icon">🚪</span>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
