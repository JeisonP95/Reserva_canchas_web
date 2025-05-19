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

  const handleLogout = () => logout()

  const menuItems = [
    { icon: "🏠", label: "Inicio", path: "/home" },
    { icon: "👤", label: "Perfil", path: "/perfil" },
    { icon: "➕", label: "Crear Usuario", path: "/crearusuarioadmin" },
    { icon: "⚽", label: "Inscripción Campeonatos", path: "/campeonatos" },
    { icon: "📑", label: "Ver Inscripción", path: "/ver-inscripcion-campeonato" },
    { icon: "🔑", label: "Cambiar Contraseña", path: "/change-password" }
  ]

  const adminItems = [
    { icon: "🏆", label: "Crear Campeonatos", path: "/registro-campeonato" },
    { icon: "💰", label: "Gestión Financiera", path: "/gestion-financiera" }
  ]

  return (
    <>
      {/* Siempre visible */}
      <button
        className="menu-button"
        onClick={toggleSidebar}
        aria-label={showSidebar ? "Cerrar menú" : "Abrir menú"}
      >
        <span className="menu-icon">{showSidebar ? "✕" : "☰"}</span>
        <span className="menu-label">Menu</span>
      </button>

      {/* Overlay */}
      {showSidebar && <div className="overlay" onClick={toggleSidebar} />}

      {/* Drawer */}
      <nav className={`sidebar ${showSidebar ? "open" : ""}`}>
        <div className="sidebar-menu">
          {menuItems.map(item => (
            <button
              key={item.path}
              className="sidebar-button"
              onClick={() => {
                navigate(item.path)
                toggleSidebar()
              }}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}

          {isAdmin && (
            <>
              <div className="sidebar-divider" />
              {adminItems.map(item => (
                <button
                  key={item.path}
                  className="sidebar-button"
                  onClick={() => {
                    navigate(item.path)
                    toggleSidebar()
                  }}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </>
          )}
        </div>

        <button className="logout-button" onClick={handleLogout}>
          <span className="sidebar-icon">🚪</span>
          <span>Cerrar Sesión</span>
        </button>
      </nav>
    </>
  )
}

export default Sidebar
