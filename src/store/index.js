import Vue from "vue"
import Vuex from "vuex"
import firebase from "../components/firebaseInit"
import AuthModule from "./AuthModule"
// import ChatModule from "./ChatModule"
import VuexPersist from "vuex-persist"
import axios from 'axios'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: "vuex", // The key to store the state on in the storage provider.
  storage: window.sessionStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth: AuthModule,
    // chat: ChatModule,
  },
  state: {
    loading: false,
    error: null,
    onlineUsers: [],
    myData: {}
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    },
    setOnlineUsers(state, payload) {
      state.onlineUsers = payload
    },
    setMyData(state, payload) {
      state.myData = payload
    },
  },
  actions: {
    loadOnlineUsers({ commit }) {
      firebase
        .database()
        .ref("presence")
        .on("value", function(snapshot) {
          let result = []
          result[0] = snapshot.numChildren()
          result[1] = snapshot.val()
          commit("setOnlineUsers", result)
        })
    },
    loadMyData({ commit }, payload) {
      commit("setLoading", true)
      console.log('loading')
      axios
        .get("http://47.219.112.177:1880/api/login")
        .then(result => {
          commit("setMyData", result.data)
          commit("setLoading", false)
        })
        .catch(error => {
          console.log(error)
          commit("setLoading", false)
        })
    },
    clearError({ commit }) {
      commit("clearError")
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    },
    onlineUsers(state) {
      return state.onlineUsers
    },
    myData(state) {
      return state.myData
    },
  },
  plugins: [vuexLocalStorage.plugin],
})
export default store
