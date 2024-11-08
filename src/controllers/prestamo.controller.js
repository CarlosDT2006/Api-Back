import { getConnection } from "../database/database.js";

export const solicitarPrestamo = async (req, res) => {
    const { usuario_id, monto, plazo } = req.body;

    // Validaciones
    if (!usuario_id) {
        return res.status(400).send("El ID de usuario es obligatorio.");
    }
    if (!monto || monto <= 0) {
        return res.status(400).send("El monto debe ser mayor a cero.");
    }
    if (!plazo || plazo <= 0) {
        return res.status(400).send("El plazo debe ser mayor a cero.");
    }

    const connection = await getConnection();
    try {
        // Inserta la solicitud de préstamo en la base de datos
        await connection.query(
            `INSERT INTO prestamos (usuario_id, monto, plazo, estado, fecha_solicitud) VALUES (?, ?, ?, 'pendiente', NOW())`,
            [usuario_id, monto, plazo]
        );

        res.status(200).send("Solicitud de préstamo registrada exitosamente");
    } catch (error) {
        console.error("Error al solicitar préstamo:", error);
        res.status(500).send("Error al registrar la solicitud de préstamo");
    } finally {
        connection.release();
    }
};
