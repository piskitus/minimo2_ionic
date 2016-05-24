// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute']);

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'views/home.html',
            controller  : 'mainController'
        })
        .when('/students', {
            templateUrl : 'views/students.html',
            controller  : 'studentsController'
        })
        .when('/subjects', {
            templateUrl : 'views/subjects.html',
            controller  : 'subjectController'
        })
        .otherwise({
            redirectTo: '/'
        });
});



angularRoutingApp.controller('mainController', function($scope) {
    $scope.message = 'Página principal!';
});



angularRoutingApp.controller('studentsController', function($scope, $http) {
    $scope.message = 'Formulario para añadir estudiantes';
    $scope.newStudent = {};
    $scope.students = {};
    $scope.selected = false;

    // Obtenemos todos los estudiantes
    $http.get('/api/student').success(function(data) {
            $scope.students = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


    // Función para registrar estudiante
    $scope.createStudent = function() {
        $http.post('/api/student', $scope.newStudent)
            .success(function(data) {
                $scope.newStudent = {}; // Borramos los datos del formulario
                $scope.students = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Función para eliminar estudiante
    $scope.deleteStudent = function(id) {
        $http.delete('/api/student/' + id)
            .success(function(data) {
                $scope.newStudent = {};
                $scope.students = data;
                $scope.selected = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Función para editar los datos de una persona
   /* $scope.modificarPersona = function(newPersona) {
        $http.put('/api/persona/' + $scope.newPersona._id, $scope.newPersona)
            .success(function(data) {
                $scope.newPersona = {}; // Borramos los datos del formulario
                $scope.personas = data;
                $scope.selected = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
*/
});

angularRoutingApp.controller('subjectController', function($scope, $http) {
    $scope.message = 'Formulario para añadir asignaturas';
    $scope.newSubject = {};
    $scope.subjects = {};
    $scope.selected = false;

    // Obtenemos todos los datos de la base de datos
    $http.get('/api/subject').success(function(data) {
            $scope.subjects = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Función para añadir asignatura
    $scope.createSubject = function() {
        $http.post('/api/subject', $scope.newSubject)
            .success(function(data) {
                $scope.newSubject = {}; // Borramos los datos del formulario
                $scope.subjects = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Función para eliminar asignatura
    $scope.deleteSubject = function(id) {
        $http.delete('/api/subject/' + id)
            .success(function(data) {
                $scope.newSubject = {};
                $scope.subjects = data;
                $scope.selected = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


    // Función para añadir alumno a asignatura
    $scope.addStudent = function(newSubject) {
        $http.put('/api/subject/' + $scope.newSubject._id, $scope.newSubject).success(function(data) {
                $scope.newSubject = {}; // Borramos los datos del formulario
                $scope.subjects = data;
                $scope.selected = false;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Función para coger el objeto seleccionado en la tabla
    $scope.selectSubject = function(subject) {
        $scope.newSubject = subject;
        $scope.selected = true;
        console.log($scope.newSubject, $scope.selected);
    };
});