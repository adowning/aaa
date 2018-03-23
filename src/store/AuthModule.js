//  import firebase from "firebase"
// import * as firebase from "firebase"
import { defaultStore } from "../components/firebaseInit";
import axios from "axios";
// var deputyService = axios.create({
//   baseURL: 'https://054b6b12055851.na.deputy.com/api/v1',
//   timeout: 1000,
//   headers: {'Authorization': 'Oauth 89baa4d77fde8740da6e1e716595a198'}
// });
if (process.env.NODE_ENV == "devbbelopment") {
  console.log(process.env.NODE_ENV);
  var fireFunctions = axios.create({
    baseURL: "http://localhost:5001/andrewsadmin/us-central1",
    timeout: 8000,
    ContentType: "application/json"
  });
} else {
  console.log(process.env.NODE_ENV);

  var fireFunctions = axios.create({
    baseURL:
      "https://us-central1-andrewsadmin.cloudfunctions.net/getUserFromHumanity",
    timeout: 8000,
    ContentType: "application/json"
  });
}
const AuthModule = {
  state: {
    user: null,
    currentTimeSheet: null,
    isLoggedIn: null
  },
  mutations: {
    setUser(state, payload) {
      console.log(payload);
      state.user = payload;
    }
  },
  actions: {
    signUserOut({ commit }, payload) {
      commit("setLoading", true);
      firebase.databaseURL = "https://andrewsadmin.firebaseio.com";
      firebase
        .auth()
        .signOut()
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    },
    signUserIn({ commit }, payload) {
      console.log(payload);
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, "Andrews1")
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
          return;
        })
        .then(user => {
          console.log(user.email);
          fireFunctions
            .post("/getUserFromHumanity", {
              email: user.email
            })
            .then(response => {
              console.log(response);
              commit("setUser", response);
            });
        })
        .catch(error => {
          console.log(error);
        });
    },

    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.pass)
        .then(user => {
          firebase
            .database()
            .ref("users")
            .child(user.uid)
            .set({
              name: payload.username,
              displayName: payload.username,

              photoURL:
                "https://firebasestorage.googleapis.com/v0/b/andrewsadmin.appspot.com/o/profilePhotos%2Fno_avatar.png?alt=media&token=f3564aff-adea-4cd6-baa2-de0028472437"
            })
            .then(message => {
              commit("setLoading", false);
              const newUser = {
                id: user.uid,
                username: payload.username
              };
              commit("setUser", newUser);
            })
            .catch(error => {
              commit("setLoading", false);
              commit("setError", error);
            });
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    currentTimeSheet(state) {
      return state.currentTimeSheet;
    }
  }
};

export default AuthModule;
