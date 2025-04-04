import React from "react";
import { FilterOptions } from "../../types/financial";

interface FilterControlsProps {
    filters: FilterOptions
    onFilterChange: (filters: FilterOptions) => void
  }

const FilterControls: React.FC<FilterControlsProps> = ({filters, onFilterChange}) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        if (name === "startDate" || name === "endDate") {
            onFilterChange({
                ...filters,
                [name]: value ? new Date(value) : null,
            })
        } else {
            onFilterChange({
                ...filters,
                [name]: value,
            })
        }
    }

    const resetFilters = () => {
        onFilterChange({
            startDate: null,
            endDate: null,
            type: "all",
            minAmount: "",
            maxAmount: "",
        })
    }

    return (
        <div className="filter-controls">
            <h3>Filtros</h3>

            <div className="filter-form">
                <div className="filter-group">
                    <label htmlFor="startDate">Desde</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={filters.startDate ? filters.startDate.toISOString().split("T")[0] : ""}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="endDate">Hasta</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={filters.endDate ? filters.endDate.toISOString().split("T")[0] : ""}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="type">Tipo</label>
                    <select id="type" name="type" value={filters.type} onChange={handleInputChange}>
                        <option value="all">Todos</option>
                        <option value="income">Ingresos</option>
                        <option value="expense">Egresos</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="minAmount">Monto Mínimo</label>
                    <input
                        type="number"
                        id="minAmount"
                        name="minAmount"
                        value={filters.minAmount}
                        onChange={handleInputChange}
                        min="0"
                        step="1000"
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="maxAmount">Monto Máximo</label>
                    <input
                        type="number"
                        id="maxAmount"
                        name="maxAmount"
                        value={filters.maxAmount}
                        onChange={handleInputChange}
                        min="0"
                        step="1000"
                    />
                </div>

                <button className="reset-button" onClick={resetFilters}>
                    Limpiar Filtros
                </button>
            </div>
        </div>
    );
}

export default FilterControls;
