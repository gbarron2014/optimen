const controller = {};

/**
 * Autor: Alan Eduardo Herrera Alvarado
 * Funcion de prueba para los datos del rango
 */
controller.obtenerResumenRango = (req, res) => {
    if (req.session.loggedin) {
        req.getConnection(async (err, conn) => {
            await conn.query('SELECT R.idRan as IDRango, R.rango as Rango FROM rango as R', (err, Rangos) => {
                if (err) {
                    res.json(err);
                }

                var datosRang = Rangos;

                if (conn) {
                    conn.query('SELECT R.idRan as IDRango, R.rango as Rango, COUNT(S.numTrabajador) as Cantidad, MONTHNAME(fechaInicio) as Mes FROM solicitud as S INNER JOIN usuario as U INNER JOIN rango as R on R.idRan = U.idRan and U.numTrabajador = S.numTrabajador GROUP BY IDRango, Rango, Mes', (errRang, Conteo) => {
                        var datosRCont = Conteo;

                        var infoRan1 = [];

                        for (var i = 0; i < datosRang.length; i++) {
                            let infoRan = datosRCont.filter(function (rango) {
                                return rango.IDRango == datosRang[i].IDRango;
                            }).map(function (rango) {
                                return { ID: datosRang[i].IDRango, Nombre: datosRang[i].Rango, Mes: rango.Mes, Cantidad: rango.Cantidad };
                            });
                            infoRan1.push(infoRan);
                        }

                        console.log(infoRan1);

                        var m1 = 0, m2 = 0, m3 = 0, m4 = 0, m5 = 0, m6 = 0, m7 = 0, m8 = 0, m9 = 0, m10 = 0, m11 = 0, m12 = 0;
                        var estadisticasRan = [];
                        var estR;

                        for (var i = 0; i < infoRan1.length; i++) {

                            if (infoRan1[i].length > 0) {

                                for (var j = 0; j < infoRan1[i].length; j++) {
                                    if (infoRan1[i][j].Mes == 'January') {
                                        m1 = infoRan1[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoRan1[i].length; j++) {
                                    if (infoRan1[i][j].Mes == 'February') {
                                        m2 = infoRan1[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoRan1[i].length; j++) {
                                    if (infoRan1[i][j].Mes == 'March') {
                                        m3 = infoRan1[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoRan1[i].length; j++) {
                                    if (infoRan1[i][j].Mes == 'April') {
                                        m4 = infoRan1[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoRan1[i].length; j++) {
                                    if (infoRan1[i][j].Mes == 'May') {
                                        m5 = infoRan1[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoRan1[i].length; j++) {
                                    if (infoRan1[i][j].Mes == 'June') {
                                        m6 = infoRan1[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoRan1[i].length; j++) {
                                    if (infoRan1[i][j].Mes == 'July') {
                                        m7 = infoRan1[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoRan1[i].length; j++) {
                                    if (infoRan1[i][j].Mes == 'August') {
                                        m8 = infoRan1[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoRan1[i].length; j++) {
                                    if (infoRan1[i][j].Mes == 'September') {
                                        m9 = infoRan1[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoRan1[i].length; j++) {
                                    if (infoRan1[i][j].Mes == 'October') {
                                        m10 = infoRan1[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoRan1[i].length; j++) {
                                    if (infoRan1[i][j].Mes == 'November') {
                                        m11 = infoRan1[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoRan1[i].length; j++) {
                                    if (infoRan1[i][j].Mes == 'December') {
                                        m12 = infoRan1[i][j].Cantidad;
                                        break;
                                    }
                                }

                                estR = { ID: infoRan1[i][0].ID, Nombre: infoRan1[i][0].Nombre, Ene: m1, Feb: m2, Mar: m3, Abr: m4, May: m5, Jun: m6, Jul: m7, Ago: m8, Sep: m9, Oct: m10, Nov: m11, Dic: m12 };
                                estadisticasRan.push(estR);

                                m1 = 0; m2 = 0; m3 = 0; m4 = 0; m5 = 0; m6 = 0; m7 = 0; m8 = 0; m9 = 0; m10 = 0; m11 = 0; m12 = 0;
                            }
                        }

                        res.render('planner/plr_viewEstadisticasRango', {
                            datosRango: estadisticasRan
                        }
                        );
                    });
                }
            });
        });
    } else {
        res.redirect('/');
    }
}

/**
 * Autor: Alan Eduardo Herrera Alvarado
* Funcion que cosulta los datos para el filtro de Flota
*/
controller.obtenerResumenFlota = (req, res) => {
    if (req.session.loggedin) {
        req.getConnection(async (err, conn) => {
            await conn.query('SELECT F.idFlota as IDFlota, F.flota as Flota FROM flota as F', (err, Flotas) => {
                if (err) {
                    res.json(err);
                }

                var datosFlota = Flotas;
                console.log(datosFlota);

                if (conn) {
                    conn.query('SELECT F.idFlota as IDFlota, F.flota as Flota, COUNT(S.numTrabajador) as Cantidad, MONTHNAME(fechaInicio) as Mes FROM solicitud as S INNER JOIN usuario as U INNER JOIN flota as F ON F.idFlota = U.idFlota AND U.numTrabajador = S.numTrabajador GROUP BY MONTH(S.fechaInicio), IDFlota, Flota, Mes', (errRang, Conteo) => {
                        var datosFCont = Conteo;

                        var infoFlotas = [];

                        for (var i = 0; i < datosFlota.length; i++) {
                            let infoFlot = datosFCont.filter(function (flota) {
                                return flota.IDFlota == datosFlota[i].IDFlota;
                            }).map(function (flota) {
                                return { ID: datosFlota[i].IDFlota, Nombre: datosFlota[i].Flota, Mes: flota.Mes, Cantidad: flota.Cantidad };

                            });
                            infoFlotas.push(infoFlot);
                        }

                        console.log(infoFlotas);

                        var m1 = 0, m2 = 0, m3 = 0, m4 = 0, m5 = 0, m6 = 0, m7 = 0, m8 = 0, m9 = 0, m10 = 0, m11 = 0, m12 = 0;
                        var estadisticasFlot = [];
                        var estF;

                        for (var i = 0; i < infoFlotas.length; i++) {
                            if (infoFlotas[i].length > 0) {

                                for (var j = 0; j < infoFlotas[i].length; j++) {
                                    if (infoFlotas[i][j].Mes == 'January') {
                                        m1 = infoFlotas[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoFlotas[i].length; j++) {
                                    if (infoFlotas[i][j].Mes == 'February') {
                                        m2 = infoFlotas[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoFlotas[i].length; j++) {
                                    if (infoFlotas[i][j].Mes == 'March') {
                                        m3 = infoFlotas[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoFlotas[i].length; j++) {
                                    if (infoFlotas[i][j].Mes == 'April') {
                                        m4 = infoFlotas[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoFlotas[i].length; j++) {
                                    if (infoFlotas[i][j].Mes == 'May') {
                                        m5 = infoFlotas[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoFlotas[i].length; j++) {
                                    if (infoFlotas[i][j].Mes == 'June') {
                                        m6 = infoFlotas[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoFlotas[i].length; j++) {
                                    if (infoFlotas[i][j].Mes == 'July') {
                                        m7 = infoFlotas[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoFlotas[i].length; j++) {
                                    if (infoFlotas[i][j].Mes == 'August') {
                                        m8 = infoFlotas[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoFlotas[i].length; j++) {
                                    if (infoFlotas[i][j].Mes == 'September') {
                                        m9 = infoFlotas[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoFlotas[i].length; j++) {
                                    if (infoFlotas[i][j].Mes == 'October') {
                                        m10 = infoFlotas[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoFlotas[i].length; j++) {
                                    if (infoFlotas[i][j].Mes == 'November') {
                                        m11 = infoFlotas[i][j].Cantidad;
                                        break;
                                    }
                                }

                                for (var j = 0; j < infoFlotas[i].length; j++) {
                                    if (infoFlotas[i][j].Mes == 'December') {
                                        m12 = infoFlotas[i][j].Cantidad;
                                        break;
                                    }
                                }

                                estF = { ID: infoFlotas[i][0].ID, Nombre: infoFlotas[i][0].Nombre, Ene: m1, Feb: m2, Mar: m3, Abr: m4, May: m5, Jun: m6, Jul: m7, Ago: m8, Sep: m9, Oct: m10, Nov: m11, Dic: m12 };
                                console.log(estF);
                                estadisticasFlot.push(estF);

                                m1 = 0; m2 = 0; m3 = 0; m4 = 0; m5 = 0; m6 = 0; m7 = 0; m8 = 0; m9 = 0; m10 = 0; m11 = 0; m12 = 0;
                            }
                        }

                        res.render('planner/plr_viewEstadisticasFlota', {
                            datosFlota: estadisticasFlot
                        }
                        );
                    });
                }

            });
        });
    } else {
        res.redirect('/');
    }
}

/**
 * Autor: Alan Eduardo Herrera Alvarado
* Funcion que cosulta los datos para los detalles del Mes para Rnago
*/
controller.detallesRango = (req, res) => {
    if (req.session.loggedin) {

        mes = req.params['mes'];
        idR = req.params['id'];
        console.log(req.params);
        var mesN = 0;
        if (mes == "ene") {
            mesN = 1;
        } else {
            if (mes == "feb") {
                mesN = 2;
            } else {
                if (mes == "mar") {
                    mesN = 3;
                } else {
                    if (mes == "abr") {
                        mesN = 4;
                    } else {
                        if (mes == "may") {
                            mesN = 5;
                        } else {
                            if (mes == "jun") {
                                mesN = 6;
                            } else {
                                if (mes == "jul") {
                                    mesN = 7;
                                } else {
                                    if (mes == "ago") {
                                        mesN = 8;
                                    } else {
                                        if (mes == "sep") {
                                            mesN = 9;
                                        } else {
                                            if (mes == "oct") {
                                                mesN = 10;
                                            } else {
                                                if (mes == "nov") {
                                                    mesN = 11;
                                                } else {
                                                    if (mes == "dic") {
                                                        mesN = 12;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        req.getConnection(async (err, conn) => {
            await conn.query('SELECT S.idSoli as ID, S.fechaInicio as Inicio, S.fechaTermino as Termino, U.numTrabajador as IDTrab, S.estado as Estado, MONTH(`fechaInicio`) as Mes ,R.rango as Rango FROM solicitud as S INNER JOIN usuario as U ON S.numTrabajador = U.numTrabajador INNER JOIN rango as R ON R.idRan = U.idRan WHERE MONTH(S.fechaInicio) = ? AND U.idRan = ?', [mesN, idR], (err, detalles) => {
                console.log(detalles);
                if (err) {
                    console.error(err);
                    res.send('DB error');
                }

                var detallesRan = [];
                var dT;
                var inicioDet;
                var terminoDet;
                var inicioDet1;
                var terminoDet1;

                for (var i = 0; i < detalles.length; i++) {

                    inicioDet = detalles[i].Inicio.toISOString();
                    terminoDet = detalles[i].Termino.toISOString();

                    inicioDet1 = inicioDet.substring(0, 10);
                    terminoDet1 = terminoDet.substring(0, 10);

                    dT = { ID: detalles[i].ID, Inicio: inicioDet1, Termino: terminoDet1, IDTrab: detalles[i].IDTrab, Estado: detalles[i].Estado };
                    detallesRan.push(dT);
                    console.log(detallesRan);
                }

                res.render('planner/plr_viewDetallesEstadisticasRango', {
                    datosDetallesRan: detallesRan
                })
            });
        });
    } else {
        res.redirect('/');
    }
};

/**
 * Autor: Alan Eduardo Herrera Alvarado
* Funcion que cosulta los datos para los detalles del Mes para Flota
*/
controller.detallesFlota = (req, res) => {
    if (req.session.loggedin) {

        mes = req.params['mes'];
        idF = req.params['id'];
        console.log(req.params);
        var mesN = 0;
        if (mes == "ene") {
            mesN = 1;
        } else {
            if (mes == "feb") {
                mesN = 2;
            } else {
                if (mes == "mar") {
                    mesN = 3;
                } else {
                    if (mes == "abr") {
                        mesN = 4;
                    } else {
                        if (mes == "may") {
                            mesN = 5;
                        } else {
                            if (mes == "jun") {
                                mesN = 6;
                            } else {
                                if (mes == "jul") {
                                    mesN = 7;
                                } else {
                                    if (mes == "ago") {
                                        mesN = 8;
                                    } else {
                                        if (mes == "sep") {
                                            mesN = 9;
                                        } else {
                                            if (mes == "oct") {
                                                mesN = 10;
                                            } else {
                                                if (mes == "nov") {
                                                    mesN = 11;
                                                } else {
                                                    if (mes == "dic") {
                                                        mesN = 12;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        req.getConnection(async (err, conn) => {
            await conn.query('SELECT S.idSoli as ID, S.fechaInicio as Inicio, S.fechaTermino as Termino, U.numTrabajador as IDTrab, S.estado as Estado FROM solicitud as S INNER JOIN usuario as U ON S.numTrabajador = U.numTrabajador INNER JOIN flota as F ON F.idFlota = U.idFlota WHERE MONTH(S.fechaInicio) = ? AND U.idFlota = ?', [mesN, idF], (err, detalles) => {
                console.log(detalles);
                if (err) {
                    console.error(err);
                    res.send('DB error');
                }

                var detallesFlot = [];
                var dF;
                var mesDet;
                var inicioDet;
                var terminoDet;
                var inicioDet1;
                var terminoDet1;

                for (var i = 0; i < detalles.length; i++) {

                    inicioDet = detalles[i].Inicio.toISOString();
                    terminoDet = detalles[i].Termino.toISOString();

                    inicioDet1 = inicioDet.substring(0, 10);
                    terminoDet1 = terminoDet.substring(0, 10);

                    dF = { ID: detalles[i].ID, Inicio: inicioDet1, Termino: terminoDet1, IDTrab: detalles[i].IDTrab, Estado: detalles[i].Estado };
                    detallesFlot.push(dF);
                    console.log(detallesFlot);
                }

                res.render('planner/plr_viewDetallesEstadisticasFlota', {
                    datosDetallesFlot: detallesFlot
                })
            });
        });
    } else {
        res.redirect('/');
    }
};

module.exports = controller;