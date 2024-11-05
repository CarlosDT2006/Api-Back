import { getConnection } from '../database/database.js';

export const getTransacciones = async (req, res) => {

    try {

        const connection = await getConnection()
        const result = await connection.query('SELECT * FROM plataformabancaestebanquito.transacciones');
        res.json(result[0]);



    } catch (error) {

        console.log(error)
        res.status(500)

    }
};

export const getPrestamos = async (req, res) => {

    try {

        const connection = await getConnection()
        const result = await connection.query('SELECT * FROM plataformabancaestebanquito.prestamos');
        res.json(result[0]);



    } catch (error) {

        console.log(error)
        res.status(500)

    }
};

export const getReportes = async (req, res) => {

    try {

        const connection = await getConnection()
        const result = await connection.query('SELECT * FROM plataformabancaestebanquito.reportes');
        res.json(result[0]);



    } catch (error) {

        console.log(error)
        res.status(500)

    }
};

export const getUsuarios = async (req, res) => {

    try {

        const connection = await getConnection()
        const result = await connection.query('SELECT * FROM plataformabancaestebanquito.usuarios');
        res.json(result[0]);



    } catch (error) {

        console.log(error)
        res.status(500)

    }
};




export const metodosEstebanquito = {

    getTransacciones,
    getPrestamos,
    getReportes,
    getUsuarios

}