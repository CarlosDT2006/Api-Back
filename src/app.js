import express from 'express';
import { config } from 'dotenv';
import yourRoutes from './routes/estebanquito.route.js';

config();
const app = express();

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.set('port', PORT);

// Rutas
app.use('/api', yourRoutes); // Todas las rutas estarán prefijadas con /api

export default app;
