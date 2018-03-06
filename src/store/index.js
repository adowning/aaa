import Vue from "vue"
import Vuex from "vuex"
import * as firebase from "firebase"
import AuthModule from "./AuthModule"
// import ChatModule from "./ChatModule"
import VuexPersist from "vuex-persist"

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
  },
  plugins: [vuexLocalStorage.plugin],
})
export default store
