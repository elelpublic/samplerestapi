var app = angular.module( 'booksApp', [ 'ngRoute', 'ngResource' ] );

// factories for services
app.factory('BooksFactory', function ($resource) {
  return $resource('/api/books', {}, {
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
});

// routing
app.config( function( $routeProvider ) {
  
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
  });
  
});

// controllers
app.controller('MainController', function( $scope ) {} );
app.controller('BooksController', [ '$scope', 'BooksFactory', function( $scope, BooksFactory ) {
  
  $scope.search = function() {
    $scope.books = BooksFactory.query();
  }
  
}]);
app.controller('BookController', function( $scope, $routeParams ) {
  $scope.bookId = $routeParams.bookId;
});

