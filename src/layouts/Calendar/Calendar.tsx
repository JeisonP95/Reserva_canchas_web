import React, { useState } from 'react';
import './Calendar.css';
// Componente de Calendario
const Calendar: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(18);

  // Días de la semana en español
  const daysOfWeek = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];

  // Generar dias para Enero
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Crear grid del calendario
  const renderCalendarGrid = () => {
    const rows: React.ReactNode[] = [];
    let cells: React.ReactNode[] = [];

    // Añadir encabezado con dias de la semana
    const headerCells = daysOfWeek.map((day, index) => (
      <div key={`header-${index}`} className="calendar-day-header">
        {day}
      </div>
    ));

    rows.push(
      <div key="header" className="calendar-row">
        {headerCells}
      </div>
    );

    // Añadir celdas de dias
    days.forEach((day, index) => {
      const isSelected = day === selectedDay;

      cells.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${isSelected ? 'selected-day' : ''}`}
          onClick={() => setSelectedDay(day)}
        >
          {day}
        </div>
      );

      // Crear una nueva fila para cada semana
      if ((index + 1) % 7 === 0 || index === days.length - 1) {
        // Rellenar celdas restantes si es necesario
        while (cells.length % 7 !== 0) {
          cells.push(
            <div key={`empty-${cells.length}`} className="calendar-day empty"></div>
          );
        }

        rows.push(
          <div key={`row-${Math.floor(index / 7)}`} className="calendar-row">
            {cells}
          </div>
        );
        cells = [];
      }
    });

    return rows;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>ENERO</h2>
      </div>
      <div className="calendar-grid">
        {renderCalendarGrid()}
      </div>
    </div>
  );
};

export default Calendar;