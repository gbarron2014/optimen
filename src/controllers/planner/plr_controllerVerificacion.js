const controller = {};
/**
* Desarrollador: Alan Mauricio Lozano Murillo
* Párametros: req, almacena distintos parametros de requerimiento de la aplicación, como protocolos html o la conexión a la base de datos
*             res, se encarga de hacer una respuesta al listener del servidor
* Descripción: Método que se encarga de hacer una consulta a la base de datos para renderizar la pantalla principal del planner en conjunto con *              los datos necesarios para su renderizado.
* Retorno: En caso exitoso con la conexión a la base de datos, se hace una consulta y se renderiza la pantalla principal del planner.
 */
controller.render = (req,res)=>{
    if(req.session.loggedin){
        req.getConnection((err,conn)=>{
            if(err){
                console.error(err);
                res.send('DB error');
            }
            if(conn){
                conn.query(`select U.numTrabajador as Id, concat(U.nombre,' ',U.apePaterno) as Nombre, R.rango as Rango, concat(F.flota,' ',F.marca) as Flota , seniority from usuario as U INNER JOIN rango as R ON U.idRan = R.idRan INNER JOIN flota as F ON U.idFlota = F.idFlota INNER JOIN tipoUsuario as T ON U.idTipo = T.idTipo where U.idTipo=3 and U.estado = 'Aceptado' AND EXISTS (Select U.numTrabajador FROM solicitud as S WHERE S.numTrabajador = U.numTrabajador)`,(err,rows)=>{
                    if(err){
                        console.error(err);
                        res.send('Error con la consulta');
                    }
                    if(rows){
                        var mensaje = req.flash('prueba');
                        res.render('planner/plr_viewVerificacion',{data: rows, message : mensaje});
                    }
                });
            }
        });
    }else{
        res.redirect('/');
    }
    
};
/**
* Desarrollador: Alan Mauricio Lozano Murillo
* Párametros: req, almacena distintos parametros de requerimiento de la aplicación, como protocolos html o la conexión a la base de datos
*             res, se encarga de hacer una respuesta al listener del servidor
* Descripción: Método que se encarga de extraer los datos de un tripulante especifico
* Retorno: En caso exitoso con la conexión a la base de datos, se hace una consulta y se renderiza la pantalla principal del planner con datos de un solo tripulante.
 */
controller.data = (req,res)=>{
    numTrabajador = req.params['numTrabajador'];
    req.getConnection(async(err,conn)=>{
        if(err){
            res.send('DB error');
            console.error(err);
        }
        if(conn){
            await conn.query('select * from usuario where numTrabajador = ?',[numTrabajador],(erro,rows)=>{
                if(erro){
                    console.error(erro);
                    res.send('DB error');
                }
                res.json(rows);
            });
        }
    });
};
/**
* Desarrollador: Jose Gabriel Gonzalez Pardo
* Párametros: req, almacena distintos parametros de requerimiento de la aplicación, como protocolos html o la conexión a la base de datos
*             res, se encarga de hacer una respuesta al listener del servidor
* Descripción: Método que se encarga de solicitar los datos referentes al calendario de solicitud de un tripulante especifico.
* Retorno: En caso exitoso con la conexión a la base de datos, se retorna un objeto json que se renderiza en el calendario.
 */
controller.getCallen = (req,res) =>{
    numTrabajador= req.params['numTrabajador'];
    req.getConnection(async(err,conn)=>{
        await conn.query('SELECT id,title, start,end, color from gantt where numTrabajador = ?',[numTrabajador], (err,gantt)=>{
            if(err){
            res.json(err);
        }else{
            res.send(gantt);
        }});
    });
};
/**
* Desarrollador: Jose Gabriel Gonzalez Pardo y Alan Mauricio Lozano Murillo
* Párametros: req, almacena distintos parametros de requerimiento de la aplicación, como protocolos html o la conexión a la base de datos
*             res, se encarga de hacer una respuesta al listener del servidor
* Descripción: Método que se encarga de actualizar el estado de una solicitud especifica
* Retorno: En caso exitoso con la conexión a la base de datos, se actualiza el estado y se renderiza la pantalla principal del planner.
 */
controller.update = (req,res) =>{
    estado = req.params['estado'];
    idSoli = req.params['id'];
    console.log(req.params);
    
        req.getConnection(async(err,conn)=>{
           await conn.query('UPDATE `solicitud` SET estado=? where idSoli=?',[estado, idSoli] ,(err,acept)=>{
            if(err){
                console.error(err);
                res.send('DB error');
            }
            if(acept){
                res.redirect('/planner');
            }
           });
        });
};

module.exports = controller;