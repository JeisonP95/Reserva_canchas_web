"use client"


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import fondo from "../../assets/images/Fondo.png"
import Sidebar from "../../layouts/SideBar/SideBar"
import Background from "../../layouts/Background/Background"
import "./crearusuarioadmin.css"

interface UserFormData {
  nombre: string
  apellido: string
  email: string
  telefono: string
  password: string
  confirmPassword: string
  rol: string
}

const CrearUsuarioAdmin = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [formData, setFormData] = useState<UserFormData>({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    rol: "usuario",
  })
  const [errors, setErrors] = useState<Partial<UserFormData>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [successMessage, setSuccessMessage] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Validación en tiempo real
    validateField(name, value)

    // Calcular fortaleza de contraseña si el campo es password
    if (name === "password") {
      calculatePasswordStrength(value)
    }

    // Validar confirmación de contraseña si cambia la contraseña
    if (name === "password" && formData.confirmPassword) {
      validateField("confirmPassword", formData.confirmPassword)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target
    setTouched({
      ...touched,
      [name]: true,
    })
    validateField(name, formData[name as keyof UserFormData])
  }

  const calculatePasswordStrength = (password: string) => {
    // Criterios de fortaleza
    const hasLowerCase = /[a-z]/.test(password)
    const hasUpperCase = /[A-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const isLongEnough = password.length >= 8

    // Calcular puntuación (0-4)
    let score = 0
    if (hasLowerCase) score++
    if (hasUpperCase) score++
    if (hasNumber) score++
    if (hasSpecialChar) score++
    if (isLongEnough) score++

    setPasswordStrength(score)
  }

  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return ""
    if (passwordStrength === 1) return "Muy débil"
    if (passwordStrength === 2) return "Débil"
    if (passwordStrength === 3) return "Moderada"
    if (passwordStrength === 4) return "Fuerte"
    return "Muy fuerte"
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return ""
    if (passwordStrength <= 2) return "password-weak"
    if (passwordStrength === 3) return "password-medium"
    return "password-strong"
  }

  const validateField = (name: string, value: string) => {
    let error = ""

    switch (name) {
      case "nombre":
        if (!value.trim()) error = "El nombre es requerido"
        break

      case "apellido":
        if (!value.trim()) error = "El apellido es requerido"
        break

      case "email":
        if (!value.trim()) {
          error = "El email es requerido"
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "El email no es válido"
        }
        break

      case "telefono":
        if (!value.trim()) {
          error = "El teléfono es requerido"
        } else if (!/^\d{10}$/.test(value)) {
          error = "El teléfono debe tener 10 dígitos"
        }
        break

      case "password":
        if (!value.trim()) {
          error = "La contraseña es requerida"
        } else if (value.length < 6) {
          error = "La contraseña debe tener al menos 6 caracteres"
        }
        break

      case "confirmPassword":
        if (value !== formData.password) {
          error = "Las contraseñas no coinciden"
        }
        break

      default:
        break
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))

    return !error
  }

  const validateForm = (): boolean => {
    // Marcar todos los campos como tocados para mostrar todos los errores
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => {
        acc[key] = true
        return acc
      },
      {} as Record<string, boolean>,
    )

    setTouched(allTouched)

    // Validar cada campo
    let isValid = true
    Object.entries(formData).forEach(([key, value]) => {
      const fieldValid = validateField(key, value as string)
      if (!fieldValid) isValid = false
    })

    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      try {
        // Simulación de envío al servidor
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mostrar mensaje de éxito
        setSuccessMessage("Usuario creado exitosamente")

        // Limpiar el formulario después de 3 segundos
        setTimeout(() => {
          setFormData({
            nombre: "",
            apellido: "",
            email: "",
            telefono: "",
            password: "",
            confirmPassword: "",
            rol: "usuario",
          })
          setSuccessMessage("")
          setTouched({})
          setPasswordStrength(0)
        }, 3000)
      } catch (error) {
        console.error("Error al crear usuario:", error)
        // Aquí podrías mostrar un mensaje de error
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleCancel = () => {
    // Navegar a la página anterior o a la página de inicio
    navigate("/admin1")
  }

  return (
    <Background backgroundImage={fondo}>
      <div className="admin-user-system">
        <Sidebar showSidebar={showSidebar} toggleSidebar={() => setShowSidebar(!showSidebar)} />

        <div className="admin-user-content">
          <div className="admin-user-container">
            <h1 className="admin-user-title">Crear Nuevo Usuario</h1>

            {successMessage && (
              <div className="success-message">
                <div className="icon-check"></div>
                {successMessage}
              </div>
            )}

            <form className="admin-user-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <div className="input-container">
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={touched.nombre && errors.nombre ? "input-error" : ""}
                      placeholder="Ingrese nombre"
                    />
                    {touched.nombre && !errors.nombre && <div className="icon-success"></div>}
                  </div>
                  {touched.nombre && errors.nombre && (
                    <span className="error-message">
                      <div className="icon-error"></div>
                      {errors.nombre}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="apellido">Apellido</label>
                  <div className="input-container">
                    <input
                      type="text"
                      id="apellido"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={touched.apellido && errors.apellido ? "input-error" : ""}
                      placeholder="Ingrese apellido"
                    />
                    {touched.apellido && !errors.apellido && <div className="icon-success"></div>}
                  </div>
                  {touched.apellido && errors.apellido && (
                    <span className="error-message">
                      <div className="icon-error"></div>
                      {errors.apellido}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-container">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={touched.email && errors.email ? "input-error" : ""}
                      placeholder="ejemplo@correo.com"
                    />
                    {touched.email && !errors.email && <div className="icon-success"></div>}
                  </div>
                  {touched.email && errors.email && (
                    <span className="error-message">
                      <div className="icon-error"></div>
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <div className="input-container">
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={touched.telefono && errors.telefono ? "input-error" : ""}
                      placeholder="10 dígitos"
                    />
                    {touched.telefono && !errors.telefono && <div className="icon-success"></div>}
                  </div>
                  {touched.telefono && errors.telefono && (
                    <span className="error-message">
                      <div className="icon-error"></div>
                      {errors.telefono}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <div className="input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={touched.password && errors.password ? "input-error" : ""}
                      placeholder="Mínimo 6 caracteres"
                    />
                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                      <div className={showPassword ? "icon-eye-closed" : "icon-eye-open"}></div>
                    </button>
                  </div>
                  {touched.password && errors.password && (
                    <span className="error-message">
                      <div className="icon-error"></div>
                      {errors.password}
                    </span>
                  )}
                  {formData.password && (
                    <div className="password-strength-container">
                      <div className="password-strength-bars">
                        <div
                          className={`strength-bar ${passwordStrength >= 1 ? getPasswordStrengthColor() : ""}`}
                        ></div>
                        <div
                          className={`strength-bar ${passwordStrength >= 2 ? getPasswordStrengthColor() : ""}`}
                        ></div>
                        <div
                          className={`strength-bar ${passwordStrength >= 3 ? getPasswordStrengthColor() : ""}`}
                        ></div>
                        <div
                          className={`strength-bar ${passwordStrength >= 4 ? getPasswordStrengthColor() : ""}`}
                        ></div>
                        <div
                          className={`strength-bar ${passwordStrength >= 5 ? getPasswordStrengthColor() : ""}`}
                        ></div>
                      </div>
                      <span className={`password-strength-text ${getPasswordStrengthColor()}`}>
                        {getPasswordStrengthLabel()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                  <div className="input-container">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={touched.confirmPassword && errors.confirmPassword ? "input-error" : ""}
                      placeholder="Repita la contraseña"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <div className={showConfirmPassword ? "icon-eye-closed" : "icon-eye-open"}></div>
                    </button>
                  </div>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <span className="error-message">
                      <div className="icon-error"></div>
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="rol">Rol</label>
                  <div className="select-container">
                    <select id="rol" name="rol" value={formData.rol} onChange={handleInputChange} onBlur={handleBlur}>
                      <option value="usuario">Usuario</option>
                      <option value="administrador">Administrador</option>
                      <option value="superadmin">Funcionario</option>
                    </select>
                  </div>
                  <div className="help-text">
                    <div className="icon-info"></div>
                    Seleccione el nivel de acceso para este usuario
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={handleCancel}>
                  Cancelar
                </button>
                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  {isSubmitting ? "Creando..." : "Crear Usuario"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Background>
  )
}

export default CrearUsuarioAdmin
