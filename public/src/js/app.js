const app = angular.module('Bang', ['ngRoute', 'ngCookies'])

const firebase_configuration = {
  apiKey:             'AIzaSyBc3bORg-2gQce1ERIA_XpxsRfE7cwiX2s',
  authDomain:         'bang-a47d6.firebaseapp.com',
  databaseURL:        'https://bang-a47d6.firebaseio.com',
  storageBucket:      'bang-a47d6.appspot.com',
  messagingSenderId:  '912109231812'
}

firebase.initializeApp(firebase_configuration)

const logout = () => {
  firebase.auth().signOut()
  $('#login_area').empty()
  window.location = '#!/login'
  // $('#game_id').html('Bang!')
}
