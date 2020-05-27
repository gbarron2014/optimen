const controller = {};
var consumidos = 0;
var disponibles = 0;
var consumidosTemp = 0;
var disponiblesTemp = 0;
/*
* Desarrollador: Antonio Garcia
* Parametros:  
* Descripcion: 
* Retorno: 
*/
controller.usu = (req, res) => {
    if (req.session.loggedin) {
        tipo = req.session.tipo
        res.render('prueva', { tipo });
    } else {
        res.redirect('/index');
    }
    res.end();
}
/*
* Desarrollador: Daniel Aguilar Cano 
* Parametros:  req, res
* Descripcion:  req usa la session y la destruye, res redirige al index
* Retorno: 
*/
controller.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

/*
* Desarrollador: Daniel Aguilar
* Parametros:  datos de la tabla solicitud
* Descripcion: Metodo que ejecuta la senetencia INSERT en la tabla Solicitud
* Retorno: 
*/
controller.save = (req, res) => {
    req.getConnection(async (err, conn) => {
        estado = req.body.estado
        var fechaInicio
        fechaInicio = req.body.fechaInicio
        var fechaFin
        fechaFin = req.body.fechaTermino
        var sesion
        sesion = req.session
        var id = sesion.numTrabajador
        var totales = sesion.diasVacaciones

        var fecha1 = new Date(fechaInicio);
        var fecha2 = new Date(fechaFin);
        fecha1.getTime();
        fecha2.getTime();
        var diff = fecha2 - fecha1;
        var usados = (diff / (1000 * 60 * 60 * 24));
        disponibles = totales - usados;
        consumidos = usados;
        if (usados > 2 && usados < 6) {
            await conn.query('INSERT INTO solicitud SET estado=?, fechaInicio=?, fechaTermino=?, numTrabajador=?', [estado, fechaInicio, fechaFin, id], (err) => {
                if (err) {
                    console.err('Error' + err);
                }
                res.redirect('/tripulante');
            });
        }
        consumidosTemp = consumidos;
        disponiblesTemp = disponibles;
        
    });
};

/*
* Desarrollador: Daniel Aguilar Cano 
* Parametros:  id de la session equivale al numTrabajador
* Descripcion: Metodo que optiene los datos de la seción y los proyecta en el aside de la vista
* Retorno: datos del tripulante
*/
controller.datosPerfil = (req, res) => {
    if (req.session.loggedin) {
        req.getConnection(async (err, conn) => {

            var sesion
            sesion = req.session
            var d1 = sesion.numTrabajador;

            var nombre = sesion.nombre;
            var ap1 = sesion.apePat;
            var ap2 = sesion.apeMat;
            var d2 = nombre + ' ' + ap1 + ' ' + ap2;

            var d3 = sesion.puesto;
            var d4 = sesion.seniority;
            var d5 = sesion.rango;
            var d6 = sesion.flota;
            var d7 = sesion.email;
            var d8 = sesion.diasVacaciones;
            var d9 = consumidos;
            var d10 = disponibles;

            let perfil = [d1, d2, d3, d4, d5, d6, d7, d8, d9, d10];
            console.log(perfil);
            res.render('tripulante/tr_viewSolicitudes', { perfil });
        });
    } else {
        res.redirect("/");
    }
};

/*
* Desarrollador: Ramiro Torres
* Parametros:  FechaInicio FechaTermino y id de la solicitud  
* Descripcion: Metodo que ejecuta la senetncia UPDATE en la tabla Solicitud
* Retorno: 
*/
controller.update = (req, res) => {
    req.getConnection(async (err, conn) => {
        var id = req.body.id
        var start = req.body.start
        var end = req.body.end
        await conn.query('UPDATE `solicitud` SET fechaInicio=?, fechaTermino=? where idSoli=?', [start, end, id], (err, solicitud) => {
            res.redirect('/');
        });
    });
};
/*
* Desarrollador: Daniel Aguilar
* Parametros:  id de la session equivale al numTrabajador
* Descripcion: Metodo que ejecuta un consulta en la tabla Solicitud restringida por el numTrabajador
* Retorno: solicitudes del mismo tripulante
*/
controller.select = (req, res) => {
    req.getConnection(async (err, conn) => {
        var sesion
        sesion = req.session
        var id = sesion.numTrabajador
        await conn.query('SELECT id, title, start, end, color FROM gantt WHERE numTrabajador = ?', [id], (err, solicitudes) => {
            if (err) {
                res.json(err);
            } else {
                res.send(solicitudes);
            }

        });
    });
};
controller.selectDefault = (req, res) => {
    req.getConnection(async (err, conn) => {
        var sesion
        sesion = req.session
        var id = sesion.numTrabajador
        await conn.query('SELECT NombreTrip, fechaIncio,fechaTermino', [id], (err, eventos) => {


        });

    });
};
/*
* Desarrollador: Daniel Aguilar
* Parametros:  id de la solicitud
* Descripcion: Metodo que ejecuta un DELETE en la base da datos eliminando una solicitud usa id como parametro 
* Retorno: 
*/
controller.delete = (req, res) => {
    req.getConnection(async (err, conn) => {
        var id = req.body.value
        await conn.query('DELETE FROM `solicitud` WHERE  `idSoli`= ?', [id], (err, borrado) => {
            console.log(id);
            res.redirect('/');
        });
    });
};

module.exports = controller;