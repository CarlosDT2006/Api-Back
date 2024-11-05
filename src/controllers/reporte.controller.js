import { getConnection } from '../database/database.js';

export const getReporteFinanciero = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const connection = await getConnection();

        // Obtener ingresos y egresos
        const [ingresos] = await connection.query(
            `SELECT SUM(monto) AS total_ingresos FROM transacciones WHERE cuenta_id = ? AND tipo = 'depósito'`,
            [usuarioId]
        );
        const [egresos] = await connection.query(
            `SELECT SUM(monto) AS total_egresos FROM transacciones WHERE cuenta_id = ? AND tipo = 'retiro'`,
            [usuarioId]
        );

        // Obtener deudas
        const [deudas] = await connection.query(
            `SELECT SUM(monto) AS total_deudas FROM prestamos WHERE usuario_id = ? AND estado = 'pendiente'`,
            [usuarioId]
        );

        res.json({
            ingresos: ingresos[0].total_ingresos || 0,
            egresos: egresos[0].total_egresos || 0,
            deudas: deudas[0].total_deudas || 0,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al generar reporte');
    }
};
