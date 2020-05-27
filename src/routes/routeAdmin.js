const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/admin/adm_usuarioController');
const logUserController = require('../controllers/admin/adm_logUserController');


//Rutas de Log Usuario
router.get('/', logUserController.list);
//Rutas de Control de Usuario
router.get('/adm_viewControlUsuarios', usuarioController.list); //Pagina inicial de usuario
//Los dos puntos antes de "id" son porque le estamos dando a entender que recibira un parametro con el nombre id
router.get('/rechazar/:numTrabajador', usuarioController.rechazar); //Ejecuta el metodo rechazar y redirecciona a la página inicial
//Los dos puntos antes de "id" son porque le estamos dando a entender que recibira un parametro con el nombre id
router.get('/aceptar/:numTrabajador', usuarioController.aceptar); //Ejecuta el metodo aceptar y redirecciona a la página inicial




module.exports = router;