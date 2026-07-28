const tareas = require('./tareas/tareas');

const orderByPriority = (tareas) => {
  const priorityOrder = { alta: 1, media: 2, baja: 3 };
  //creo una copia del array de tareas para no modificar el original y luego lo ordeno según la prioridad
  return [...tareas].sort((a, b) => priorityOrder[a.prioridad] - priorityOrder[b.prioridad]);
}

const filterByComplited = (tareas) => {
  //filtro las tareas que no están completadas
  return [...tareas].filter(tarea => !tarea.completada && new Date(tarea.fecha_limite) < new Date());
}

const countByPriority = (tareas) => {
    return tareas.reduce((acc, tarea) => {
        acc [tarea.prioridad] += 1;
        return acc;
    }, {"alta": 0, "media": 0, "baja": 0});
}

const getSummary = (tareas) => {
    const total = tareas.length;
    const vencidas = filterByComplited(tareas).length;
    const por_prioridad = countByPriority(tareas);

    return {
        total,
        vencidas,
        por_prioridad
    }
}


console.log("Resumen de tareas:", getSummary(tareas));
