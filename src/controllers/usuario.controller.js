import { getConnection } from '../database/database.js';

export const registerUsuario = async (req, res) => {
    try {
        const { nombre, email, contraseña, numero_cuenta, tipo, saldo } = req.body;
        const connection = await getConnection();
        const result = await connection.query(
            `INSERT INTO usuarios (nombre, email, contraseña, numero_cuenta, tipo, saldo) VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre, email, contraseña, numero_cuenta, tipo, saldo]
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
            `SELECT * FROM usuarios WHERE email = ? AND contraseña = ?`,
            [email, contraseña]
        );
        if (result.length > 0) {
            res.status(200).json({ message: 'Inicio de sesión exitoso', usuario: result[0] });
        } else {
            res.status(401).send('Credenciales inválidas');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al iniciar sesión');
    }
};
