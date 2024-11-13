// db.js
const { Pool } = require('pg');

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'lucero_tad',       // Reemplaza con tu usuario de PostgreSQL
  host: 'dpg-csqcsibv2p9s73b4n5t0-a.oregon-postgres.render.com',        // Usualmente localhost
  database: 'task_manager_db_378t', // Nombre de la base de datos
  password: '2pjtQkNbNctKDnMUPRYjvj7vwpLHev5r',// Reemplaza con tu contraseña de PostgreSQL
  port: 5432,               // Puerto de PostgreSQL
  ssl: {
    rejectUnauthorized: false // Asegúrate de que la conexión esté usando SSL
  }
});

// Intentar la conexión
pool.connect()
    .then(client => {
        console.log("Conexión exitosa a la base de datos PostgreSQL!");
        client.release(); // Liberar la conexión después de la prueba
    })
    .catch(err => {
        console.error('Error de conexión:', err.message);
    })
    .finally(() => {
        pool.end(); // Finalizar la conexión
    });
