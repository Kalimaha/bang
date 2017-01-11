app.controller('LoginController', function($scope, $routeParams, $http, $cookies, $cookieStore) {
  const google_provider   = new firebase.auth.GoogleAuthProvider()
  const facebook_provider = new firebase.auth.FacebookAuthProvider()
  const twitter_provider  = new firebase.auth.TwitterAuthProvider()

  $scope.google_login   = () => firebase.auth().signInWithRedirect(google_provider)
  $scope.facebook_login = () => firebase.auth().signInWithRedirect(facebook_provider)
  $scope.twitter_login  = () => firebase.auth().signInWithRedirect(twitter_provider)

  $scope.logout = () => {
    firebase.auth().signOut()

    window.location = '#!/login'
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $cookies.user = bang_user(user)
      $cookieStore.put('user', bang_user(user), { expires: new Date(2017, 1, 1) })

      db().ref(`users/${$cookies.user.id}`).set($cookieStore.get('user'))

      redirect()
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

  const db = () => firebase.database()

  const redirect = () => window.location = '#!/waitingroom'

  firebase.auth().getRedirectResult().catch((e) => $('#error_message').css('display', 'block'))
})
