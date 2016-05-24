angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})



.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('StudentsCtrl', function($scope, $ionicModal, $http, ApiEndpoint) {
    $scope.message = 'Formulario para añadir estudiantes';
    $scope.newStudent = {};
    $scope.students = {};
    $scope.selected = false;

    // Obtenemos todos los estudiantes
    $http.get(ApiEndpoint.url+'/student').success(function(data) {
        $scope.students = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });


    // Función para registrar estudiante
    $scope.createStudent = function() {
      $http.post(ApiEndpoint.url+'/student', $scope.newStudent)
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
      $http.delete(ApiEndpoint.url+'/student/' + id)
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
  })

  //##########################################################################################################
  //CONTROLADOR PARA ASIGNATURAS
  .controller('SubjectsCtrl', function($scope, $ionicModal, $http, ApiEndpoint) {
    $scope.message = 'Formulario para añadir asignaturas';
    $scope.newSubject = {};
    $scope.subjects = {};
    $scope.selected = false;

    // Obtenemos todos los datos de la base de datos
    $http.get(ApiEndpoint.url+'/subject').success(function(data) {
        $scope.subjects = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

    // Función para añadir asignatura
    $scope.createSubject = function() {
      $http.post(ApiEndpoint.url+'/subject', $scope.newSubject)
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
      $http.delete(ApiEndpoint.url+'/subject/' + id)
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
      $http.put(ApiEndpoint.url+'/subject/' + $scope.newSubject._id, $scope.newSubject).success(function(data) {
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
  })

.constant('ApiEndpoint',{
  url: 'http://localhost:8000/api'
});


