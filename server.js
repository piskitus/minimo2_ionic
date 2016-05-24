//server.js

var express     = require('express');
var app         = express();
var mongoose     = require('mongoose');

// Conexión con la base de datos
mongoose.connect('mongodb://localhost:27017/angular-todo');

// Configuración
app.configure(function() {
    // Localización de los ficheros estÃ¡ticos
    app.use(express.static(__dirname + '/public'));
    // Muestra un log de todos los request en la consola
    app.use(express.logger('dev'));
    // Permite cambiar el HTML con el método POST
    app.use(express.bodyParser());
    // Simula DELETE y PUT
    app.use(express.methodOverride());
    // para que funcione con ionic
    app.use(function (req, res, next) { res.header("Access-Control-Allow-Origin", "*"); res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE'); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next(); });
});

//cargamos los endpoints (definición de rutas)
require('./app/routes.js')(app);

// Escucha en el puerto 8080 y corre el server
app.listen(8000, function() {
    console.log('App listening on port 8000');
});