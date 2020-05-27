const FlotaCtrl = {}

FlotaCtrl.list=(req,res)=>{
    var success="";
    var error ="";

    req.getConnection((err,conn)=>{
        if(err){
            console.error(err);
            res.send('Error db');
        }
        if(conn){
            conn.query('SELECT * FROM flota',(err,datos)=>{
                res.render('planner/plr_viewAdminFlota',{
                    data : datos,
                    success,
                    error
                });
            });
        }
    });
};

FlotaCtrl.save = (req,res)=>{
    var success="";
    var error ="";

    const data = req.body;
    console.log(data);

    const idFlota = data['idFlota'];
    req.getConnection((err,conn)=>{
        if(err){
            console.log(err);
            res.send('Error en DB');
        }
        if(conn){
            conn.query(`Select * from flota where idFlota = '${idFlota}' or LOWER(flota) = LOWER('${data.flota}') `,(err,flota)=>{
                if(err){
                    console.log(err);
                    res.send('error encontrando flotas');
                }
                if(flota!=""){
                    conn.query('SELECT * FROM flota',(erro,flotas)=>{
                        if(erro){
                            console.error(erro);
                        }
                        if(flotas){
                            error = "El modelo de la flota o su id ya existen."
                            res.render('planner/plr_viewAdminFlota',{data : flotas, success,error});
                        }
                    });
                }
                conn.query('INSERT INTO flota SET ?',[data],(er)=>{
                    if(er){console.log(er); res.send('Error agregando flota')}
                    conn.query('SELECT * FROM flota',(erro,flotas)=>{
                        if(erro){
                            console.error(erro);
                        }
                        if(flotas){
                            success="Flota agregada correctamente";
                            res.render('planner/plr_viewAdminFlota',{data : flotas, success,error});
                        }
                    });
                });
            });
        }
    });
};

FlotaCtrl.delete = (req,res)=>{
    var success="";
    var error="";

    const {idFlota} = req.params;
    req.getConnection((err,conn)=>{
        if(err){
            console.log(err);
            res.send('Error en DB');
        }
        if(conn){
            conn.query('DELETE FROM flota WHERE idFlota = ?',[idFlota],(err)=>{
                conn.query('SELECT * FROM flota',(erro,flotas)=>{
                    if(erro){
                        console.error(erro);
                    }
                    if(flotas){
                        success="Eliminado correctamente";
                        res.render('planner/plr_viewAdminFlota',{data : flotas, success,error});
                    }
                });
            });
        }
    });
};

FlotaCtrl.update = (req,res)=>{
    const {idFlota} = req.params;
    req.getConnection((err,conn)=>{
        if(err){
            console.log(err);
            res.send('DB error');
        }
        if(conn){
            conn.query('SELECT * FROM flota WHERE idFlota = ?',[idFlota],(err,flota)=>{
                if(err){
                    console.log(err);
                }
                res.render('planner/plr_viewAdminFlota_edit',{
                    data: flota[0]
                });
            });
        }
    });
};

FlotaCtrl.edit = (req,res)=>{
    var success="";
    var error="";

    const {idFlota} = req.params;
    const datos = req.body;
    
    req.getConnection((err,conn)=>{
        if(err){
            console.log(err);
            res.send('DB error');
        }
        conn.query('UPDATE flota set ? WHERE idFlota = ?',[datos,idFlota],(err,respu)=>{
            conn.query('SELECT * FROM flota',(erro,flotas)=>{
                if(erro){
                    console.error(erro);
                }
                if(flotas){
                    success="Actualizado correctamente";
                    res.render('planner/plr_viewAdminFlota',{data : flotas, success,error});
                }
            });
        });
    });
};

module.exports = FlotaCtrl