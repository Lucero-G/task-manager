// routes/tasks.js
const express = require('express');
const pool = require('../db');  // Importa la conexión a PostgreSQL
const router = express.Router();

// 1. Obtener todas las tareas (READ)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    res.status(200).json(result.rows); // Devuelve las tareas en formato JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
});

// 2. Crear una nueva tarea (CREATE)
router.post('/', async (req, res) => {
  const { title, description, status, due_date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, status, due_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, status, due_date]
    );
    res.status(201).json(result.rows[0]); // Devuelve la tarea recién creada
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
});

// 3. Actualizar una tarea (UPDATE)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status, due_date } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, status = $3, due_date = $4 WHERE id = $5 RETURNING *',
      [title, description, status, due_date, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]); // Devuelve la tarea actualizada
    } else {
      res.status(404).json({ error: 'Tarea no encontrada' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
});

// 4. Eliminar una tarea (DELETE)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Tarea eliminada' });
    } else {
      res.status(404).json({ error: 'Tarea no encontrada' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
});

module.exports = router;