import { getConnection } from '../database/database.js';

export const solicitarPrestamo = async (req, res) => {
    try {
        const { usuario_id, monto, plazo } = req.body;
        const connection = await getConnection();
        await connection.query(
            `INSERT INTO prestamos (usuario_id, monto, plazo, estado, fecha_solicitud) VALUES (?, ?, ?, 'pendiente', NOW())`,
            [usuario_id, monto, plazo]
        );
        res.status(201).send('Préstamo solicitado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al solicitar préstamo');
    }
};
