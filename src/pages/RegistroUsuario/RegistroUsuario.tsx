"use client"

import React from "react"
import { useState } from "react"
import Fondo from "../../assets/images/FondoRegistroUsuario.png"
import HeaderFondo from "../../assets/images/HeaderFondoRegistroUsuario.png"
import LogoFacebook from "../../assets/images/logoFacebook.png"
import LogoGmail from "../../assets/images/logoGmail.png"
import { useNavigate } from "react-router-dom"
import "./RegistroUsuario.css"

const RegistroUsuario: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    celular: "",
    contrasena: "",
    repetirContrasena: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))

    // Limpiar error cuando el usuario comienza a escribir
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[id]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombres.trim()) newErrors.nombres = "El nombre es requerido"
    if (!formData.apellidos.trim()) newErrors.apellidos = "Los apellidos son requeridos"

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.celular.trim()) {
      newErrors.celular = "El celular es requerido"
    } else if (!/^\d{10}$/.test(formData.celular)) {
      newErrors.celular = "Debe contener 10 dígitos"
    }

    if (!formData.contrasena) {
      newErrors.contrasena = "La contraseña es requerida"
    } else if (formData.contrasena.length < 6) {
      newErrors.contrasena = "Mínimo 6 caracteres"
    }

    if (formData.contrasena !== formData.repetirContrasena) {
      newErrors.repetirContrasena = "Las contraseñas no coinciden"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Aquí iría la lógica para enviar los datos al servidor
      navigate("/home")
    }
  }

  const handleSocialLogin = (provider: string) => {
    // Aquí iría la lógica para autenticación con redes sociales
    console.log(`Iniciando registro con ${provider}`)
    // Después de autenticación exitosa:
    navigate("/home")
  }

  return (
    <div className="registro-container">
      {/* Imágenes de fondo */}
      <div className="registro-background">
        <img src={Fondo || "/placeholder.svg"} alt="" className="fondo-completo" aria-hidden="true" />
      </div>
      <div className="registro-header-background">
        <img src={HeaderFondo || "/placeholder.svg"} alt="" className="header-imagen" aria-hidden="true" />
      </div>

      {/* Contenido principal */}
      <div className="registro-content">
        <h1 className="registro-title">Registro de Usuario</h1>

        <div className="registro-form-container">
          <form className="registro-form" onSubmit={handleSubmit} noValidate>
            <div className="form-columns">
              {/* Columna izquierda - Datos personales */}
              <div className="form-column">
                <div className="input-group">
                  <label htmlFor="nombres" className="input-label">
                    Nombres
                  </label>
                  <input
                    type="text"
                    id="nombres"
                    placeholder="Nombres Completos"
                    className={`input-field ${errors.nombres ? "input-error" : ""}`}
                    value={formData.nombres}
                    onChange={handleChange}
                  />
                  {errors.nombres && <span className="error-text">{errors.nombres}</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="apellidos" className="input-label">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    id="apellidos"
                    placeholder="Apellidos Completos"
                    className={`input-field ${errors.apellidos ? "input-error" : ""}`}
                    value={formData.apellidos}
                    onChange={handleChange}
                  />
                  {errors.apellidos && <span className="error-text">{errors.apellidos}</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="email" className="input-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Escribeaqui@tucorreo.com"
                    className={`input-field ${errors.email ? "input-error" : ""}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="celular" className="input-label">
                    Celular
                  </label>
                  <input
                    type="tel"
                    id="celular"
                    placeholder="3214567890"
                    className={`input-field ${errors.celular ? "input-error" : ""}`}
                    value={formData.celular}
                    onChange={handleChange}
                  />
                  {errors.celular && <span className="error-text">{errors.celular}</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="contrasena" className="input-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="contrasena"
                    placeholder="*********"
                    className={`input-field ${errors.contrasena ? "input-error" : ""}`}
                    value={formData.contrasena}
                    onChange={handleChange}
                  />
                  {errors.contrasena && <span className="error-text">{errors.contrasena}</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="repetirContrasena" className="input-label">
                    Repite la Contraseña
                  </label>
                  <input
                    type="password"
                    id="repetirContrasena"
                    placeholder="**********"
                    className={`input-field ${errors.repetirContrasena ? "input-error" : ""}`}
                    value={formData.repetirContrasena}
                    onChange={handleChange}
                  />
                  {errors.repetirContrasena && <span className="error-text">{errors.repetirContrasena}</span>}
                </div>
              </div>

              {/* Columna derecha - Botones de acción */}
              <div className="form-column action-column">
                <button type="submit" className="btn-registrar">
                  Registrarse
                </button>

                <div className="social-login-container">
                  <p className="social-login-text">O regístrate con:</p>

                  <button type="button" className="btn-social facebook" onClick={() => handleSocialLogin("Facebook")}>
                    <img className="social-icon" src={LogoFacebook || "/placeholder.svg"} alt="Facebook" />
                    <span>Registrarse con Facebook</span>
                  </button>

                  <button type="button" className="btn-social gmail" onClick={() => handleSocialLogin("Gmail")}>
                    <img className="social-icon" src={LogoGmail || "/placeholder.svg"} alt="Gmail" />
                    <span>Registrarse con Gmail</span>
                  </button>
                </div>

                <div className="login-link-container">
                  <p className="login-text">¿Ya tienes una cuenta?</p>
                  <button type="button" className="btn-login-link" onClick={() => navigate("/login")}>
                    Iniciar Sesión
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegistroUsuario
