"use client"

import  React from "react"
import { useEffect, useState } from "react"
import Forma from "../../assets/images/Forma.png"
import JugadorLogin from "../../assets/images/JugadorLogin.png"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../store"
import "./Login.css"

interface LocationState {
  from?: {
    pathname: string
  }
}

const Login: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated } = useAuth()

  // Determinar si es un login de administrador basado en la ruta actual
  const isAdminLogin = location.pathname === "/admin"

  // Obtener la ruta desde donde fue redirigido (si existe)
  const state = location.state as LocationState
  const from = state?.from?.pathname || "/home"

  // Si ya está autenticado, redirigir a home
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home")
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) {
      setError("Por favor ingrese usuario y contraseña")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const success = await login(username, password, isAdminLogin)

      if (success) {
        // Redirigir al usuario a la página desde donde fue redirigido o a home
        navigate(from, { replace: true })
      } else {
        setError("Usuario o contraseña incorrectos")
      }
    } catch (err) {
      setError("Error al iniciar sesión. Intente nuevamente.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="forma-image">
        <img src={Forma || "/placeholder.svg"} alt="" className="background-image" aria-hidden="true" />
      </div>

      <div className="login-content">
        <div className="login-left">
          <img src={JugadorLogin || "/placeholder.svg"} alt="Jugador" className="player-image" />
        </div>

        <div className="login-right">
          <div className="form-container">
            <div className="login-header">
              <h1 className="login-title">
                <span className="title-line">INICIAR</span>
                <span className="title-line">SESIÓN</span>
              </h1>
              {isAdminLogin && <h2 className="admin-subtitle">ADMINISTRADOR</h2>}
            </div>

            {error && (
              <div className="error-message" role="alert">
                <span>{error}</span>
              </div>
            )}

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className="input-group">
                <label htmlFor="username" className="input-label">
                  Usuario
                </label>
                <input
                  id="username"
                  type="email"
                  placeholder="Escribeaqui@tucorreo.com"
                  className="input-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password" className="input-label">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="*********"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <a href="/change-password" className="forgot-password">
                ¿Olvidó su contraseña?
              </a>

              <div className="button-group">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      <span>Iniciando...</span>
                    </>
                  ) : (
                    "Iniciar"
                  )}
                </button>

                {!isAdminLogin && (
                  <button type="button" className="btn btn-secondary" onClick={() => navigate("/registro-usuario")}>
                    Registrarse
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
