app.controller('PreGameController', function($scope, $routeParams, $http, $cookies, $cookieStore, logoutService) {
  logoutService.build_logout($cookies, $cookieStore)

  $('#game_id').html(`Game ${$routeParams.id}`)

  const game_id = $routeParams.id
  firebase.database().ref(`games/${game_id}/players`).on('value', (snapshot) => {
    $('#pregame_players').empty()

    snapshot.forEach(p => { $('#pregame_players').append(format_pregame_player(p.val())) })
  })

  $scope.select_all = () => $('input').prop('checked', $('#select_all').is(':checked'))
  $scope.start_game = () => {
    get_non_selected_players().forEach((u) => firebase.database().ref(`games/${game_id}/players/${u}`).remove())

    window.location = `#!/games/${game_id}`
  }
});

const format_pregame_player = (player) => `
  <tr>
    <td>
      <input type="checkbox" checked id="${player.id}">
    </td>
    <td valign="middle">
      ${player.name}
    </td>
    <td valign="middle">
      <img class="img-responsive minime" src="${player.picture}">
    </td>
  </tr>
`

const get_non_selected_players = () => {
  const non_selected_players = []

  for (cb of $('input')) {
    if ($(cb).attr('id') !== 'select_all' && !$(cb).is(':checked')) {
      non_selected_players.push($(cb).attr('id'))
    }
  }

  return non_selected_players
}
