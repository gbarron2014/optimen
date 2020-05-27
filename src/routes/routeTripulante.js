const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllerTripulante');

router.get('/getGantt',controller.select);
router.get('/',controller.datosPerfil);
router.post('/saveGantt',controller.save);
router.post('/updateGantt',controller.update);
router.post('/deleteGantt',controller.delete);
router.post('/logout',controller.logout);

module.exports=router;