import mysql from 'mysql2/promise';
import config from '../config.js';

// Crear un pool de conexiones
const pool = mysql.createPool({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    port: config.dbPort,
});

// Función para obtener una conexión del pool
const getConnection = async () => {
    return await pool.getConnection();
};

export { getConnection };
