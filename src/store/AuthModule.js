//  import firebase from "firebase"
// import * as firebase from "firebase"
import firebase from "../components/firebaseInit"
import axios from 'axios'
// var deputyService = axios.create({
//   baseURL: 'https://054b6b12055851.na.deputy.com/api/v1',
//   timeout: 1000,
//   headers: {'Authorization': 'Oauth 89baa4d77fde8740da6e1e716595a198'}
// });

const AuthModule = {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      const userListRef = firebase.database().ref("presence")
      const myUserRef = userListRef.push()
      firebase.databaseURL = "https://andrewsadmin.firebaseio.com"

      firebase
        .database()
        .ref(".info/connected")
        .on("value", function(snap) {
          if (snap.val()) {
            // if we lose network then remove this user from the list
            myUserRef.onDisconnect().remove()
            myUserRef.signOut().remove()
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
    clockUserInDeputy({ commit }, payload) {

      var deputyService = axios.create({
        baseURL: 'http://47.219.112.177:1880/api/deputy',
        timeout: 5000,
        headers: {'Authorization': 'Oauth 89baa4d77fde8740da6e1e716595a198'}
      });

      commit("setLoading", true)
      deputyService.post('/timesheet/saved/', 
        {'intemployeeId': 1, 'intOpunitId': 3}
      ).then((timeSheet) =>{
        console.log(timeSheet)
      })
      firebase.databaseURL = "https://andrewsadmin.firebaseio.com"
      firebase
        .auth()
        .signOut()
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          console.log(errorMessage)
        })
    },
    signUserOut({ commit }, payload) {
      commit("setLoading", true)
      firebase.databaseURL = "https://andrewsadmin.firebaseio.com"
      firebase
        .auth()
        .signOut()
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          console.log(errorMessage)
        })
    },
    signUserIn({ commit }, payload) {
      commit("setLoading", true)
      console.log(payload)
      firebase.databaseURL = "https://andrewsadmin.firebaseio.com"
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, "asdfasdf")
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          console.log(errorMessage)
          return
        })
        .then(user => {
          console.log(user)
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
  
  signUserUp({ commit }, payload) {
    commit("setLoading", true)
    commit("clearError")
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password, emp_id)
      .then(user => {
        firebase
          .database()
          .ref("users")
          .child(user.uid)
          .set({
            name: payload.username,
          })
          .then(message => {
            commit("setLoading", false)
            const newUser = {
              id: user.uid,
              username: payload.username,
              emp_id: payload.emp_id,
            }
            commit("setUser", newUser)
          })
          .catch(error => {
            commit("setLoading", false)
            commit("setError", error)
          })
      })
      .catch(error => {
        commit("setLoading", false)
        commit("setError", error)
      })
  }
},
  getters: {
    user(state) {
      return state.user
    },
  },
}

export default AuthModule
