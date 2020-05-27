const mysql = require('mysql');
const myconnection = require('express-myconnection');

const conexion = myconnection(mysql, {
    host: 'db4free.net',
    user: 'vacations',
    password: 'vacations',
    port: 3306,
    database: 'vacations'
}, 'single');



module.exports = conexion;
