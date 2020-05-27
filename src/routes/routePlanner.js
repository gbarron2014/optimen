const express = require('express');
const router = express.Router();
const controllerConfig = require('../controllers/planner/plr_controllerConfiguracion');
const controllerActividad = require('../controllers/planner/plr_controllerActividad');
const controllerAdminFlota = require('../controllers/planner/plr_controllerAdminFlota');
const controllerAdminRango = require('../controllers/planner/plr_controllerAdminRang');
const controllerEstadisticas = require('../controllers/planner/plr_controllerEstadisticas');
const controllerVerificacion = require('../controllers/planner/plr_controllerVerificacion');
const controllerPreasignacion = require('../controllers/planner/plr_controllerPreasignacion');


//Rutas de Configuración
router.get('/configuracion', controllerConfig.list);
router.post('/configuracion/add', controllerConfig.save1);
router.post('/configuracion/update/:idTemp', controllerConfig.update);
router.get('/configuracion/update/:idTemp', controllerConfig.edit);
router.get('/configuracion/adds', controllerConfig.tempo);

//Rutas de actividad
router.get('/actividad', controllerActividad.list);
router.post('/actividad/add', controllerActividad.save2);
router.get('/actividad/delete/:idAct', controllerActividad.delete);
router.get('/actividad/update/:idAct', controllerActividad.edit);
router.post('/actividad/update/:idAct', controllerActividad.update);

//Rutas de adminitración
//Rango
router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});
router.get('/administracion/rango',controllerAdminRango .list);
router.post('/administracion/rango/add',controllerAdminRango .save);
router.get('/administracion/rango/delete/:idRan',controllerAdminRango .delete);
router.get('/administracion/rango/update/:idRan',controllerAdminRango .update);
router.post('/administracion/rango/edit/:idRan',controllerAdminRango .edit);

//Flota
router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});
router.get('/administracion/flota',controllerAdminFlota.list);
router.post('/administracion/flota/add',controllerAdminFlota.save);
router.get('/administracion/flota/delete/:idFlota',controllerAdminFlota.delete);
router.get('/administracion/flota/update/:idFlota',controllerAdminFlota.update);
router.post('/administracion/flota/edit/:idFlota',controllerAdminFlota.edit);

//Rutas de estadistica
router.get('/estadisticas/', controllerEstadisticas.obtenerResumenFlota); //Pagina principal del modulo de estadisticas
router.get('/estadisticas/rango/', controllerEstadisticas.obtenerResumenRango);//Pagina para el filtro de Rango
router.get('/estadisticas/flota/', controllerEstadisticas.obtenerResumenFlota);//Pagina para el filtro de Flota
router.get('/estadisticas/rango/:mes/:id', controllerEstadisticas.detallesRango);//Obtener detalles para Rango
router.get('/estadisticas/flota/:mes/:id', controllerEstadisticas.detallesFlota);//Obtener detalles para Flota

//Rutas de Verificación
router.get('/', controllerVerificacion.render);
router.get('/verificacion/getdata/:numTrabajador', controllerVerificacion.data);
router.get('/verificacion/getCallen/:numTrabajador', controllerVerificacion.getCallen);
router.post('/verificacion/updateGantt/:estado/:id', controllerVerificacion.update);

//Rutas de preasignación
router.get('/preasignacion', controllerPreasignacion.list); 
router.post('/preasignacion/add', controllerPreasignacion.save3);
router.get('/preasignacion/delete/:idPre', controllerPreasignacion.delete);
router.get('/preasignacion/update/:idPre', controllerPreasignacion.edit);
router.post('/preasignacion/update/:idPre', controllerPreasignacion.update);
router.get('/actividad', controllerPreasignacion.list3);
router.post('/preasignacion', controllerPreasignacion.save1);


module.exports = router;