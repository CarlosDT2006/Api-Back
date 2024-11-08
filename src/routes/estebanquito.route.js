import { Router } from 'express';
import { registerUsuario, loginUsuario } from '../controllers/usuario.controller.js';
import { getCuentaDetalles } from '../controllers/cuenta.controller.js';
import { registrarTransaccion, realizarTransferencia,obtenerTransaccionesPorUsuario } from '../controllers/transaccion.controller.js';
import { solicitarPrestamo } from '../controllers/prestamo.controller.js';
import { getDeudasUsuario, getReporteFinanciero } from '../controllers/reporte.controller.js';

const router = Router();

// Usuarios
router.post('/usuarios/registro', registerUsuario);
router.post('/usuarios/login', loginUsuario);

// Cuentas  
router.get('/cuentas/:usuarioId', getCuentaDetalles);

// Transacciones
router.post('/transacciones', registrarTransaccion);
// router.get('/transacciones', obtenerTransacciones);
router.get('/transacciones/:usuarioId', obtenerTransaccionesPorUsuario);

// Ruta para transferencias
router.post('/transferencia', realizarTransferencia);

// Préstamos
router.post('/prestamos', solicitarPrestamo);

// Reportes
router.get('/reportes/:usuarioId', getReporteFinanciero);

//Deudas
router.get('/reportes/deudas/:usuarioId', getDeudasUsuario);


export default router;
