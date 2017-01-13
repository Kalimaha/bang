app.factory('DB', () => {
  return {
    selectOnce: (table) => {
      return firebase.database().ref(table).once('value')
    },
    selectListen: (table, callback) => firebase.database().ref(table).on('value', callback),
    update: (table, value) => {
      return firebase.database().ref(table).update(value)
    },
    insert: (table, value) => {
      return firebase.database().ref(table).set(value)
    },
    delete: (table) => {
      return firebase.database().ref(table).remove()
    }
  }
})
