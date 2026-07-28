const express = require("express");
const app = express();
app.use(express.json());

const tareas = require('../tareas/tareas');



app.get("/tareas", (req, res) => {
    
    const {prioridad}  = req.query;
    const {completada} = req.query;
    
    console.log("Prioridad recibida:", JSON.stringify(prioridad));
    
    let resultado = tareas;
    
    
    if (prioridad) {
        resultado = resultado.filter(tarea => tarea.prioridad === prioridad);
    }
    if (completada) {
        const completadaBool = completada === 'true';
        resultado = resultado.filter(tarea => tarea.completada === completadaBool);
    }
    
    console.log("Resultado filtrado:", resultado.length); 
    
    res.json(resultado);
    
});


app.post("/tareas", (req, res) => {
    const { titulo, prioridad, fecha_limite } = req.body;
    
    if (!titulo || !prioridad || !fecha_limite) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    
    const nuevaTarea = {
        id: tareas.length + 1,
        titulo,
        prioridad,
        fecha_limite,
        completada: false
    };
    
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

app.put("/tareas/:id/completar", (req, res) => {
    const { id } = req.params;
    
    const tarea = tareas.find(t => t.id === Number(id));
    
    if (!tarea) {
        return res.status(404).json({ error: "Tarea no encontrada" });
    }
    
    tarea.completada = true;
    res.json(tarea);
});

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});