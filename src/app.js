import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import yourRoutes from './routes/estebanquito.route.js';

config();
const app = express();

// Configuración de CORS para permitir solicitudes del frontend
app.use(cors({
    origin: 'http://localhost:5173', // URL del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true // Permitir envío de cookies y encabezados de autenticación
}));

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.set('port', PORT);

// Rutas

app.use('/api', yourRoutes); // Otras rutas prefijadas con /api

export default app;
