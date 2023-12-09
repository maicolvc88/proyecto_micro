const { Router } = require('express');
const  { 
    createProyecto,
    getProyectos, 
    updateProyecto, 
    getProyectoByID
} = require('../controllers/proyecto');

const router = Router();

/**
 * Obtiene todos 
 */
router.get('/', getProyectos);

/**
 * Obtiene por id
 */
router.get('/:id', getProyectoByID);

/**
 * Crear 
 */
router.post('/', createProyecto);

/**
 * Actualiza  por id
 */
router.put('/:id', updateProyecto);


module.exports = router;