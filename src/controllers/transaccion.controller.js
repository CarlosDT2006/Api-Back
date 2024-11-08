import { getConnection } from '../database/database.js';

// Función para registrar depósitos y retiros
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

        // Verificar si la cuenta existe en `usuarios`
        const [usuario] = await connection.query(
            `SELECT id FROM usuarios WHERE id = ?`,
            [cuenta_id]
        );
        if (usuario.length === 0) {
            return res.status(400).send('La cuenta especificada no existe');
        }

        // Registrar la transacción
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

// Función para realizar una transferencia entre dos cuentas
export const realizarTransferencia = async (req, res) => {
    const { fromAccount, toAccount, amount } = req.body;

    // Validaciones
    if (amount <= 0) {
        return res.status(400).send('El monto debe ser mayor que cero');
    }

    const connection = await getConnection();
    try {
        await connection.beginTransaction();

        // Verificar que ambas cuentas existen
        const [cuentaOrigen] = await connection.query(
            `SELECT id, saldo FROM usuarios WHERE id = ?`,
            [fromAccount]
        );
        if (cuentaOrigen.length === 0) {
            return res.status(400).send('La cuenta de origen no existe');
        }

        const [cuentaDestino] = await connection.query(
            `SELECT id FROM usuarios WHERE id = ?`,
            [toAccount]
        );
        if (cuentaDestino.length === 0) {
            return res.status(400).send('La cuenta de destino no existe');
        }

        // Verificar saldo suficiente en cuenta de origen
        if (cuentaOrigen[0].saldo < amount) {
            return res.status(400).send('Saldo insuficiente en la cuenta de origen');
        }

        // Registrar el retiro en la cuenta de origen
        await connection.query(
            `INSERT INTO transacciones (cuenta_id, tipo, monto, fecha) VALUES (?, 'retiro', ?, NOW())`,
            [fromAccount, amount]
        );
        await connection.query(
            `UPDATE usuarios SET saldo = saldo - ? WHERE id = ?`,
            [amount, fromAccount]
        );

        // Registrar el depósito en la cuenta de destino
        await connection.query(
            `INSERT INTO transacciones (cuenta_id, tipo, monto, fecha) VALUES (?, 'deposito', ?, NOW())`,
            [toAccount, amount]
        );
        await connection.query(
            `UPDATE usuarios SET saldo = saldo + ? WHERE id = ?`,
            [amount, toAccount]
        );

        await connection.commit();
        res.status(201).send('Transferencia realizada con éxito');
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).send('Error al realizar la transferencia');
    } finally {
        connection.release();
    }
};

// Función para obtener el historial de transacciones
export const obtenerTransacciones = async (req, res) => {
    const connection = await getConnection();

    try {
        // Obtener todas las transacciones de la tabla `transacciones`
        const [transacciones] = await connection.query(`SELECT * FROM transacciones`);

        // Enviar las transacciones como respuesta JSON
        res.json(transacciones);
    } catch (error) {
        console.error("Error al obtener transacciones:", error);
        res.status(500).json({ message: 'Error al obtener las transacciones' });
    } finally {
        // Liberar la conexión después de completar la operación
        connection.release();
    }
};

export const obtenerTransaccionesPorUsuario = async (req, res) => {
    const { usuarioId } = req.params; // Asegúrate de pasar user_id como parámetro
  
    try {
      const connection = await getConnection();
  
      const [transacciones] = await connection.query(
        `SELECT * FROM transacciones WHERE cuenta_id = ?`, // Ajusta según tu base de datos
        [usuarioId]
      );
  
      res.json(transacciones);
    } catch (error) {
      console.error("Error al obtener transacciones:", error);
      res.status(500).json({ message: 'Error al obtener las transacciones' });
    }
  };

