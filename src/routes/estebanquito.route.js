import { Router } from "express";
import { metodosEstebanquito } from "../controllers/estebanquito.controller.js";


const router = Router();

router.get("/transacciones", metodosEstebanquito.getTransacciones)
router.get("/reportes", metodosEstebanquito.getReportes)
router.get("/prestamos", metodosEstebanquito.getPrestamos)
router.get("/usuarios", metodosEstebanquito.getUsuarios)


export default router;