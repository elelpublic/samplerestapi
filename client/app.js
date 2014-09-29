var app = angular.module( 'booksApp', [ 'ngRoute', 'ngResource' ] );

// factories for services
app.factory('BooksFactory', function ($resource) {
  return $resource('/api/books', {}, {
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
});

app.factory('BookFactory', function ($resource) {
  return $resource('/api/books/:id', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT', params: {id: '@_id'} },
      delete: { method: 'DELETE', params: {id: '@_id'} }
  })
});

app.factory('AlertService', function () {
  return {
    msg: null,
    displayCount: 0,
    showMessage: function( message ) {
      this.msg = message;
      this.displayCount = 1;
    },
    messageDisplayed: function() {
      this.displayCount--;
      if( this.displayCount < 0 ) {
        this.msg = null;
      }
    },
    message: function() {
      return this.msg;
    }
  }
});

// routing
app.config( [ '$routeProvider', function( $routeProvider ) {
  
  // routes definieren
  $routeProvider.when( '/', {
    templateUrl: 'main.html',
    controller: 'MainController'
  }).when( '/books', {
    templateUrl: 'books.html',
    controller: 'BooksController'
  }).when( '/books/:bookId', {
    templateUrl: 'book.html',
    controller: 'BookController'
  }).when( '/books/edit/:bookId', {
    templateUrl: 'edit.html',
    controller: 'EditController'
  });
  
}]);

// controllers
app.controller( 'IndexController', [ '$scope', '$rootScope', 'AlertService',
  function( $scope, $rootScope, AlertService ) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
      AlertService.messageDisplayed();
    });
    $rootScope.AlertService = AlertService;
  }]
);

app.controller( 'MainController', function() {});

app.controller( 'BooksController', [ '$scope', 'BooksFactory'
  , function( $scope, BooksFactory ) {

  $scope.search = function() {
    $scope.books = BooksFactory.query();
  }
  
  // for faster results, auto search on load:
  $scope.search();
  
}]);

app.controller('BookController', [ '$scope', '$routeParams', 'BookFactory', '$rootScope', 
  function( $scope, $routeParams, BookFactory, $rootScope ) {
  
  var bookId = $routeParams.bookId;
  $scope.book = BookFactory.show( { id: bookId } );
  
}]);

app.controller('EditController', [ '$scope', '$routeParams', 'BookFactory', '$location', 'AlertService',
  function( $scope, $routeParams, BookFactory, $location, AlertService ) {
  
  var bookId = $routeParams.bookId;
  $scope.book = BookFactory.show( { id: bookId } );
  
  $scope.saveBook = function () {
      BookFactory.update( $scope.book );
      $location.path('/books/' + $scope.book._id );
      AlertService.showMessage( 'Book was saved.' );
  };
  
}]);

