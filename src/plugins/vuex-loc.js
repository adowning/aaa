// /* eslint-disable no-new,func-names */
// // import Vue from 'vue';
// // import Vuex from 'vuex';
// // import VuexGeolocation from "vuex-geolocation";
// // import GeolocationUtilities from './geolocation-utilities.js';
// // import Demo from './components/Demo.vue';
// // import store from "../store";

// // const store = new Vuex.Store({});
// // const getGeoDistance = function(start, end) {
// //     const deg2rad = deg => deg * (Math.PI / 180);
// //     const R = 6371;
// //     const dLat = deg2rad(end.lat - start.lat);
// //     const dLng = deg2rad(end.lng - start.lng);
// //     const a =
// //       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// //       Math.cos(deg2rad(start.lat)) *
// //         Math.cos(deg2rad(end.lat)) *
// //         Math.sin(dLng / 2) *
// //         Math.sin(dLng / 2);
// //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// //     return R * c * 1000;
// //   };
// // const vuexGeolocation = VuexGeolocation.sync(store);
// import VueGeolocation from "vue-browser-geolocation";
// export default ({ Vue }) => {
//   Vue.use(VueGeolocation);

//   //   const vuexGeolocation = VuexGeolocation.sync(store);
//   //   Vue.use(vuexGeolocation);
//   // Vue.use(GeolocationUtilities);
//   // Vue.prototype.$vuexLoc = vuexLoc
//   //   Vue.prototype.$getGeoDistance = this.getGeoDistance;
// };

// // import axios from 'axios'

// // export default ({ Vue }) => {

// //   var token =
// //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY4Zjg1MzAzNDlhMDhlNzAwODYyYzcwNDM5OTRjMDhhNTBlMWI2NGE0ZWYxNjA0NjM3ZjcwNjc4Y2QyYjViMmQyM2NmNTU0NzExYmMwNTg5In0.eyJhdWQiOiIxIiwianRpIjoiNjhmODUzMDM0OWEwOGU3MDA4NjJjNzA0Mzk5NGMwOGE1MGUxYjY0YTRlZjE2MDQ2MzdmNzA2NzhjZDJiNWIyZDIzY2Y1NTQ3MTFiYzA1ODkiLCJpYXQiOjE1MTQ1MzE4OTYsIm5iZiI6MTUxNDUzMTg5NiwiZXhwIjoxNTQ2MDY3ODk2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.dyzpV0D-KkEcmPwTXXnCYkSbvKlqCBYDZMBgzNQvRz9ydgygOVEX8RcRigEjtAIYD4vquok1aq3SmHm_4ZNuOyux82sZt6HiucBJCWzZhWJ1t5sEeMuQaWB2hDxQEu8HbS-xRYl4df94BP_vJM-v-FfKCJ3x-QZaY6Srmu9m8hzZWGfG-U7jbBDxDV1RFMyD6506i0B1Z-cTrBBSY4q0V4Ke6JF7LYzX_sm3KoV6NOEjGqKtNqWwOOfCXfdwgsBV3GUCZCRDBdBXQSACBN8cUl5syalP9tIIuZ4Zzzcxff-4WzuEWwkQL5gYSX5bESG59NmEDFyGI7dmZXt9ytHOsQZGy0bOgRJkNtqAID1F-0TXduMr0pJzszRtVawqqrVWQ2oS2UvI8JKzv4F5c7m9A6l3G9i3CnWT5wgN8QLNsh0D7PlrmRQQl5P8D4WjxfHsvyKn7cp4oH605Rupbx6UG-TsFR4RoNQQ4xJW6zeNnIEOtPTFftJNNIxQnt4JDh2v8fd5hbg0MkDHjt-nflVvf53KfPnLR_gSqvyBZzmKXWAz8zbH_ISWLY7cywvmzA5qYtdr-UDetU7-KEwiSbVZH-FY4GYBlcDR4C35nC9CO1z_e8x-0p4WBjvDNYO7Q3UWt7U8EsnAXHGIKcNWO38zFJo0VHqgUCW7zBtwiPCAA5o"

// // // var token2 = 'SDMFmc5rIfmm4DYkQvv7jVkn7VqQoVRldlE970Cq'
// // Vue.prototype.$snipeit = axios.create({
// //     // baseURL: "http://ramnode1.ashdevtools.com:8080/api/v1/",
// //     // baseURL: "http://192.168.1.171:83/api/v1/",
// //     baseURL: "http://47.219.112.177:1880/api/snipeit/",
// //     // baseURL: "http://localhost:1880/api/snipeit/",
// //     timeout: 1000,
// //     headers: {
// //         Authorization: "Bearer " +     "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjAxOWRkM2VmODU4ZDFjYTNmODgxYjU1MmY0ZjVmYmJkNTgzYjc0MGI1YWU0YWM4OGJmZWRjZGE4ODNiZjY5ZjZiNzZlMWE4Yjg4NjgyNmMzIn0.eyJhdWQiOiI1IiwianRpIjoiMDE5ZGQzZWY4NThkMWNhM2Y4ODFiNTUyZjRmNWZiYmQ1ODNiNzQwYjVhZTRhYzg4YmZlZGNkYTg4M2JmNjlmNmI3NmUxYThiODg2ODI2YzMiLCJpYXQiOjE1MjExMjE4NDgsIm5iZiI6MTUyMTEyMTg0OCwiZXhwIjoxNTUyNjU3ODQ4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.VT8U9TsjYNr63cvXhSCDVTrY5gtLmUh9mnIN6Ln_vYttQQ9bJ_o1yrCH4RRl9wbfGAhj6wjkI64tim8xc6lo_X1kIaXY1j5Za31f8-9Fgd6lG5HMkNy8iXP5safSAmfWfPEOxCX_em-RVtQRfVf8vOxqOrXtzbnGZRwPoDcD_35qXZ8gmcej-ZOglLi7KZfhsQeKVbdRG5IE2z4NoMByUQm-kIyk_WYGVEeommcqumwgtkYIsEsiQzQiZkAiKEST1zzzVctKOU8fgKRbD_MzUer21SfgU6A74duXh1DswOO7FwFqGE2g3SFlqDv5ajcX8iDJazcCl-HclCOLNCHJKQolljTmCexBq-5c7x2UEmyuWNFkjGbGj8qzVcVmPGcz7EH3vBnEzKuRlwrunlaK9eZFI_RaHSGS8kM0XALBteqTgybMjLTejSjliB1ft2BQEh9JVH9mdsdL_2R0IYpKDWJK4LEE5_TnLc88Jj-BvfEp3h9iqv1HTEzmyTVBUjkIoJYrMzI5p3MMwJ6fP5TWvwP3le3dwBn9XxsOZHGOuxdVFNImmSJQNzwUBhL7MGLdBMq8x6hFjFVFy3dT6ySIIxdnw25YMG-w1dRUPa_ueCalRoAlwklcLmLKrkYSnrG1KRhXMLczvet1-l3mkOHOMd1mXFqFpl0x-JW9g4hjYpw",
// //         Accept: "application/json"
// //     }
// // })
// //   Vue.prototype.$axios = axios

// // }
