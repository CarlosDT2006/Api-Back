import { getConnection } from '../database/database.js';

export const registerUsuario = async (req, res) => {
    try {
        const { nombre, email, contraseña, cuenta_id, tipo, saldo } = req.body;
        const connection = await getConnection();
        const result = await connection.query(
            `INSERT INTO usuarios (nombre, email, contraseña, cuenta_id, tipo, saldo) VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre, email, contraseña, cuenta_id, tipo, saldo]
        );
        res.status(201).json({ message: 'Usuario registrado', usuarioId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el registro');
    }
};

export const loginUsuario = async (req, res) => {
    try {
        const { email, contraseña } = req.body;
        const connection = await getConnection();
        const [result] = await connection.query(
            `SELECT id FROM usuarios WHERE email = ? AND contraseña = ?`,
            [email, contraseña]
        );
        
        if (result.length > 0) {
            const usuarioId = result[0].id;
            res.status(200).json({
                message: 'Inicio de sesión exitoso',
                usuarioId
            });
        } else {
            res.status(404).json({ message: 'No se ha encontrado el usuario. Por favor, revisa tus credenciales.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al iniciar sesión');
    }
};
