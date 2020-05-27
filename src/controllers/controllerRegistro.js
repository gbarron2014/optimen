const controllerRegistro = {};
const bcrypt = require('bcrypt');


/**
 * Desarrollador: Luis Fernando Buenrostro Martinez
 * Parametros: 
 * Descripcion: En esta parte se muestra la pantalla de registro, dentro de los cual se hacen 3 consultas para los combos de datos laborales
 * Retorno: Una vez que se hacen la consultas la propia pagina muestra la pantalla registro
 */
controllerRegistro.listRegistro = (req, res) => {
    req.getConnection(async (err, conn) => {
        await conn.query('SELECT * FROM puesto ORDER BY puesto', (err, regPuesto
        ) => { 
            if (err) {
                res.json(err);
                };
                conn.query('SELECT * FROM rango ORDER BY rango', (err, regRango)=>{
                    if(err){
                        res.json(err);
                    };
                    conn.query('SELECT * FROM flota ORDER BY flota', (err, regFlota)=>{
                        regFlota = regFlota;
                        if(err){
                            res.json(err);
                        }; 
            res.render('viewRegistro', {
                messageRegExitoso: '',
                message: '',
                regPuesto: regPuesto,
                regRango : regRango,
                regFlota : regFlota
                    });
                });
            });
        });
    });
};


/**
 * Desarrollador: Luis Fernando Buenrostro Martinez
 * Parametros: 
 * Descripcion: Parte que guarda y valida los datos
 * Retorno: Cuando un dato es guardado correctamente se mostrara un mensaje en verde y si falta algo se notificara con notificacion en rojo con el error
 */
