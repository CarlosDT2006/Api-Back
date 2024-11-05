import { getConnection } from '../database/database.js';

export const getCuentaDetalles = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const connection = await getConnection();
        const [result] = await connection.query(
            'SELECT * FROM usuarios WHERE id = ?',
            [usuarioId]
        );
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener detalles de la cuenta');
    }
};
