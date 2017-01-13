app.controller('WaitingRoomController', function($scope, $routeParams, $http, $cookies, $cookieStore, $controller, DB) {
  angular.extend(this, $controller('CommonController', { $scope: $scope }));

  $scope.create_game = () => {
    const game_id = create_game_id()

    DB.selectOnce(`games/${game_id}`).then((snapshot) => {
      if (snapshot.val() === null)  { create_game(game_id) }
      else                          { $scope.create_game() }
    })
  }

  $scope.join_game = () => {
    const game_id = $('#existing_game_id').val()

    if (game_id === undefined || game_id.length < 4) { log('The Game ID must have 4 digits, e.g. 1234.') }
    else {
      DB.selectOnce(`games/${game_id}`).then((snapshot) => {
        $('#error_message').css('display', 'none')

        if (snapshot.val() === null)  { log(`There is no Game available with ID "${game_id}".`) }
        else                          { update_game(game_id) }
      })
    }
  }

  const update_game = (game_id) => {
    const new_player  = game_player()
    const table       = `games/${game_id}/players/${$cookieStore.get('user').id}`

    DB.update(table, new_player).then(() => window.location = `#!/pregames/${game_id}`)
  }

  const create_game_id = () => {
    const game_id = Math.floor(10000 * Math.random()).toString()
    if (game_id.length < 4) { return `0${game_id}` }

    return game_id
  }

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
      'picture': $cookieStore.get('user').picture,
      'status': 'ALIVE'
    }
  }

  const user_id     = () => $cookieStore.get('user').id
  const log         = (error) => $('#error_message').css('display', 'block').html(error)
  const create_game = (game_id) => DB.insert(`games/${game_id}`, empty_game()).then(() => window.location = `#!/pregames/${game_id}`)
});
