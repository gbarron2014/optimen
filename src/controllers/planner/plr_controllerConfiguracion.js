const controller = {};
/*controller.save1 = (req,res) =>{
    
    req.getConnection(async(err,conn)=>{
        datos1=req.body
    await conn.query('INSERT INTO temporada set ?',[datos1],(err,temporada)=>{
    
        console.log(datos1);
    res.redirect('/planner/configuracion');
   
    });
    });
}*/
controller.save1 = (req,res) =>{
    
    req.getConnection(async(err,conn)=>{
        //datos1=req.body
        temporada = req.body.temporada
        var fechaInicio
        fechaInicio = req.body.fechaInicio
        var fechaFin
        fechaFin = req.body.fechaTermino
        var fecha1 = new Date(fechaInicio);
        var fecha2 = new Date(fechaFin);
        fecha1.getDate();
        fecha2.getDate();
        await conn.query('INSERT INTO temporada SET temporada=?, fechaInicio=?, fechaTermino=?',[temporada,fechaInicio,fechaFin],(err)=>{
            if (err) {
                console.err('Error' + err);
            }
        res.redirect('/planner/configuracion');
    });
    });
}

//Codigo de la vista a utilizar:
//CREATE VIEW temporadas AS SELECT temporada, fechaInicio as start,fechaTermino as end,
//if (temporada like "Alta" = TRUE,"#FF0000",if (temporada like "Media" = TRUE,"#FFFF00","#FF2D00")) as color, 
//idTemp, "background" as rendering FROM `temporada`
controller.tempo = (req,res) =>{
    req.getConnection(async(err,conn)=>{
    await conn.query('SELECT temporada as title, start, end, color From temporadas',(err,temp)=>{
    if(err){
    res.json(err);
    }else{
     
    res.send(temp)
    }
  
    });
    });
    }

    controller.list = (req,res) =>{
        req.getConnection(async(err,conn)=>{
        await conn.query('SELECT * FROM temporada', (err,usuarios)=>{
        if(err){
        res.json(err);
        }
        res.render('planner/plr_viewconfiguracion',{
        datos: usuarios
        });
        });
        });
    }
        
        controller.edit = (req,res)=>{
            req.getConnection(async (err,conn)=>{
            const {idTemp} = req.params;
            const datos =await conn.query('SELECT * FROM temporada WHERE idTemp =?',[idTemp],(err,temporada)=>{
            console.log(temporada);
            console.log(idTemp);
            res.render('planner/plr_viewconfiguracionEditar',{
            datos: temporada[0]
            })
            });
            });
            }
            
        controller.update = (req,res)=>{

            const {idTemp} = req.params;
            const actualizacion = req.body;
            req.getConnection(async (err,conn)=>{
            await conn.query('UPDATE temporada set ? WHERE idTemp = ?', [actualizacion,
            idTemp],(err,dbres=>{
            res.redirect('/planner/configuracion'); 
            }));
            });
            }    


module.exports = controller;