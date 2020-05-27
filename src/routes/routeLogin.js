
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/controllerLogin');
const controllerRegistro = require('../controllers/controllerRegistro');


router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});
/**
 * Rutas del login
 */

router.get('/', loginController.list); //Pagina inicial del login
router.post('/', loginController.values);
router.get('/logout', loginController.logout);
/**
 * Rutas del registro
 */
router.get('/registro', controllerRegistro.listRegistro);
router.post('/add', controllerRegistro.saveRegistro);

module.exports = router;