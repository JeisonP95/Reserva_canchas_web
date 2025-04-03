import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/Buttons/CustomButton";
import Background from "../../layouts/Background/Background";
import fondo from "../../assets/images/Fondo.png";
import "./RegistroCampeonato.css";

interface Campeonato {
    id: number;
    nombre: string;
    fechaInicio: string;
    fechaFin: string;
    categoria: string;
}

const tiposCampeonato = ["Novatos", "Semiprofesional", "Profesional"];

const RegistroCampeonato: React.FC = () => {
    const [campeonatos, setCampeonatos] = useState<Campeonato[]>([]);
    const [form, setForm] = useState<Campeonato>({ id: 0, nombre: '', fechaInicio: '', fechaFin: '', categoria: '' });
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!form.nombre || !form.fechaInicio || !form.fechaFin || !form.categoria) {
            alert('Todos los campos son obligatorios');
            return;
        }

        if (form.categoria === "Seleccione una Categoria") {
            alert('Por favor, seleccione una categoría válida');
            return;
        }

        if (isEditing) {
            setCampeonatos(campeonatos.map(c => c.id === form.id ? form : c));
        } else {
            setCampeonatos([...campeonatos, { ...form, id: Date.now() }]);
        }
        setForm({ id: 0, nombre: '', fechaInicio: '', fechaFin: '', categoria: '' });
        setIsEditing(false);
    };

    const handleEdit = (id: number) => {
        const campeonato = campeonatos.find(c => c.id === id);
        if (campeonato) {
            setForm(campeonato);
            setIsEditing(true);
        }
    };

    const handleDelete = (id: number) => {
        setCampeonatos(campeonatos.filter(c => c.id !== id));
    };

    return (
        <Background backgroundImage={fondo}>
            <div className="registro-campeonato">
                <div className="formulario">
                    <h2>{isEditing ? 'Modificar Campeonato' : 'Crear Campeonato'}</h2>
                    <label>Nombre</label>
                    <input name="nombre" value={form.nombre} onChange={handleChange} />
                    <label>Fecha de Inicio</label>
                    <input type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} />
                    <label>Fecha de Fin</label>
                    <input type="date" name="fechaFin" value={form.fechaFin} onChange={handleChange} />
                    <select name="categoria" value={form.categoria} onChange={handleSelectChange}>
                        <option value="">Seleccione una Categoria</option>
                        {tiposCampeonato.map(tipo => <option key={tipo} value={tipo}>{tipo}</option>)}
                    </select>
                    <div className="buttons-container-campeonato">
                        <CustomButton variant="primary" onClick={handleSubmit} text={isEditing ? 'Guardar Cambios' : 'Crear Campeonato'} />
                        <CustomButton variant="secondary" onClick={() => navigate("/home")} text="Volver a Inicio" />
                    </div>
                </div>

                <div className="listado-campeonatos">
                    <h2>Campeonatos Activos</h2>
                    {campeonatos.length === 0 ? <p>No hay campeonatos registrados</p> : (
                        <ul>
                            {campeonatos.map(c => (
                                <li key={c.id}>
                                    {c.nombre} - {c.fechaInicio} a {c.fechaFin}
                                    <button onClick={() => handleEdit(c.id)}>Editar</button>
                                    <button onClick={() => handleDelete(c.id)}>Eliminar</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </Background>

    );
};

export default RegistroCampeonato;