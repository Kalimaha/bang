app.controller('GameController', function($scope, $routeParams, $http, $cookies, $cookieStore, $controller) {
  angular.extend(this, $controller('CommonController', { $scope: $scope }));

  $('#game_id').html(`Game ${$routeParams.id}`)
});
