const controller = {};

controller.list = (req,res) =>{
req.getConnection(async(err,conn)=>{
await conn.query('SELECT * FROM actividad', (err,actividad)=>{
if(err){
res.json(err);
}
res.render('planner/plr_viewActividades',{
datos: actividad
});
});
});
}

controller.save2 = (req,res) =>{
req.getConnection(async (err,conn) =>{
datos = req.body
await conn.query('INSERT INTO actividad SET ?',[datos],(err,actividad)=>{
console.log(datos);
res.redirect('/planner/actividad');
});
});
}

controller.delete = (req,res) =>{
req.getConnection(async (err,conn)=>{
const {idAct} = req.params; 
await req.getConnection((err,conn)=>{
conn.query('DELETE FROM actividad WHERE idAct = ?',[idAct],(err,bdres)=>{
if(err){
res.send('Error al eliminar');

}
res.redirect('/planner/actividad');
});
});
});
}

controller.edit = (req,res)=>{
console.log(req.body);
req.getConnection(async (err,conn)=>{
const {idAct} = req.params;
const datos =await conn.query('SELECT * FROM actividad WHERE idAct =?',[idAct],(err,nombreAct)=>{
console.log(nombreAct);
res.render('planner/plr_viewActividadEditar',{
datos: nombreAct[0]
})
});
});
}

controller.update = (req,res)=>{
const {idAct} = req.params;
const actualizacion = req.body;
req.getConnection(async (err,conn)=>{
await conn.query('UPDATE actividad set ? WHERE idAct = ?', [actualizacion,idAct],(err,dbres=>{
res.redirect('/planner/actividad');
}));
});
}
module.exports = controller;

