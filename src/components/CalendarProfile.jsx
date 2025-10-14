import { useState } from 'react'
import '../styles/CalendarProfile.css'

export default function CalendarProfile({ value, onDateChange, escala }) {
  const [currentDate, setCurrentDate] = useState(value || new Date());

  const generateDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const BackMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const NextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getWorkDaysMap = () => {
    if (!escala) return {};

    const workMap = {};
    const startDate = new Date(escala.data_inicio);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const diasMapeados = {
      'Dom': 0,
      'Seg': 1,
      'Ter': 2,
      'Qua': 3,
      'Qui': 4,
      'Sex': 5,
      'Sab': 6,
    };

    const usaDiasEspecificos =
      escala.usa_dias_especificos === true || escala.usa_dias_especificos === 'true';

    if (usaDiasEspecificos && Array.isArray(escala.dias_n_trabalhados_escala_semanal)) {
      console.log('✅ Usando dias da semana específicos');

      const diasFolga = escala.dias_n_trabalhados_escala_semanal.map(dia => diasMapeados[dia]);

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateKey = date.toISOString().split('T')[0]; // yyyy-mm-dd
        const dayOfWeek = date.getDay();

        workMap[dateKey] = diasFolga.includes(dayOfWeek) ? 'rest' : 'work';
      }

      return workMap;
    }

    // Lógica automática (NxM)
    console.log('📅 Usando ciclo automático (NxM)');
    const cycleLength = escala.dias_trabalhados + escala.dias_n_trabalhados;

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const diff = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));
      const dateKey = date.toISOString().split('T')[0];

      if (diff >= 0) {
        const cycleDay = diff % cycleLength;
        workMap[dateKey] = cycleDay < escala.dias_trabalhados ? 'work' : 'rest';
      }
    }

    return workMap;
  };



  const DaysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  const MonthNames = currentDate.toLocaleString("pt-BR", { month: "long" });
  const year = currentDate.getFullYear();
  const days = generateDays();
  const workDaysMap = getWorkDaysMap();

  return (
    <div className="calendar-container-profile">
      <div className="calendar-header-profile">
        <button className="nav-button-profile" onClick={BackMonth}>
          Voltar
        </button>
        <span className="header-content-profile">
          <span className="consultarDatas-profile">Consultar Datas:</span> {MonthNames} {year}
        </span>
        <button className="nav-button-profile" onClick={NextMonth}>
          Próximo
        </button>
      </div>

      <div className="calendar-grid-profile">
        {DaysOfWeek.map((day, index) => (
          <div className="days-of-week-profile" key={index}>
            {day}
          </div>
        ))}

        {days.map((day, index) => {
          const date =
            day != null ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null;
          const dateKey = date ? date.toISOString().split('T')[0] : null;
          const status = dateKey ? workDaysMap[dateKey] : null;

          return (
            <div
              key={index}
              className={`calendar-day-profile 
        ${status === 'work' ? 'work-day' : ''} 
        ${status === 'rest' ? 'rest-day' : ''}`}
              onClick={() =>
                day &&
                onDateChange(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
              }
            >
              {day}
            </div>
          );
        })}

      </div>
    </div>
  );
}



