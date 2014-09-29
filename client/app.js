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
  }).when( '/books/edit/:bookId', {
    templateUrl: 'edit.html',
    controller: 'EditController'
  });
  
});

// controllers
app.controller('MainController', function( $scope ) {} );
app.controller('BooksController', [ '$scope', 'BooksFactory', function( $scope, BooksFactory ) {
  
  $scope.search = function() {
    $scope.books = BooksFactory.query();
  }
  
  // for faster results, auto search on load:
  $scope.search();
  
}]);
app.controller('BookController', [ '$scope', '$routeParams', 'BookFactory', 
                                   function( $scope, $routeParams, BookFactory ) {
  
  var bookId = $routeParams.bookId;
  $scope.book = BookFactory.show( { id: bookId } );
  
}]);
app.controller('EditController', [ '$scope', '$routeParams', 'BookFactory', '$location',
                                   function( $scope, $routeParams, BookFactory, $location ) {
  
  var bookId = $routeParams.bookId;
  $scope.book = BookFactory.show( { id: bookId } );
  
  $scope.saveBook = function () {
      BookFactory.update( $scope.book );
      $location.path('/books/' + $scope.book._id );
  };
  
}]);

