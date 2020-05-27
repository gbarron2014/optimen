const mysql = require('mysql');
const myconnection = require('express-myconnection');

const conexion = myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'vacaciones'
}, 'single');



module.exports = conexion;