controllerRegistro.saveRegistro = (req, res) => {
    req.getConnection(async (err, conn) => {
        numTra = req.body.numTrabajador;
        nom = req.body.Nombre;
        pat = req.body.ApePaterno;
        mat = req.body.ApeMaterno;
        ema = req.body.Email;
        repEm = req.body.repEmail;
        contra = req.body.Contrasenia;
        repCon = req.body.repContrasena;
        tel = req.body.telefono;
        ran = req.body.idRan;
        flo = req.body.idFlota;
        pues = req.body.idPues;

        await conn.query('SELECT * FROM puesto ORDER BY puesto', (err, regPuesto
            ) => { 
                if (err) {
                    res.json(err);
                    };
                    conn.query('SELECT * FROM rango ORDER BY rango', (err, regRango)=>{
                        if(err){
                            res.json(err);
                        };
                        conn.query('SELECT * FROM flota ORDER BY flota', (err, regFlota)=>{
                            regFlota = regFlota;
                            if(err){
                                res.json(err);
                            };
                            conn.query('SELECT email FROM usuario WHERE email = ?', ema, (err, verEma)=>{
                                if(err){
                                    res.json(err);
                                };
                            
            var datos = {
                numTrabajador: req.body.numTrabajador,
                Nombre: req.body.Nombre,
                ApePaterno: req.body.ApePaterno,
                ApeMaterno: req.body.ApeMaterno,
                Email: req.body.Email,
                Contrasenia : bcrypt.hashSync(req.body.Contrasenia, 10),
                telefono: req.body.telefono,
                idTipo: 3,
                idRan: req.body.idRan,
                idFlota: req.body.idFlota,
                idPues: req.body.idPues,
                estado: "Pendiente"
            }

            function ShowSelected()
            {
            /* Para obtener el valor */
            var cod = document.getElementById("idRan").value;
            alert(cod);
            
            /* Para obtener el texto */
            var combo = document.getElementById("idRan");
            var selected = combo.options[combo.selectedIndex].text;
            alert(selected);

                if(combo == "Azafata")
                    {
                        // habilitamos
                        document.getElementById("idFlota").disabled=false;
                    }else{
                        // deshabilitamos
                        document.getElementById("idFlota").disabled=true;
                    }
            }

            function validar_contrasenia(contra)
            {
                    var mayuscula = false;
                    var minuscula = false;
                    var numero = false;
                    var caracter_raro = false;
                    
                    for(var i = 0;i<contra.length;i++)
                    {
                        if(contra.charCodeAt(i) >= 65 && contra.charCodeAt(i) <= 90)
                        {
                            mayuscula = true;
                        }
                        else if(contra.charCodeAt(i) >= 97 && contra.charCodeAt(i) <= 122)
                        {
                            minuscula = true;
                        }
                        else if(contra.charCodeAt(i) >= 48 && contra.charCodeAt(i) <= 57)
                        {
                            numero = true;
                        }
                        else
                        {
                            caracter_raro = true;
                        }
                    }
                    if(mayuscula == true && minuscula == true && caracter_raro == true && numero == true)
                    {
                        return true;
                    }
                return false;
            }

            if (!numTra) {
                var messageRegExitoso = '';
                var message = 'Ingresa número de trabajador';
                res.render('viewRegistro', {
                    messageRegExitoso,
                    message,
                    regPuesto: regPuesto,
                    regRango : regRango,
                    regFlota : regFlota
                });
            } else if (!nom) {
                var messageRegExitoso = '';
                var message = 'Ingresa tu nombre';
                res.render('viewRegistro', {
                    message,
                    messageRegExitoso,
                    regPuesto: regPuesto,
                        regRango : regRango,
                        regFlota : regFlota
                    });
            }else if (nom.length < 3 || nom.length > 25) {
                var messageRegExitoso = '';
                var message = 'El nombre de usuario debe tener minimo de 3 a 25 caracteres';
                res.render('viewRegistro', {
                    message,
                    messageRegExitoso,
                    regPuesto: regPuesto,
                        regRango : regRango,
                        regFlota : regFlota
                    });
            }else if (!pat) {
                var messageRegExitoso = '';
                var message = 'Ingresa tu apellido paterno';
                res.render('viewRegistro', {
                    message,
                    messageRegExitoso,
                    regPuesto: regPuesto,
                    regRango : regRango,
                    regFlota : regFlota
                     });
            }else if (pat.length < 3 || pat.length > 20) {
                var messageRegExitoso = '';
                var message = 'El apellido paterno debe tener minimo de 3 a 20 caracteres';
                res.render('viewRegistro', {
                    message,
                    messageRegExitoso,
                    regPuesto: regPuesto,
                        regRango : regRango,
                        regFlota : regFlota
                    });
            }else if (!mat) {
                var messageRegExitoso = '';
                var message = 'Ingresa tu apellido materno';
                res.render('viewRegistro', {
                    message,
                    messageRegExitoso,
                    regPuesto: regPuesto,
                    regRango : regRango,
                    regFlota : regFlota
                   });
            }else if (mat.length < 3 || mat.length > 20) {
                var messageRegExitoso = '';
                var message = 'El apellido materno debe tener de 3 a 20 caracteres';
                res.render('viewRegistro', {
                    message,
                    messageRegExitoso,
                    regPuesto: regPuesto,
                        regRango : regRango,
                        regFlota : regFlota
                    });
            }else if (!tel) {
                var messageRegExitoso = '';
                var message = 'Ingresa número o teléfono';
                res.render('viewRegistro', {
                    message,
                    messageRegExitoso,
                    regPuesto: regPuesto,
                    regRango : regRango,
                    regFlota : regFlota
                   });
            }else if (tel.length != 10) {
                var messageRegExitoso = '';
                var message = 'El número de teléfono debe tener una longitud minima de 10';
                res.render('viewRegistro', {
                    message,
                    messageRegExitoso,
                    regPuesto: regPuesto,
                    regRango : regRango,
                    regFlota : regFlota
               });
            }else if (!ema) {
                var messageRegExitoso = '';
                var message = 'Ingresa tu correo electrónico';
                res.render('viewRegistro', {
                    message,
                    messageRegExitoso,
                    regPuesto: regPuesto,
                    regRango : regRango,
                    regFlota : regFlota
                    });
            }else if (!contra) {
                var messageRegExitoso = '';
                var message = 'Ingresa contraseña por favor';
                res.render('viewRegistro', {
                    message,
                    messageRegExitoso,
                    regPuesto: regPuesto,
                    regRango : regRango,
                    regFlota : regFlota
                     });
            }else if (contra.length < 8) {
                var messageRegExitoso = '';
                var message = 'La contraseña debe tener por lo menos 8 caracteres';
                res.render('viewRegistro', {
                    message,
                    messageRegExitoso,
                    regPuesto: regPuesto,
                    regRango : regRango,
                    regFlota : regFlota
                     });
            }else if (validar_contrasenia(contra)==false) {
                var messageRegExitoso = '';
                var message = 'La contraseña debe de tener letras mayúsculas y minúsculas, al menos un número y un caracter especial';
                res.render('viewRegistro', {
                    message,
                    messageRegExitoso,
                    regPuesto: regPuesto,
                    regRango : regRango,
                    regFlota : regFlota
                     });
            }else if (ran == 0) {
                var messageRegExitoso = '';
                var message = 'Favor de seleccionar rango';
                res.render('viewRegistro', {
                    message,
                    messageRegExitoso,
                    regPuesto: regPuesto,
                    regRango : regRango,
                    regFlota : regFlota
                    });
            }
            else if (flo == 0) {
                var messageRegExitoso = '';
                var message = 'Favor de seleccionar flota';
                res.render('viewRegistro', {
                    message,
                    messageRegExitoso,
                    regPuesto: regPuesto,
                    regRango : regRango,
                    regFlota : regFlota
                    });
            }
            else if (pues == 0) {
                var messageRegExitoso = '';
                var message = 'Favor de seleccionar puesto';
                res.render('viewRegistro', {
                    message,
                    messageRegExitoso,
                    regPuesto: regPuesto,
                    regRango : regRango,
                    regFlota : regFlota
                });
            }
            else if (ema != repEm) {
                var messageRegExitoso = '';
                var message = 'Correos electrónicos no coinciden';
                res.render('viewRegistro', {
                    message,
                    messageRegExitoso,
                    regPuesto: regPuesto,
                    regRango : regRango,
                    regFlota : regFlota
                });
            }else if (verEma.length > 0) {
                var messageRegExitoso = '';
                var message = 'Favor de verificar este usuario ya existe';
                res.render('viewRegistro', {
                    message,
                    messageRegExitoso,
                    regPuesto: regPuesto,
                    regRango : regRango,
                    regFlota : regFlota
                });
            }else if (contra != repCon) {  
                var messageRegExitoso = '';   
                var message = 'Contraseñas no coinciden';
                res.render('viewRegistro', {
                    message,
                    messageRegExitoso,
                    regPuesto: regPuesto,
                    regRango : regRango,
                    regFlota : regFlota
                });    
            }else {
                conn.query('INSERT INTO usuario SET?', [datos], (err, usuarios) => {
                    datos = req.body;
                    if(err){
                        var message = 'Algo ha salido mal mientras se hacia su registro, favor de intentarlo de nuevo';
                        var messageRegExitoso = ''; 
                        console.log(usuarios);
                        console.log(err);
                    } else {
                        console.log(usuarios);
                        console.log(err);
                        var message = '';
                        var messageRegExitoso = 'Regístro guardado exitosamente';
                    } 
                    res.render('viewRegistro', {
                        message,
                        messageRegExitoso,
                        regPuesto: regPuesto,
                        regRango : regRango,
                        regFlota : regFlota
                    });
                });
            }            
            });
            });
        });
    });
}); 
}

module.exports = controllerRegistro;
