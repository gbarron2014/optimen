var express=require('express');
var app=express();

const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser'); //Importamos la libreria body-parser
const flash = require('connect-flash'); //Importamos la libreria connect-flash
const session = require('express-session'); //Importamos la libreria express-session

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash()); //Para poder utilizar lo que es flash dentro de nuestra aplicación
app.use(session({ //Para poder utilizar lo que es session dentro de nuestra aplicación
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Rutas
//Importación de rutas

const routeAdmin = require('./routes/routeAdmin');
const routePlanner = require('./routes/routePlanner');
const routeTripulante = require('./routes/routeTripulante');
const routeLogin = require('./routes/routeLogin');

const database = require('./database/dbconnect');

//Configuración del servidor
app.set('puerto', process.env.PORT || 3000); //Configuración del puerto en el que se abre el servidor
app.set('view engine', 'ejs'); //Configuración del motor de plantillas con EJS
app.set('views', path.join(__dirname, 'views')); //Configuración del motor de vistas

//Middlewares
app.use(morgan('dev'));
app.use(database);

app.use(express.urlencoded({ extended: false }));

//Rutas
app.use('/', routeLogin); // Invocamos la configuración de rutas para "login"
app.use('/admin', routeAdmin);
app.use('/planner', routePlanner);
app.use('/tripulante', routeTripulante);

//Archivos estaticos (CSS, JS e imagenes)
app.use(express.static(path.join(__dirname, 'public')));



//Iniciar el servidor
var server=app.listen(3000,function(){
  console.log("Servidor encendido en el puerto http://localhost:3000");
  });
  

