import React, { useState } from 'react';
import './Calendar.css';

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const daysOfWeek = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];

const Calendar: React.FC = () => {
  const today = new Date();
  const todayMidnight = new Date(
    today.getFullYear(), today.getMonth(), today.getDate()
  ).getTime();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(prev => prev - 1);
      } else {
        setCurrentMonth(prev => prev - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(prev => prev + 1);
      } else {
        setCurrentMonth(prev => prev + 1);
      }
    }
  };

  const handleYearChange = (increment: number) => {
    setCurrentYear(prev => prev + increment);
  };

  const renderCalendarGrid = () => {
    const cells: React.ReactNode[] = [];

    for (let i = 0; i < firstDayIndex; i++) {
      cells.push(<div key={`empty-start-${i}`} className="calendar-day empty" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const thisDate = new Date(currentYear, currentMonth, day);
      const isPast = thisDate.getTime() < todayMidnight;
      const isSelected = selectedDate &&
        thisDate.toDateString() === selectedDate.toDateString();

      let classNames = 'calendar-day';
      if (isPast) classNames += ' past-day';
      if (isSelected && !isPast) classNames += ' selected-day';

      cells.push(
        <div
          key={`day-${day}`}
          className={classNames}
          onClick={() => {
            if (!isPast) {
              setSelectedDate(thisDate);
            }
          }}
        >
          {day}
        </div>
      );
    }

    while (cells.length % 7 !== 0) {
      cells.push(<div key={`empty-end-${cells.length}`} className="calendar-day empty" />);
    }

    const rows: React.ReactNode[] = [];
    for (let i = 0; i < cells.length; i += 7) {
      rows.push(
        <div key={`row-${i/7}`} className="calendar-row">
          {cells.slice(i, i + 7)}
        </div>
      );
    }

    return rows;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button onClick={() => handleYearChange(-1)}>«</button>
          <button onClick={() => handleMonthChange('prev')}>‹</button>
          <span>{monthNames[currentMonth]} {currentYear}</span>
          <button onClick={() => handleMonthChange('next')}>›</button>
          <button onClick={() => handleYearChange(1)}>»</button>
        </div>
      </div>
      <div className="calendar-grid">
        <div className="calendar-row">
          {daysOfWeek.map((d, idx) => (
            <div key={idx} className="calendar-day-header">{d}</div>
          ))}
        </div>
        {renderCalendarGrid()}
      </div>
    </div>
  );
};

export default Calendar;
