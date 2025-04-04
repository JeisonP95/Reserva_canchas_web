"use client"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import fondo from "../../assets/images/Fondo.png";
import Sidebar from "../../layouts/SideBar/SideBar"
import Background from "../../layouts/Background/Background";
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

const CrearUsuarioAdmin: React.FC = () => {
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
    const [successMessage, setSuccessMessage] = useState<string>("")

    const navigate = useNavigate()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })

        // Limpiar error cuando el usuario comienza a escribir
        if (errors[name as keyof UserFormData]) {
            setErrors({
                ...errors,
                [name]: "",
            })
        }
    }

    const validateForm = (): boolean => {
        const newErrors: Partial<UserFormData> = {}
        let isValid = true

        if (!formData.nombre.trim()) {
            newErrors.nombre = "El nombre es requerido"
            isValid = false
        }

        if (!formData.apellido.trim()) {
            newErrors.apellido = "El apellido es requerido"
            isValid = false
        }

        if (!formData.email.trim()) {
            newErrors.email = "El email es requerido"
            isValid = false
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "El email no es válido"
            isValid = false
        }

        if (!formData.telefono.trim()) {
            newErrors.telefono = "El teléfono es requerido"
            isValid = false
        } else if (!/^\d{10}$/.test(formData.telefono)) {
            newErrors.telefono = "El teléfono debe tener 10 dígitos"
            isValid = false
        }

        if (!formData.password.trim()) {
            newErrors.password = "La contraseña es requerida"
            isValid = false
        } else if (formData.password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres"
            isValid = false
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden"
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            // Aquí iría la lógica para enviar los datos al servidor
            console.log("Datos del formulario:", formData)

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
            }, 3000)
        }
    }

    const handleCancel = () => {
        // Navegar a la página anterior o a la página de inicio
        navigate("/admin1")
    };

    return (
        <Background backgroundImage={fondo}>
            <div className="admin-user-system">
                <Sidebar showSidebar={showSidebar} toggleSidebar={() => setShowSidebar(!showSidebar)} />

                <div className="admin-user-content">
                    <div className="admin-user-container">
                        <h1 className="admin-user-title">Crear Nuevo Usuario</h1>

                        {successMessage && <div className="success-message">{successMessage}</div>}

                        <form className="admin-user-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        className={errors.nombre ? "input-error" : ""}
                                    />
                                    {errors.nombre && <span className="error-message">{errors.nombre}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="apellido">Apellido</label>
                                    <input
                                        type="text"
                                        id="apellido"
                                        name="apellido"
                                        value={formData.apellido}
                                        onChange={handleInputChange}
                                        className={errors.apellido ? "input-error" : ""}
                                    />
                                    {errors.apellido && <span className="error-message">{errors.apellido}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={errors.email ? "input-error" : ""}
                                    />
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="telefono">Teléfono</label>
                                    <input
                                        type="tel"
                                        id="telefono"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleInputChange}
                                        className={errors.telefono ? "input-error" : ""}
                                    />
                                    {errors.telefono && <span className="error-message">{errors.telefono}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="password">Contraseña</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className={errors.password ? "input-error" : ""}
                                    />
                                    {errors.password && <span className="error-message">{errors.password}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className={errors.confirmPassword ? "input-error" : ""}
                                    />
                                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="rol">Rol</label>
                                    <select id="rol" name="rol" value={formData.rol} onChange={handleInputChange}>
                                        <option value="usuario">Usuario</option>
                                        <option value="administrador">Administrador</option>
                                        <option value="superadmin">Funcionario</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="cancel-button" onClick={handleCancel}>
                                    Cancelar
                                </button>
                                <button type="submit" className="submit-button">
                                    Crear Usuario
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

