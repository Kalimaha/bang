app.controller('GameController', function($scope, $routeParams, $http, $cookies, $cookieStore, logoutService) {
  logoutService.build_logout($cookies, $cookieStore)

  $('#game_id').html(`Game ${$routeParams.id}`)
});
