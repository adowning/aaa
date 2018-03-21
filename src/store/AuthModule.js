//  import firebase from "firebase"
// import * as firebase from "firebase"
import firebase from "../components/firebaseInit";
import axios from "axios";
// var deputyService = axios.create({
//   baseURL: 'https://054b6b12055851.na.deputy.com/api/v1',
//   timeout: 1000,
//   headers: {'Authorization': 'Oauth 89baa4d77fde8740da6e1e716595a198'}
// });
var humanityService = axios.create({
  baseURL: "http://47.219.112.177:1880/api/humanity",
  timeout: 8000
});

const AuthModule = {
  state: {
    user: null,
    currentTimeSheet: null,
    isLoggedIn: null
  },
  mutations: {
    setUser(state, payload) {
      var _user = payload.user.data.data;
      var tc = payload.user.data.timeclock;
      console.log(_user);
      console.log(tc);
      _user.timesheet = tc;
      state.user = _user;
      state.currentTimeSheet = tc;
      const userListRef = firebase.database().ref("presence");
      const myUserRef = userListRef.push();
      firebase.databaseURL = "https://andrewsadmin.firebaseio.com";
      console.log(_user);

      // state.curre/ntTimeSheet = payload.timeSheet;
      // console.log(myData, state, payload);
      firebase
        .database()
        .ref(".info/connected")
        .on("value", function(snap) {
          if (snap.val()) {
            // if we lose network then remove this user from the list
            myUserRef.onDisconnect().remove();
            // myUserRef.signOut().remove()
            // set user's online status
            let presenceObject = { user: _user.email, status: "online" };
            myUserRef.set(presenceObject);
          } else {
            // client has lost network
            let presenceObject = {
              user: _user.email,
              status: "offline"
            };
            myUserRef.set(presenceObject);
          }
        });
    }
  },
  actions: {
    // updateClockStatus({ commit }, payload) {
    //   humanityService
    //     .post("/updateClockStatus/", {
    //       // intEmployeeId: payload.id,
    //       // intOpunitId: 3
    //       id: payload.id
    //     })
    //     .then(response => {
    //       commit("setUser", response);
    //       // firebase
    //       //   .database()
    //       //   .ref("users")
    //       //   .push(payload.id)
    //       //   .update({
    //       //     humanityData: response.data.data
    //       //   })
    //       //   .then(user => {
    //       //     console.log(payload);
    //       //     commit("setUser", payload);
    //       //   });
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },

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
        .signInWithEmailAndPassword(payload.user.data.data.email, "asdfasdf")
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
          return;
        })
        .then(user => {
          commit("setUser", payload);
        })
        .catch(error => {
          console.log(error);
        });
      // firebase
      //   .database()
      //   .ref("users")
      //   .child(user.uid)
      //   .once("value", function(data) {
      //     commit("setLoading", false);
      // updateClockStatus(user)

      // var un = "";
      // try {
      //   un = data.val().username;
      // } catch (err) {
      //   un = "myusernamesux";
      // }
      // var pURL = "";
      // try {
      //   pURL = data.val().photoURL;
      // } catch (err) {
      //   pURL =
      //     "https://firebasestorage.googleapis.com/v0/b/andrewsadmin.appspot.com/o/profilePhotos%2Fno_avatar.png?alt=media&token=f3564aff-adea-4cd6-baa2-de0028472437";
      // }

      // const newUser = {
      //   id: user.uid,
      //   username: un,
      //   photoURL: pURL,
      //   email: data.val().email
      // };
      // commit("setUser", newUser);
      // });
      // })
      // .catch(error => {
      //   console.log(error);
      //   commit("setLoading", false);
      //   commit("setError", error);
      // });
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
// clockUserOutDeputy({ commit }, payload) {
//   var deputyService = axios.create({
//     baseURL: "http://47.219.112.177:1880/api/deputy",
//     // baseURL: 'https://054b6b12055851.na.deputy.com/api/v1',
//     timeout: 5000
//     // headers: {'Authorization': 'OAuth 89baa4d77fde8740da6e1e716595a198'}
//   });

//   commit("setLoading", true);

//   deputyService
//     .post("/timesheet/", {
//       intEmployeeId: 1,
//       intOpunitId: 3,
//       action: "end"
//     })
//     .then(response => {
//       if (response.data.code == 702) {
//         commit("setTimeSheet", response.data.timesheet);
//       }
//       if (response.data.code == 705) {
//         // commit("setTimeSheet", response.data.timesheet)
//         console.log("employee was not clocked in");
//       }
//     })
//     .catch(error => {
//       console.log(error);
//       // if(error.response.status == 400){
//       //     console.log('houston we have a problem')
//       // }
//     });
// },
// clockUserInDeputy({ commit }, payload) {
//   var deputyService = axios.create({
//     baseURL: "http://47.219.112.177:1880/api/deputy",
//     // baseURL: 'https://054b6b12055851.na.deputy.com/api/v1',
//     timeout: 5000,
//     headers: { Authorization: "OAuth 89baa4d77fde8740da6e1e716595a198" }
//   });

//   commit("setLoading", true);
//   deputyService
//     .post("/timesheet/", {
//       intEmployeeId: 1,
//       intOpunitId: 3,
//       action: "start"
//     })
//     .then(response => {
//       if (response.data.code == 700) {
//         commit("setTimeSheet", response.data.timesheet);
//       }
//     })
//     .catch(error => {
//       console.log(error);
//       if (error == 400) {
//         console.log("already clockec in");
//       }
//     });
// },
