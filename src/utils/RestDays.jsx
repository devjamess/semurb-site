
export function getRestDayDisplay(scale) {
  if (!scale) return 'N/A';

  // Se tem dias específicos de folga definidos
  if (Array.isArray(scale.dias_n_trabalhados_escala_semanal) && 
      scale.dias_n_trabalhados_escala_semanal.length > 0) {
    return scale.dias_n_trabalhados_escala_semanal.join(', ');
  }

  // Se é ciclo automático (NxM), calcular os dias de folga
  if (scale.dias_trabalhados !== undefined && 
      scale.dias_n_trabalhados !== undefined && 
      scale.data_inicio) {
    
    const restDays = calculateRestDaysFromCycle(
      scale.data_inicio,
      scale.dias_trabalhados,
      scale.dias_n_trabalhados
    );
    
    if (restDays.length > 0) {
      return restDays.join(', ');
    }
  }

  return 'N/A';
}

// Calcula quais dias da semana são folgas baseado no ciclo
function calculateRestDaysFromCycle(startDateStr, diasTrabalhados, diasFolga) {
  const DaysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  const startDate = new Date(startDateStr);
  const cycleLength = diasTrabalhados + diasFolga;
  
  // Analisar próximos 30 dias para encontrar padrão de folgas
  const restDaysSet = new Set();
  
  for (let i = 0; i < 30; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);
    
    const positionInCycle = i % cycleLength;
    
    // Se está na posição de folga do ciclo
    if (positionInCycle >= diasTrabalhados) {
      const dayOfWeek = currentDate.getDay();
      restDaysSet.add(DaysOfWeek[dayOfWeek]);
    }
  }
  
  // Retornar em ordem (segunda a domingo)
  const orderMap = { 'Seg': 1, 'Ter': 2, 'Qua': 3, 'Qui': 4, 'Sex': 5, 'Sab': 6, 'Dom': 0 };
  return Array.from(restDaysSet).sort((a, b) => orderMap[a] - orderMap[b]);
}

// Você pode adicionar mais funções utilitárias de escala aqui
export function calculateCycleLength(scale) {
  if (!scale.dias_trabalhados || !scale.dias_n_trabalhados) return 0;
  return scale.dias_trabalhados + scale.dias_n_trabalhados;
}