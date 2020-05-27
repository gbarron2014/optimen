/**
 * Autor José Antonio García Martínez
 *  16/03/2020
 */
const controller = {};
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');


/**
 * Método que muestra la pagina inicial del login
 */
controller.list = (req, res) => {
    message = '';
    res.render('viewLogin', { message: message });
};
/**
 * Método que se encarga de hacer la verificacion de un usuario en la base de datos
 */
controller.values = (req, res) => {
    if (req.method == "POST") {
        req.flash('pass', 'Ingrese contraseña');
        req.flash('user', 'Ingrese Email');
        req.flash('cam', 'Ingrese Email y Contraseña');
        req.flash('fat', 'Email o contraseña son incorrectos. Por favor, inténtelo otra vez.');
        req.flash('est', 'El usuario no a sido Aceptado, inténtelo mas tarde');
        req.flash('rec', 'El usuario a sido Rechazado intente registrarse de nuevo');

        var sess = req.session;
        var post = req.body;
        var password = post.password;
        var email = post.username;
        var username = post.username;
        var estado = 'Aceptado';
        
        if (password && username) {
            req.getConnection(async(err, conn) => {
                //consulta de verificasion de usuario
                await conn.query('SELECT * FROM usuario where  email = ?', [email],(err, results) => {
                    const equals = bcrypt.compareSync(password, results[0].contrasenia);
                    var est = results[0].estado;
                    if(est == 'Pendiente'){
                        res.render('viewLogin', { message: req.flash('est') });
                    }else{
                        if(est == 'Rechazado'){
                        res.render('viewLogin', { message: req.flash('rec') });
                        }else{

                        
                    
                    if(equals){
                        //consulta que trae los datos del usuario
                        conn.query('SELECT * FROM usuario INNER JOIN tipoUsuario ON usuario.idTipo = tipoUsuario.idTipo INNER JOIN flota on flota.idFlota = usuario.idFlota INNER JOIN rango on rango.idRan = usuario.idRan INNER JOIN puesto on usuario.idPues = puesto.idPues WHERE email = ? and estado = ?', [ email, estado], (err, results) => {
                            /**
                             * validacion de existencia del usuario
                             */
                            try {
                                if (results.length > 0) {
                                    req.session.loggedin = true;
                                    var tipo = results[0]['tipo'];
                                    var nom = results[0]['nombre']
                                    var numTrabajador = results[0]['numTrabajador'];
                                    var rango = results[0]['rango'];
                                    var flota = results[0]['flota'];
                                    var email = results[0]['email'];
                                    var puesto = results[0]['puesto']
                                    var apePat = results[0]['apePaterno'];
                                    var apeMat = results[0]['apeMaterno'];
                                    var seniority = results[0]['seniority'];
                                    var diasVacaciones = results[0]['diasVacaciones']
                                    if (tipo == 'Tripulante') {
                                        req.session.loggedin = true;
            
                                        req.session.numTrabajador = numTrabajador;
                                        req.session.tipo = tipo;
                                        req.session.rango = rango;
                                        req.session.flota = flota;
                                        req.session.email = email;
                                        req.session.puesto = puesto;
                                        req.session.nombre = nom;
                                        req.session.apePat = apePat;
                                        req.session.apeMat = apeMat;
                                        req.session.seniority = seniority;
                                        req.session.diasVacaciones = diasVacaciones;
                                        //colocar lo que es el redireccionamiento a la pestalla inicial de Tripulantes
                                        //para utilizar las session, un ejemplo seria var tipo = req.session.tipo y tipo seria el contenedor del tipo de usuario
                                        res.redirect('/tripulante');
                                    } else {
                                        if (tipo == 'Administrador') {
                                            req.session.loggedin = true;
                                            req.session.tipo = tipo;
                                            //colocar lo que es el redireccionamiento a la pestalla inicial de Administrador
                                            //para utilizar las session, un ejemplo seria var tipo = req.session.tipo y tipo seria el contenedor del tipo de usuario
                                            res.redirect('/admin');
                                        } else {
                                            if (tipo == 'Planner') {
                                                req.session.loggedin = true;
                                                req.session.tipo = tipo;
                                                req.session.numT = numTrabajador;
                                                //colocar lo que es el redireccionamiento a la pestalla inicial de Planner
                                                //para utilizar las session, un ejemplo seria var tipo = req.session.tipo y tipo seria el contenedor del tipo de usuario
            
                                                res.redirect('/planner');
                                            }
                                        }
                                    }
                                } else {
            
                                    res.render('viewLogin', { message: req.flash('fat') });
            
                                }
                            } catch (e) {
                                res.render('viewLogin', { message: req.flash('fat') });
                                console.log(e);
                            }
                            
                            
                        });
                    }else{
                        //Validar usuarios que no esten encriptados
                        conn.query('SELECT * FROM usuario INNER JOIN tipoUsuario ON usuario.idTipo = tipoUsuario.idTipo INNER JOIN flota on flota.idFlota = usuario.idFlota INNER JOIN rango on rango.idRan = usuario.idRan INNER JOIN puesto on usuario.idPues = puesto.idPues WHERE  email = ? and (contrasenia = ? and estado = ?)', [ email, password, estado], (err, results) => {
                            /**
                             * validacion de existencia del usuario
                             */
                            try {
                                if (results.length > 0) {
                                    req.session.loggedin = true;
                                    var tipo = results[0]['tipo'];
                                    var nom = results[0]['nombre']
                                    var numTrabajador = results[0]['numTrabajador'];
                                    var rango = results[0]['rango'];
                                    var flota = results[0]['flota'];
                                    var email = results[0]['email'];
                                    var puesto = results[0]['puesto']
                                    var apePat = results[0]['apePaterno'];
                                    var apeMat = results[0]['apeMaterno'];
                                    var seniority = results[0]['seniority'];
                                    var diasVacaciones = results[0]['diasVacaciones']
                                    if (tipo == 'Tripulante') {
                                        req.session.loggedin = true;
            
                                        req.session.numTrabajador = numTrabajador;
                                        req.session.tipo = tipo;
                                        req.session.rango = rango;
                                        req.session.flota = flota;
                                        req.session.email = email;
                                        req.session.puesto = puesto;
                                        req.session.nombre = nom;
                                        req.session.apePat = apePat;
                                        req.session.apeMat = apeMat;
                                        req.session.seniority = seniority;
                                        req.session.diasVacaciones = diasVacaciones;
                                        //colocar lo que es el redireccionamiento a la pestalla inicial de Tripulantes
                                        //para utilizar las session, un ejemplo seria var tipo = req.session.tipo y tipo seria el contenedor del tipo de usuario
                                        res.redirect('/tripulante');
                                    } else {
                                        if (tipo == 'Administrador') {
                                            req.session.loggedin = true;
                                            req.session.tipo = tipo;
                                            //colocar lo que es el redireccionamiento a la pestalla inicial de Administrador
                                            //para utilizar las session, un ejemplo seria var tipo = req.session.tipo y tipo seria el contenedor del tipo de usuario
                                            res.redirect('/admin');
                                        } else {
                                            if (tipo == 'Planner') {
                                                req.session.loggedin = true;
                                                req.session.tipo = tipo;
                                                req.session.numT = numTrabajador;
                                                //colocar lo que es el redireccionamiento a la pestalla inicial de Planner
                                                //para utilizar las session, un ejemplo seria var tipo = req.session.tipo y tipo seria el contenedor del tipo de usuario
            
                                                res.redirect('/planner');
                                            }
                                        }
                                    }
                                } else {
            
                                    res.render('viewLogin', { message: req.flash('fat') });
            
                                }
                            } catch (e) {
                                res.render('viewLogin', { message: req.flash('fat') });
                                console.log(e);
                            }
                            
                            
                        });
                    }
                    }
                    }
                    

                });
                
                
            });

        } else {
            /**
             * Validacion de campos
             */
            if (!password && !username) {

                res.render('viewLogin', { message: req.flash('cam') });
            } else {
                if (!password) {

                    res.render('viewLogin', { message: req.flash('pass') });
                } else {
                    if (!username) {

                        res.render('viewLogin', { message: req.flash('user') });
                    }


                }
            }


        }
    }
};
controller.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};


module.exports = controller;