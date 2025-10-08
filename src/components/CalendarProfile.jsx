import {useState} from 'react'
import '../styles/CalendarProfile.css'

export default function CalendarProfile ({ value, onDateChange, escala }) {
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

  if (escala.usa_dias_especificos && Array.isArray(escala.dias_n_trabalhados_escala_semanal)) {
    const diasFolga = escala.dias_n_trabalhados_escala_semanal.map(dia => diasMapeados[dia]);

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay(); // 0-6 (Dom-Sab)

      if (diasFolga.includes(dayOfWeek)) {
        workMap[day] = "rest";
      } else {
        workMap[day] = "work";
      }
    }
  }

  // Caso 1: Escalas baseadas em dias (NxM)
  else if (escala.dias_trabalhados && escala.dias_n_trabalhados) {
    const cycleLength = escala.dias_trabalhados + escala.dias_n_trabalhados;

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const diff = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));

      if (diff >= 0) {
        const cycleDay = diff % cycleLength;
        if (cycleDay < escala.dias_trabalhados) {
          workMap[day] = "work";
        } else {
          workMap[day] = "rest";
        }
      }
    }
  }

  // Caso 2: Escalas em horas (12x36, 24x48)
  else if (escala.tipo_escala === "24x48" || escala.tipo_escala === "12x36") {
    let cycleLength = escala.tipo_escala === "24x48" ? 72 : 48; // em horas
    let workHours = escala.tipo_escala === "24x48" ? 24 : 12;

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const diffHours = Math.floor((date - startDate) / (1000 * 60 * 60));

      if (diffHours >= 0) {
        const cycleHour = diffHours % cycleLength;
        if (cycleHour < workHours) {
          workMap[day] = "work";
        } else {
          workMap[day] = "rest";
        }
      }
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

        {days.map((day, index) => (
          <div
            key={index}
            className={`calendar-day-profile 
              ${workDaysMap[day] === "work" ? "work-day" : ""} 
              ${workDaysMap[day] === "rest" ? "rest-day" : ""}`}
            onClick={() =>
              day &&
              onDateChange(
                new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
              )
            }
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}



