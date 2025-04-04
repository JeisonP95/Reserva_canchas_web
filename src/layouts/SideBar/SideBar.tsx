import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../store"
import "./Sidebar.css"

interface SidebarProps {
  showSidebar: boolean
  toggleSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ showSidebar, toggleSidebar }) => {
  const { isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    // Llamar a la función logout del contexto de autenticación
    logout()
  }

  return (
    <>
      {/* Botón de menú móvil */}
      <button className="menu-button" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${showSidebar ? "open" : ""}`}>
        <div className="sidebar-menu">
          <button className="sidebar-button" onClick={() => navigate("/home")}>
            <span className="sidebar-icon">🏠</span>
            <span>Inicio</span>
          </button>

          <button className="sidebar-button" onClick={() => navigate("/perfil")}>
            <span className="sidebar-icon">👤</span>
            <span>Perfil</span>
          </button>

          {isAdmin ? (
            <>
              <button className="sidebar-button" onClick={() => navigate("/registro-campeonato")}>
                <span className="sidebar-icon">&#127942;</span>
                <span>Crear Campeonatos</span>
              </button>
              <button className="sidebar-button" onClick={() => navigate("/gestion-financiera")}>
                <span className="sidebar-icon">&#128178;</span>
                <span>Gestion Financiera</span>
              </button>
            </>
          ) : (
            ""
          )}

          <button className="sidebar-button" onClick={() => navigate("/home")}>
            <span className="sidebar-icon">⚽</span>
            <span>Inscripcion Campeonato</span>
          </button>

          <button className="sidebar-button" onClick={() => navigate("/ver-inscripcion-campeonato")}>
            <span className="sidebar-icon">📑</span>
            <span>Ver Inscripcion Campeonato</span>
          </button>

          <button className="sidebar-button" onClick={() => navigate("/change-password")}>
            <span className="sidebar-icon">🔑</span>
            <span>Cambiar Contraseña</span>
          </button>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          <span className="sidebar-icon">🚪</span>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </>
  )
}

export default Sidebar

