import React from "react"
import { useNavigate } from "react-router-dom"
import "./NotFound.css"

const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found-container">
      <div className="stars"></div>
      <div className="central-body">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <div className="not-found-astronaut">
            <div className="astronaut-helmet"></div>
            <div className="astronaut-body"></div>
            <div className="astronaut-backpack"></div>
            <div className="astronaut-leg left"></div>
            <div className="astronaut-leg right"></div>
            <div className="astronaut-arm left"></div>
            <div className="astronaut-arm right"></div>
          </div>
          <h2 className="not-found-subtitle">Página no encontrada</h2>
          <p className="not-found-text">Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
          <button className="back-home-button" onClick={() => navigate("/home")}>
            Volver al inicio
          </button>
        </div>
      </div>
      <div className="objects">
        <div className="earth-moon">
          <div className="object_earth"></div>
          <div className="object_moon"></div>
        </div>
        <div className="box_astronaut">
          <div className="object_astronaut"></div>
        </div>
      </div>
    </div>
  )
}

export default NotFound

