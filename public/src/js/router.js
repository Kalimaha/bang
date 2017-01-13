app.config(($routeProvider) => {
  $routeProvider
  .when('/login',         login_conf())
  .when('/waitingroom',   waiting_room_conf())
  .when('/pregames/:id',  pregame_conf())
  .when('/games/:id',     game_conf())
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

const game_conf = () => {
  return {
    templateUrl:  'src/html/game.html',
    controller:   'GameController'
  }
}

const pregame_conf = () => {
  return {
    templateUrl:  'src/html/pregame.html',
    controller:   'PreGameController'
  }
}
