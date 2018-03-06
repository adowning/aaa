//  import firebase from "firebase"
// import * as firebase from "firebase"
import firebase from "../components/firebaseInit"
const AuthModule = {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      const userListRef = firebase.database().ref("presence")
      const myUserRef = userListRef.push()

      firebase
        .database()
        .ref(".info/connected")
        .on("value", function(snap) {
          if (snap.val()) {
            // if we lose network then remove this user from the list
            myUserRef.onDisconnect().remove()
            // set user's online status
            let presenceObject = { user: payload, status: "online" }
            myUserRef.set(presenceObject)
          } else {
            // client has lost network
            let presenceObject = { user: payload, status: "offline" }
            myUserRef.set(presenceObject)
          }
        })
    },
  },
  actions: {
    signUserIn({ commit }, payload) {
      commit("setLoading", true)
      firebase.databaseURL = "https://andrewsadmin.firebaseio.com"
      firebase
        .auth()
        .signInWithEmailAndPassword("d@d.com", "asdfasdf")
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
        })
        .then(user => {
          firebase
            .database()
            .ref("users")
            .child(user.uid)
            .once("value", function(data) {
              commit("setLoading", false)
              // console.log(data.val().DisplayName)
              const newUser = {
                id: user.uid,
                username: data.val().username,
                photoURL: data.val().photoURL,
                email: data.val().email,
              }
              commit("setUser", newUser)
            })
        })
        .catch(error => {
          console.log(error)
          commit("setLoading", false)
          commit("setError", error)
        })
    },
  },
  // signUserUp ({commit}, payload) {
  //   commit('setLoading', true)
  //   commit('clearError')
  //   firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
  //     .then(
  //       user => {
  //         firebase.database().ref('users').child(user.uid).set({
  //           name: payload.username
  //         })
  //           .then(
  //             message => {
  //               commit('setLoading', false)
  //               const newUser = {
  //                 id: user.uid,
  //                 username: payload.username
  //               }
  //               commit('setUser', newUser)
  //             }
  //           )
  //           .catch(
  //             error => {
  //               commit('setLoading', false)
  //               commit('setError', error)
  //             }
  //           )
  //       }
  //     )
  //     .catch(
  //       error => {
  //         commit('setLoading', false)
  //         commit('setError', error)
  //       }
  //     )
  // },
  getters: {
    user(state) {
      return state.user
    },
  },
}

export default AuthModule
