app.controller('LoginController', function($scope, $routeParams, $http, $cookies, $cookieStore, DB) {
  const providers = {
    'google': new firebase.auth.GoogleAuthProvider(),
    'facebook': new firebase.auth.FacebookAuthProvider(),
    'twitter': new firebase.auth.TwitterAuthProvider(),
    'github': new firebase.auth.GithubAuthProvider()
  }

  $scope.login = (provider) => firebase.auth().signInWithRedirect(providers[provider])

  $scope.logout = () => {
    firebase.auth().signOut()

    window.location = '#!/login'
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $cookies.user = bang_user(user)
      $cookieStore.put('user', bang_user(user), { expires: new Date(2017, 1, 1) })

      DB.insert(`users/${$cookies.user.id}`, $cookieStore.get('user'))
      window.location = '#!/waitingroom'
    }
  })

  const bang_user = (user) => {
    return {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      picture: user.photoURL
    }
  }

  firebase.auth().getRedirectResult().catch((e) => $('#error_message').css('display', 'block'))
})
