import { getConnection } from '../database/database.js';


export const registrarTransaccion = async (req, res) => {
    const { cuenta_id, tipo, monto } = req.body;

    // Validaciones
    if (!['retiro', 'deposito'].includes(tipo)) {
        return res.status(400).send('Tipo de transacción inválido');
    }
    if (monto <= 0) {
        return res.status(400).send('El monto debe ser mayor que cero');
    }

    const connection = await getConnection();
    try {
        await connection.beginTransaction();

        await connection.query(
            `INSERT INTO transacciones (cuenta_id, tipo, monto, fecha) VALUES (?, ?, ?, NOW())`,
            [cuenta_id, tipo, monto]
        );

        // Actualizar saldo de la cuenta
        const saldoChange = tipo === 'retiro' ? -monto : monto;
        await connection.query(
            `UPDATE usuarios SET saldo = saldo + ? WHERE id = ?`,
            [saldoChange, cuenta_id]
        );

        await connection.commit();
        res.status(201).send('Transacción registrada');
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).send('Error al registrar transacción');
    } finally {
        connection.release();
    }
};
