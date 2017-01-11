app.config(($routeProvider) => {
  $routeProvider
  .when('/login',       login_conf())
  .when('/waitingroom', waiting_room_conf())
  .otherwise({ redirectTo: '/login' })
})

const login_conf = () => {
  return {
    templateUrl:  'src/html/login.html',
    controller:   'LoginController'
  }
}

const waiting_room_conf = () => {
  return {
    templateUrl:  'src/html/waiting_room.html',
    controller:   'WaitingRoomController'
  }
}
