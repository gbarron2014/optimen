const controller = {};



controller.list = (req,res) =>{
req.getConnection(async(err,conn)=>{
await conn.query('SELECT * FROM preasignaciones', (err,preasignaciones)=>{
if(err){
res.json(err);

};
conn.query('SELECT * FROM usuario', (err, regNumero
    ) => { 
        if (err) {
            res.json(err);
            };
            conn.query('SELECT * FROM actividad', (err, regActividad)=>{
                if(err){
                    res.json(err);
                };

res.render('planner/plr_viewPreasignacion',{
    datos: preasignaciones,
    regActividad: regActividad,
    regNumero : regNumero
});
});
});
});
});
}

controller.save3 = (req,res) =>{
req.getConnection(async (err,conn) =>{
var datos = {
    acti: req.body.acti,
    numTra: req.body.numTra,
    fechaInicio: req.body.fechaInicio,
    fechaTermino: req.body.fechaTermino
}
await conn.query('INSERT INTO preasignaciones SET ?',[datos],(err,preasignaciones)=>{
if(err){
    console.log(preasignaciones);
    console.log(err);
} else {
    console.log(preasignaciones);
    console.log(err);
} 
res.redirect('/planner/preasignacion');
});
});

}

controller.delete = (req,res) =>{
req.getConnection(async (err,conn)=>{
const {idPre} = req.params; //
await req.getConnection((err,conn)=>{
conn.query('DELETE FROM preasignaciones WHERE idPre = ?',[idPre],(err,bdres)=>{
if(err){
res.send('Error al eliminar');

}
res.redirect('/planner/preasignacion');
});
});
});
}

controller.edit = (req,res)=>{
console.log(req.body);
req.getConnection(async (err,conn)=>{
const {idPre} = req.params;
const datos =await conn.query('SELECT * FROM preasignaciones WHERE idPre =?',[idPre],(err,preasignaciones)=>{
console.log(preasignaciones);
res.render('planner/plr_viewPreasignacionEditar',{
datos: preasignaciones[0]
})
});
});
}

controller.update = (req,res)=>{
const {idPre} = req.params;
const actualizacion = req.body;
req.getConnection(async (err,conn)=>{
await conn.query('UPDATE preasignaciones set ? WHERE idPre = ?', [actualizacion,idPre],(err,dbres=>{
res.redirect('/planner/preasignacion');
}));
});
}
module.exports = controller;

controller.list3 = (req,res) =>{
req.getConnection(async(err,conn)=>{
await conn.query('SELECT * FROM preasignaciones', (err,preasignaciones)=>{
if(err){
res.json(err);
}
res.render('planner/actividad',{
datos: preasignaciones
});
});
});
}

controller.save1 = (req,res) =>{
req.getConnection(async(err,conn)=>{
datos=req.body
await conn.query('INSERT INTO preasignaciones set ?',[datos],(err,preasignaciones)=>{
console.log(preasignaciones);
res.redirect('planner/plr_viewPreasignacion');
});
});
}
