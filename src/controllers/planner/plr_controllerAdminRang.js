const RangoCtrl = {}

RangoCtrl.list=(req,res)=>{
    var success ="";
    var error="";
    req.getConnection((err,conn)=>{
        if(err){
            console.error(err);
            res.send('Error db');
        }
        if(conn){
            conn.query('SELECT * FROM rango',(err,datos)=>{
                res.render('planner/plr_viewAdminRang',{
                    data : datos,
                    success,error
                });
            });
        }
    });
};

RangoCtrl.save = (req,res)=>{
    var success="";
    var error ="";

    const data = req.body;
    const idRango = data['idRan']
    
    req.getConnection((err,conn)=>{
        if(err){
            console.log(err);
            res.send('Error en DB');
        }
        if(conn){
            conn.query(`SELECT * FROM rango where idRan = '${idRango}' or LOWER(rango) = LOWER('${data.rango}')`,(err,col)=>{
                if(err){
                    console.log(err);
                    res.send('Error encontrando usuario');
                }
                if(col!=""){
                    conn.query('Select * from rango',(err,rango)=>{
                        if(err){
                            console.log(err);
                            res.send('Error en la consulta');
                        }
                        if(rango){
                            error="El id del rango o el nombre del rango ya existe";
                            res.render('planner/plr_viewAdminRang',{data:rango,success,error});
                        }
                    });
                }
                conn.query('INSERT INTO rango SET ?',[data],(er)=>{
                    conn.query('SELECT * FROM rango',(erro,rango)=>{
                        if(erro){
                            console.error(erro);
                        }
                        if(rango){
                            success="Agregado correctamente";
                            res.render('planner/plr_viewAdminRang',{data : rango, success,error});
                        }
                    });
                });
            });
        }
    });
};

RangoCtrl.delete = (req,res)=>{
    var success="";
    var error="";

    const {idRan} = req.params;
    req.getConnection((err,conn)=>{
        if(err){
            console.log(err);
            res.send('Error en DB');
        }
        if(conn){
            conn.query('DELETE FROM rango WHERE idRan = ?',[idRan],(err)=>{
                conn.query('SELECT * FROM rango',(erro,rango)=>{
                    if(erro){
                        console.error(erro);
                    }
                    if(rango){
                        success="Eliminado correctamente";
                        res.render('planner/plr_viewAdminRang',{data : rango, success,error});
                    }
                });
            });
        }
    });
};

RangoCtrl.update = (req,res)=>{
    var success="";
    var error="";

    const {idRan} = req.params;
    req.getConnection((err,conn)=>{
        if(err){
            console.log(err);
            res.send('DB error');
        }
        if(conn){
            conn.query('SELECT * FROM rango WHERE idRan = ?',[idRan],(err,rango)=>{
                if(err){
                    console.log(err);
                }
                res.render('planner/plr_viewAdminRang_edit',{
                    data: rango[0],success,error
                });
            });
        }
    });
};

RangoCtrl.edit = (req,res)=>{
    var success="";
    var error="";

    const {idRan} = req.params;
    const datos = req.body;
    
    req.getConnection((err,conn)=>{
        if(err){
            console.log(err);
            res.send('DB error');
        }
        conn.query('UPDATE rango set ? WHERE idRan = ?',[datos,idRan],(err,respu)=>{
            conn.query('SELECT * FROM rango',(erro,rango)=>{
                if(erro){
                    console.error(erro);
                }
                if(rango){
                    success="Actualizado correctamente";
                    res.render('planner/plr_viewAdminRang',{data : rango, success,error});
                }
            });
        });
    });
};

module.exports = RangoCtrl