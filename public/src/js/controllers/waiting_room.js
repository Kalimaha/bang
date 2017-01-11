app.controller('WaitingRoomController', function($scope, $routeParams, $http, $cookies, $cookieStore, logoutService) {
  logoutService.build_logout($cookies, $cookieStore)
});
