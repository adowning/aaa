webpackJsonp([6],{0:function(e,n,t){e.exports=t("BKUD")},"2KaF":function(e,n){},BKUD:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t("T4f3"),r=t.n(a),o=t("QPfz"),i=t("NBDm");o.a.use(i.default,{components:i,directives:i,plugins:i});t("z1yZ"),t("dFrX"),t("2KaF"),t("GtZS");var s=function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"q-app"}},[n("router-view")],1)},u=[];s._withStripped=!0;var c=t("xRi5"),d=!1;var l=function(e){d||t("T67c")},p=Object(c.a)({name:"App"},s,u,!1,l,null,null);p.options.__file="src/App.vue";var f=p.exports,m=t("g6D5"),h=t("Hxbb"),v=t("dZBD"),g=t.n(v);t("YiEk");o.a.config.productionTip=!1;var b=r()({el:"#q-app",router:m.a,store:h.a},f),w=[];w.push(function(e){e.Vue.prototype.$axios=g.a}),w.push(function(e){e.app,e.Vue,e.router}),w.push(function(e){e.app,e.router,e.Vue}),w.forEach(function(e){return e({app:b,router:m.a,store:h.a,Vue:o.a})}),document.addEventListener("deviceready",function(){o.a.prototype.$q.cordova=window.cordova,new o.a(b)},!1)},F2a5:function(e,n){},GtZS:function(e,n){},Hxbb:function(e,n,t){"use strict";var a=t("QPfz"),r=t("aKwh"),o=t("w8Pp"),i={state:{user:null},mutations:{setUser:function(e,n){e.user=n;var t=o.a.database().ref("presence").push();o.a.databaseURL="https://andrewsadmin.firebaseio.com",o.a.database().ref(".info/connected").on("value",function(e){if(e.val()){t.onDisconnect().remove();var a={user:n,status:"online"};t.set(a)}else{var r={user:n,status:"offline"};t.set(r)}})}},actions:{signUserIn:function(e,n){var t=e.commit;t("setLoading",!0),o.a.databaseURL="https://andrewsadmin.firebaseio.com",o.a.auth().signInWithEmailAndPassword("d@d.com","asdfasdf").catch(function(e){e.code,e.message}).then(function(e){o.a.database().ref("users").child(e.uid).once("value",function(n){t("setLoading",!1);var a={id:e.uid,username:n.val().username,photoURL:n.val().photoURL,email:n.val().email};t("setUser",a)})}).catch(function(e){console.log(e),t("setLoading",!1),t("setError",e)})}},signUserUp:function(e,n){var t=e.commit;t("setLoading",!0),t("clearError"),o.a.auth().createUserWithEmailAndPassword(n.email,n.password,emp_id).then(function(e){o.a.database().ref("users").child(e.uid).set({name:n.username}).then(function(a){t("setLoading",!1);var r={id:e.uid,username:n.username,emp_id:n.emp_id};t("setUser",r)}).catch(function(e){t("setLoading",!1),t("setError",e)})}).catch(function(e){t("setLoading",!1),t("setError",e)})},getters:{user:function(e){return e.user}}},s=t("NRzJ"),u=t.n(s);a.a.use(r.a);var c=new u.a({key:"vuex",storage:window.sessionStorage});a.a.use(r.a);var d=new r.a.Store({modules:{auth:i},state:{loading:!1,error:null,onlineUsers:[]},mutations:{setLoading:function(e,n){e.loading=n},setError:function(e,n){e.error=n},clearError:function(e){e.error=null},setOnlineUsers:function(e,n){e.onlineUsers=n}},actions:{loadOnlineUsers:function(e){var n=e.commit;o.a.database().ref("presence").on("value",function(e){var t=[];t[0]=e.numChildren(),t[1]=e.val(),n("setOnlineUsers",t)})},clearError:function(e){(0,e.commit)("clearError")}},getters:{loading:function(e){return e.loading},error:function(e){return e.error},onlineUsers:function(e){return e.onlineUsers}},plugins:[c.plugin]});n.a=d},T67c:function(e,n){},g6D5:function(e,n,t){"use strict";var a=t("QPfz"),r=t("7ov2"),o=t("Hxbb"),i=[{path:"/",component:function(){return t.e(1).then(t.bind(null,"Ozij"))}},{path:"/default",component:function(){return t.e(2).then(t.bind(null,"dkJT"))},children:[{path:"/profile",component:function(){return t.e(3).then(t.bind(null,"CCiR"))}},{path:"/liveview",component:function(){return t.e(4).then(t.bind(null,"oQ4j"))}},{path:"/directory",component:function(){return t.e(0).then(t.bind(null,"EPZk"))}}]},{path:"*",component:function(){return t.e(5).then(t.bind(null,"cW02"))}}];a.a.use(r.a);var s=new r.a({mode:"hash",base:"/",scrollBehavior:function(){return{y:0}},routes:i});s.beforeEach(function(e,n,t){"/"!=e.path?o.a.getters.user?(console.log("There is a user, resume. ("+e.path+")"),t()):(console.log("There is no user, redirect to login. ("+e.path+")"),t("/")):(console.log("You're on the login page"),t())}),console.log(s.mode);n.a=s},"me+P":function(e,n){},w8Pp:function(e,n,t){"use strict";var a=t("YiEk"),r=t.n(a).a.initializeApp({apiKey:"AIzaSyDdspiJ0VAnGLeyRziofRCSld1bpBoms7E",authDomain:"andrewsadmin.firebaseapp.com",databaseURL:"https://andrewsadmin.firebaseio.com",projectId:"andrewsadmin",storageBucket:"andrewsadmin.appspot.com",messagingSenderId:"734746045873"});n.a=r}},[0]);