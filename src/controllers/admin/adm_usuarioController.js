const controller = {};

/**
* Desarrollador: Cesar Alberto GarcÃ­a Aranda
*   Parametros: req, almacena la conexión con la base de datos.
*               res, respuesta al ejecutar una sentencia query.   
*Función que se encarga de listar todos los elementos de la tabla usuario, Flota, Puesto, y Rango
*/
controller.list = (req, res) => {
    if(req.session.loggedin){
    req.getConnection(async (err, conn) => {
        await conn.query('SELECT flota.Flota, puesto.Puesto, rango.Rango,usuario.numTrabajador,usuario.Nombre,usuario.apePaterno,usuario.apeMaterno,usuario.estado,usuario.email FROM (((usuario INNER JOIN flota ON usuario.idFlota = flota.idFlota) INNER JOIN rango ON usuario.idRan = rango.idRan) INNER JOIN puesto ON usuario.idPues = puesto.idPues) Where estado= "Pendiente";', (err, usuarios) => {
            if (err) {
                res.json(err);
            }
            res.render('admin/adm_viewControlUsuarios', {
                datos: usuarios
            });
        });
    });
}else{
    res.redirect('/');
}
}

/**
* Desarrollador: Cesar Alberto GarcÃ­a Aranda
*   Parametros: req, almacena la conexión con la base de datos.
*               res, respuesta al ejecutar una sentencia query.   
*Función que se encarga de hcaer un update en la tabla usuario en el campo de estado hacia "Rechazado"
*/

controller.rechazar = (req, res) => {
    req.getConnection(async (err, conn) => {
        const { numTrabajador } = req.params; //Interpretamos los datos "id" recibidos desde "usuario.js"
        await req.getConnection((err, conn) => {
            conn.query('UPDATE usuario set estado="Rechazado" WHERE numTrabajador = ?', [numTrabajador], (err, bdres) => {
                if (err) {
                    res.send('Error al eliminar');
                    
                }
                res.redirect('/admin/adm_viewControlUsuarios');
            });
        });
    });
}


/**
* Desarrollador: Cesar Alberto GarcÃ­a Aranda
*   Parametros: req, almacena la conexión con la base de datos.
*               res, respuesta al ejecutar una sentencia query.   
*Función que se encarga de hcaer un update en la tabla usuario en el campo de estado hacia "Aceptado"
*/

controller.aceptar = (req, res) => {
    req.getConnection(async (err, conn) => {
        const { numTrabajador } = req.params; //Interpretamos los datos "id" recibidos desde "usuario.js"
        await req.getConnection((err, conn) => {
            conn.query('UPDATE usuario set estado="Aceptado" WHERE numTrabajador = ?', [numTrabajador], (err, bdres) => {
                if (err) {
                    res.send('Error al Aceptar');
                    
                }
                res.redirect('/admin/adm_viewControlUsuarios');
            });
        });
    });
}

module.exports = controller;