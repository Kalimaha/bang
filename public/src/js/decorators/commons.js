app.config(['$provide', function($provide) {
  $provide.decorator('$controller', ['$delegate',  function($delegate) {
    return function(constructor, locals) {
      $('#game_id').html('Bang!')

      return $delegate(constructor, locals);
    }
  }])
}])
