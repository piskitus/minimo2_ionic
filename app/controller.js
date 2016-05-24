var Student = require('./model/student');
var Subject = require('./model/subject');


// GET de todos los students
exports.getStudents = function(req,res){
    Student.find(
        function(err,student){
            if(err) {
                res.send(err);
            }
            res.json(student);
        }
    );
}

// GET de todas las asignaturas
exports.getSubjects = function(req,res){
    Subject.find(
        function(err,subject){
            if(err) {
                res.send(err);
            }
            res.json(subject);
        }
    );
}

// POST que crea un Student y devuelve todos tras la creación
exports.setStudent = function(req,res){
    //Creo el objeto Student
    Student.create(
        {
            name : req.body.name,
            address : req.body.address,
            phones: {
                home: req.body.phones.home,
                work: req.body.phones.work},
            done: false
        },
        function(err,student){
            if(err){
                res.send(err);
            }

            //Obtiene y devuelve todas las tareas una vez a creado esa
            Student.find(function(err,student){
                if(err){
                    res.send(err)
                }
                res.json(student)
            });
        }
    );
}

// POST que crea un Subject y devuelve todos tras la creación
exports.setSubject = function(req,res){
    //Creo el objeto Subject
    Subject.create(
        {
            name : req.body.name,
            students : req.body.students
        },
        function(err,subject){
            if(err){
                res.send(err);
            }

            //Obtiene y devuelve todas las tareas una vez a creado esa
            Subject.find(function(err,subject){
                if(err){
                    res.send(err)
                }
                res.json(subject)
            });
        }
    );
}


// DELETE un Student específico y devuelve todos tras borrarlo.
exports.removeStudent = function(req,res){
    Student.remove({_id: req.params.student_id}, function(err,student){
        if (err){
            res.send(err)
        }

        //Obtengo y devuelvo todas las tareas tras borrar un student
        Student.find(function(err,student){
            if (err){
                res.send(err)
            }
            res.json(student)
        });
    });
}

// DELETE una Asignatura específica y devuelve todos tras borrarlo.
exports.removeSubject = function(req,res){
    Subject.remove({_id: req.params.subject_id}, function(err,subject){
        if (err){
            res.send(err)
        }

        //Obtengo y devuelvo todas las tareas tras borrar un student
        Subject.find(function(err,subject){
            if (err){
                res.send(err)
            }
            res.json(subject)
        });
    });
}



// POST que añade un estudiante a una subject y devuelve todos tras la creación
// Guarda un objeto Persona en base de datos
exports.addStudent = function(req, res) {
    Subject.update({_id : req.params.subject_id}, {$set: {students : req.body.students}},
    function (err,subject){
        if (err){
            res.send(err);
        }

        Subject.find(function(err,subject){
            if (err){
                res.send(err)
            }
            res.json(subject)
        });
    });
}