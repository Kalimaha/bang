app.controller('WaitingRoomController', function($scope, $routeParams, $http, $cookies, $cookieStore, logoutService) {
  logoutService.build_logout($cookies, $cookieStore)

  $scope.create_game = () => {
    const game_id = create_game_id()

    firebase.database().ref(game_id).once('value').then((snapshot) => {
      if (snapshot.val() === null)  { create_game(game_id) }
      else                          { $scope.create_game() }
    })
  }

  const create_game = (game_id) => {
    firebase.database()
            .ref(`games/${game_id}`)
            .set(empty_game())
            .then(() => {
              window.location = `#!/games/${game_id}`
            })
  }

  const create_game_id = () => {
    const game_id = Math.floor(10000 * Math.random()).toString()
    if (game_id.length < 4) { return `0${game_id}` }

    return game_id
  }

  const user_id = () => $cookieStore.get('user').id

  const empty_game = () => {
    const game = {
      status: 'WAITING',
      players: {}
    }
    game['players'][$cookieStore.get('user').id] = game_player()

    return game
  }

  const game_player = () => {
    return {
      'id': $cookieStore.get('user').id,
      'name': $cookieStore.get('user').name,
      'picture': $cookieStore.get('user').picture
    }
  }
});
