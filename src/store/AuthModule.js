import { defaultStore } from "../components/firebaseInit";
import axios from "axios";
import moment from "moment";
// const api = axios.create({
//   baseURL: "https://node-red.ashdevtools.com/api",
//   timeout: 8000
// });

// if (process.env.NODE_ENV == "devbbelopment") {
//   console.log(process.env.NODE_ENV);
// var fireFunctions = axios.create({
//   baseURL: "http://localhost:5001/andrewsadmin/us-central1",
//   timeout: 8000,
//   ContentType: "application/json"
// });
// } else {
//   console.log(process.env.NODE_ENV);

// var fireFunctions = axios.create({
//   baseURL:
//     "https://us-central1-andrewsadmin.cloudfunctions.net/getUserFromHumanity",
//   timeout: 8000,
//   ContentType: "application/json"
// });
// }
const AuthModule = {
  state: {
    user: null,
    currentTimeSheet: null,
    isLoggedIn: null
  },
  mutations: {
    setUser(state, payload) {
      // console.log(payload)
      if (payload) {
        state.user = payload.user;
        state.currentTimeSheet = payload.ts.data;
      } else {
        state.user = null;
        state.currentTimeSheet = null;
      }
    },
    setTimeClock(state, payload) {
      state.currentTimeSheet = payload;
    }
  },
  actions: {
    adjustTimeClock({ commit }, payload) {
      console.log(payload.currentTimeSheet);

      axios
        .post("https://58384bf4.ngrok.io/red/api/clock", {
          id: payload.employeeId,
          notes: payload.notes
        })
        .then(response => {
          console.log(response);
          commit("setTimeClock", response.data.data);
          // commit("setTimeClock", "out");
        })
        .catch(error => {
          console.log(error);
        });
    },

    signUserOut({ commit }, payload) {
      commit("setLoading", true);
      // firebase.databaseURL = "https://andrewsadmin.firebaseio.com";
      firebase
        .auth()
        .signOut()
        .then(x => {
          console.log(x);
          commit("setUser", null);
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    },
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      var $this = this;
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
          return;
        })
        .then(user => {
          console.log("new " + user.email);
          axios
            .post(
              // "https://bc3d9327.ngrok.io:1880/api/humanity/updateClockStatus",
              "https://58384bf4.ngrok.io/red/api/login",
              {
                email: user.email
              }
            )
            .then(response => {
              console.log(response.data);
              commit("setUser", response.data);
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
