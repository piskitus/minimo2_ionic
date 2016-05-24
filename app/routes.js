//GET /api/todos Devuelve todas las tareas de la BD
//POST /api/todos Crea una tarea
//DELETE /api/todos/:tod0 Borra una tarea

// Rutas de nuestro API
var Student = require('./model/student');
var Subject = require('./model/subject');

var Controller = require ('./controller');

module.exports = function (app){

    //Devuelve todos los datos de la BD
    app.get('/api/student', Controller.getStudents);
    app.get('/api/subject', Controller.getSubjects);

    //Crea un nuevo dato
    app.post('/api/student', Controller.setStudent);
    app.post('/api/subject', Controller.setSubject);

    //Elimina un dato
    app.delete('/api/student/:student_id', Controller.removeStudent);
    app.delete('/api/subject/:subject_id', Controller.removeSubject);


    // Añadir alumno en asignatura
    app.put('/api/subject/:subject_id', Controller.addStudent);




    //application ---------------------------------------------------
    // Carga una vista HTML simple donde irá nuestra Single App Page
    // Angular Manejará el Frontend
    app.get('*', function(req,res) {

        res.sendfile('./public/index.html'); //Carga única de la vista

    });
};
