//  import firebase from "firebase"
// import * as firebase from "firebase"
import firebase from "../components/firebaseInit"
import axios from "axios"
var humanityService = axios.create({
    baseURL: "http://47.219.112.177:1880/api/humanity",
    timeout: 8000,
  })

const AuthModule = {
  state: {
    clockStatus: null,
    currentTimeSheet: null,
    isClockedIn: null,
  },
  mutations: {
    setClockStatus(state, payload) {
      state.clockStatus = payload
      if (!payload || payload == "undefined") {
        state.user.isClockedIn = false
      } else {
        state.user.isClockedIn = true
      }
    },
  },
  actions: {
    updateClockStatus({ commit }, payload) {
      commit("setClockStatus", payload)
    },
    clockUserOutHumanity({ commit }, payload) {
      commit("setLoading", true)

      humanityService
        .post("/timesheet/", {
          intEmployeeId: 1,
          intOpunitId: 3,
          action: "end",
        })
        .then(response => {
          if (response.data.code == 702) {
            commit("setClockStatus", response.data.timesheet)
          }
          if (response.data.code == 705) {
            console.log("employee was not clocked in")
          }
        })
        .catch(error => {
          console.log(error)
 
        })
    },
    clockUserInHumanity({ commit }, payload) {

      commit("setLoading", true)
      humanityService
        .post("/timesheet/", {
          intEmployeeId: 1,
          intOpunitId: 3,
          action: "start",
        })
        .then(response => {
          if (response.data.code == 700) {
            commit("setClockStatus", response.data.timesheet)
          }
        })
        .catch(error => {
          console.log(error)
          if (error == 400) {
            console.log("already clockec in")
          }
        })
    },
  },
}

export default HumanityModule
