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
      <div className="forma-imag">
        <img src={Forma || "/placeholder.svg"} alt="Forma" className="image" />
      </div>
      <div className="login-overlay">
        <div className="login-container-left">
          <img src={JugadorLogin || "/placeholder.svg"} alt="Jugador" />
        </div>
        <div className="login-container-right">
          <div className="form-container">
            <div className="login-form-header">
              <h1 className="login-title">INICIAR</h1>
              <h1 className="login-title">SESIÓN</h1>
              {isAdminLogin && <h2 className="login-subtitle">ADMINISTRADOR</h2>}
            </div>

            {error && <div className="error-message">{error}</div>}

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-container">
                <label className="label-form">Usuario</label>
                <input
                  type="text"
                  placeholder="Escribeaqui@tucorreo.com"
                  className="login-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="input-container">
                <label className="label-form">Contraseña</label>
                <input
                  type="password"
                  placeholder="*********"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <a href="/change-password" className="forgot-password">
                ¿Olvidó su contraseña?
              </a>
              <div className="buttons">
                <button type="submit" className="btn-login" disabled={isLoading}>
                  {isLoading ? "Iniciando..." : "Iniciar"}
                </button>
                {!isAdminLogin && (
                  <button type="button" className="btn-register" onClick={() => navigate("/registro-usuario")}>
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

export default Login;

