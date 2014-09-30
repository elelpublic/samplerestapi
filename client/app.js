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

app.value( 'FlashValue', {
  message: null,
  severity: null,
  displayCount: 0
});

app.factory('FlashService', [ 'FlashValue', function ( FlashValue ) {
  return {
    success: function( message ) {
      this.showMessage( message, 'alert-success' );
    },
    showMessage: function( message, severity ) {
      FlashValue.message = message;
      FlashValue.severity = severity;
      FlashValue.displayCount = 1;
    },
    messageDisplayed: function() {
      FlashValue.displayCount--;
      if( FlashValue.displayCount < 0 ) {
        FlashValue.message = null;
      }
    },
    message: function() {
      return FlashValue.message;
    },
    severity: function() {
      return FlashValue.severity;
    }
  }
}]);

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
  }).when( '/books/:bookId/edit', {
    templateUrl: 'edit.html',
    controller: 'EditController'
  });
  
}]);

// controllers
app.controller( 'IndexController', [ '$scope', '$rootScope', 'FlashService',
  function( $scope, $rootScope, FlashService ) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
      FlashService.messageDisplayed();
    });
    $rootScope.FlashService = FlashService;
  }]
);

app.controller( 'MainController', function() {});

app.controller( 'BooksController', [ '$scope', 'BooksFactory', '$location', 'FlashService',
  function( $scope, BooksFactory, $location, FlashService ) {

  $scope.search = function() {
    $scope.books = BooksFactory.query();
  };
  
  $scope.addBook = function() {
    $scope.book = BooksFactory.create({name:'Untitled'});
    FlashService.success( 'Book was created.' );
    $location.path('/books/' + $scope.book._id );
  };
  
  // for faster results, auto search on load:
  $scope.search();
  
}]);

app.controller('BookController', [ '$scope', '$routeParams', 'BookFactory', '$rootScope', '$location', 'FlashService', 
  function( $scope, $routeParams, BookFactory, $rootScope, $location, FlashService ) {
  
  var bookId = $routeParams.bookId;
  $scope.book = BookFactory.show( { id: bookId } );
  
  $scope.deleteBook = function() {
    BookFactory.delete( { id: $scope.book._id } );
    $location.path('/books/' );
    FlashService.success( 'Book was deleted.' );
  };
  
}]);

app.controller('EditController', [ '$scope', '$routeParams', 'BookFactory', '$location', 'FlashService',
  function( $scope, $routeParams, BookFactory, $location, FlashService ) {
  
  var bookId = $routeParams.bookId;
  $scope.book = BookFactory.show( { id: bookId } );
  
  $scope.saveBook = function () {
      BookFactory.update( $scope.book );
      $location.path('/books/' + $scope.book._id );
      FlashService.success( 'Book was saved.' );
  };
  
}]);

