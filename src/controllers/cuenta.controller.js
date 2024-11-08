import { getConnection } from '../database/database.js';

export const getCuentaDetalles = async (req, res) => {
    try {
        const { usuarioId } = req.params;  // Obtener el usuarioId de los parámetros de la URL
        const connection = await getConnection();
        
        // Consulta para obtener los detalles de la cuenta del usuario
        const [result] = await connection.query(
            'SELECT * FROM Usuarios WHERE id = ?',  // Suponiendo que "id" es la columna que representa al usuario
            [usuarioId]
        );

        // Si el usuario tiene cuenta, devolver los detalles
        if (result.length > 0) {
            res.json(result[0]);  // Retorna el primer registro que coincida con el usuarioId
        } else {
            // Si no se encuentra el usuario, devolver un mensaje de error
            res.status(404).json({ message: "No se encontró la cuenta para este usuario." });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener detalles de la cuenta');
    }
};
