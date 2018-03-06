// import something here
import firebase from "firebase"
// leave the export, even if you don't use it

const config = {
  firebase_config: {
    apiKey: "AIzaSyDdspiJ0VAnGLeyRziofRCSld1bpBoms7E",
    authDomain: "andrewsadmin.firebaseapp.com",
    databaseURL: "https://andrewsadmin.firebaseio.com",
    projectId: "andrewsadmin",
    storageBucket: "andrewsadmin.appspot.com",
    messagingSenderId: "734746045873",
  },
  firebase_config_dev: {
    apiKey: "AIzaSyCToZkYXXVQlHFqTEW8BVp5CW4R9LZ4wdg",
    authDomain: "andrewsadmin-dev.firebaseapp.com",
    databaseURL: "https://andrewsadmin-dev.firebaseio.com",
    projectId: "andrewsadmin-dev",
    storageBucket: "",
    messagingSenderId: "108498131250",
  },
}
import store from "../store"
// const firebaseApp = firebase.initializeApp(config.firebase_config)

export default ({ app, Vue, router }) => {
  // something to do
  //TODO fix  const firebaseApp = firebase.initializeApp(process.env.NODE_ENV !== 'production' ? config.firebase_config_dev : config.firebase_config)
  // console.log(firebaseApp)
  // Vue.prototype.$firebase = firebaseApp
}
