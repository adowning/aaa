webpackJsonp([1],{"+cKO":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.maxValue=t.minValue=t.and=t.or=t.url=t.sameAs=t.requiredUnless=t.requiredIf=t.required=t.minLength=t.maxLength=t.macAddress=t.ipAddress=t.email=t.between=t.numeric=t.alphaNum=t.alpha=void 0;var n=b(r("FWhV")),a=b(r("PKmV")),i=b(r("hbkP")),u=b(r("3Ro/")),o=b(r("6rz0")),s=b(r("HSVw")),l=b(r("HM/u")),c=b(r("qHXR")),f=b(r("4ypF")),d=b(r("4oDf")),p=b(r("lEk1")),v=b(r("6+Xr")),m=b(r("L6Jx")),h=b(r("7J6f")),g=b(r("Y18q")),y=b(r("bXE/")),_=b(r("aYrh")),w=b(r("xJ3U"));function b(e){return e&&e.__esModule?e:{default:e}}t.alpha=n.default,t.alphaNum=a.default,t.numeric=i.default,t.between=u.default,t.email=o.default,t.ipAddress=s.default,t.macAddress=l.default,t.maxLength=c.default,t.minLength=f.default,t.required=d.default,t.requiredIf=p.default,t.requiredUnless=v.default,t.sameAs=m.default,t.url=h.default,t.or=g.default,t.and=y.default,t.minValue=_.default,t.maxValue=w.default},"3Ro/":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("URu4");t.default=function(e,t){return(0,n.withParams)({type:"between",min:e,max:t},function(r){return!(0,n.req)(r)||(!/\s/.test(r)||r instanceof Date)&&+e<=+r&&+t>=+r})}},"4oDf":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("URu4");t.default=(0,n.withParams)({type:"required"},n.req)},"4ypF":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("URu4");t.default=function(e){return(0,n.withParams)({type:"minLength",min:e},function(t){return!(0,n.req)(t)||(0,n.len)(t)>=e})}},"6+Xr":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("URu4");t.default=function(e){return(0,n.withParams)({type:"requiredUnless",prop:e},function(t,r){return!!(0,n.ref)(e,this,r)||(0,n.req)(t)})}},"6rz0":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("URu4");t.default=(0,n.regex)("email",/(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/)},"7J6f":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("URu4");t.default=(0,n.regex)("url",/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i)},EgLU:function(e,t,r){(e.exports=r("FZ+f")(!1)).push([e.i,"\n.error[data-v-ef68022e] {\n  color: red;\n}\n.logo[data-v-ef68022e] {\n  height: 100px;\n  width: 50%;\n}\n",""])},FWhV:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("URu4");t.default=(0,n.regex)("alpha",/^[a-zA-Z]*$/)},"HM/u":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("URu4");t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:":";return(0,n.withParams)({type:"macAddress"},function(t){if(!(0,n.req)(t))return!0;if("string"!=typeof t)return!1;var r="string"==typeof e&&""!==e?t.split(e):12===t.length||16===t.length?t.match(/.{2}/g):null;return null!==r&&(6===r.length||8===r.length)&&r.every(a)})};var a=function(e){return e.toLowerCase().match(/^[0-9a-f]{2}$/)}},HSVw:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("URu4");t.default=(0,n.withParams)({type:"ipAddress"},function(e){if(!(0,n.req)(e))return!0;if("string"!=typeof e)return!1;var t=e.split(".");return 4===t.length&&t.every(a)});var a=function(e){if(e.length>3||0===e.length)return!1;if("0"===e[0]&&"0"!==e)return!1;if(!e.match(/^\d+$/))return!1;var t=0|+e;return t>=0&&t<=255}},I5Vr:function(e,t,r){e.exports=r.p+"img/logo.9e7db2b.png"},JVqD:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};t.pushParams=u,t.popParams=o,t.withParams=function(e,t){if("object"==typeof e&&void 0!==t)return r=e,n=t,l(function(e){return function(){e(r);for(var t=arguments.length,a=Array(t),i=0;i<t;i++)a[i]=arguments[i];return n.apply(this,a)}});var r,n;return l(e)};var a=[],i=t.target=null;t._setTarget=function(e){t.target=i=e};function u(){null!==i&&a.push(i),t.target=i={}}function o(){var e=i,r=t.target=i=a.pop()||null;return r&&(Array.isArray(r.$sub)||(r.$sub=[]),r.$sub.push(e)),e}function s(e){if("object"!=typeof e||Array.isArray(e))throw new Error("params must be an object");t.target=i=n({},i,e)}function l(e){var t=e(s);return function(){u();try{for(var e=arguments.length,r=Array(e),n=0;n<e;n++)r[n]=arguments[n];return t.apply(this,r)}finally{o()}}}},L6Jx:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("URu4");t.default=function(e){return(0,n.withParams)({type:"sameAs",eq:e},function(t,r){return t===(0,n.ref)(e,this,r)})}},PKmV:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("URu4");t.default=(0,n.regex)("alphaNum",/^[a-zA-Z0-9]*$/)},URu4:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.regex=t.ref=t.len=t.req=t.withParams=void 0;var n,a=r("mpcv"),i=(n=a)&&n.__esModule?n:{default:n};t.withParams=i.default;var u=t.req=function(e){if(Array.isArray(e))return!!e.length;if(void 0===e||null===e||!1===e)return!1;if(e instanceof Date)return!isNaN(e.getTime());if("object"==typeof e){for(var t in e)return!0;return!1}return!!String(e).length};t.len=function(e){return Array.isArray(e)?e.length:"object"==typeof e?Object.keys(e).length:String(e).length},t.ref=function(e,t,r){return"function"==typeof e?e.call(t,r):r[e]},t.regex=function(e,t){return(0,i.default)({type:e},function(e){return!u(e)||t.test(e)})}},Y18q:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("URu4");t.default=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,n.withParams)({type:"or"},function(){for(var e=this,r=arguments.length,n=Array(r),a=0;a<r;a++)n[a]=arguments[a];return t.length>0&&t.reduce(function(t,r){return t||r.apply(e,n)},!1)})}},aYrh:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("URu4");t.default=function(e){return(0,n.withParams)({type:"minValue",min:e},function(t){return!(0,n.req)(t)||(!/\s/.test(t)||t instanceof Date)&&+t>=+e})}},"bXE/":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("URu4");t.default=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,n.withParams)({type:"and"},function(){for(var e=this,r=arguments.length,n=Array(r),a=0;a<r;a++)n[a]=arguments[a];return t.length>0&&t.reduce(function(t,r){return t&&r.apply(e,n)},!0)})}},hbkP:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("URu4");t.default=(0,n.regex)("numeric",/^[0-9]*$/)},lEk1:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("URu4");t.default=function(e){return(0,n.withParams)({type:"requiredIf",prop:e},function(t,r){return!(0,n.ref)(e,this,r)||(0,n.req)(t)})}},mpcv:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("JVqD").withParams;t.default=n},oTsQ:function(e,t,r){var n=r("EgLU");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);(0,r("rjj0").default)("5ecd6052",n,!1,{})},qHXR:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("URu4");t.default=function(e){return(0,n.withParams)({type:"maxLength",max:e},function(t){return!(0,n.req)(t)||(0,n.len)(t)<=e})}},xJ3U:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("URu4");t.default=function(e){return(0,n.withParams)({type:"maxValue",max:e},function(t){return!(0,n.req)(t)||(!/\s/.test(t)||t instanceof Date)&&+t<=+e})}},xJsL:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});r("+cKO"),r("7109"),r("YaEn"),r("mtWM");var n={data:function(){return{email:"",pass:"",newpass:"",newemail:"",username:"",form:{},login:!0,devMode:"production"}},computed:{user:function(){return this.$store.getters.user},error:function(){return this.$store.getters.error},loading:function(){return this.$store.getters.loading}},watch:{user:function(e){null!==e&&void 0!==e&&(this.$router.push("/profile"),console.log(e))}},methods:{onSignin:function(e,t){window.localStorage.clear(),window.sessionStorage.clear(),this.$store.dispatch("signUserIn",{email:e,password:t}).then(function(){console.log("back")})},onDismissed:function(){this.$store.dispatch("clearError")},onSignUp:function(e,t,r){window.localStorage.clear(),window.sessionStorage.clear(),this.$store.dispatch("signUserUp",{email:e,pass:t,username:r}).then(function(){console.log("signed up!")})}}},a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-layout",[n("q-page-container",[n("q-page",{staticClass:"row justify-center ",attrs:{padding:""}},[n("div",{staticStyle:{width:"600px","max-width":"90vw"}},[n("div",{staticClass:"flex-row-docs q-al-xl"},[n("div",{staticClass:"doc-container q-pa-xl"},[n("div",{staticClass:"row justify-center "},[n("img",{staticStyle:{width:"300px",height:"280px"},attrs:{src:r("I5Vr"),size:"/"}}),e._v(" "),n("div",{staticClass:"input-group "},[n("span",{staticClass:"input-group-addon "},[n("i",{staticClass:"fa fa-envelope"})]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"form-control ",attrs:{name:"email",placeholder:"Email",type:"email"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}}),n("br"),e._v(" "),n("span",{staticClass:"input-group-addon"},[n("i",{staticClass:"fa fa-lock"})]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.pass,expression:"pass"}],staticClass:"form-control",attrs:{name:"password",placeholder:"Password",type:"password"},domProps:{value:e.pass},on:{input:function(t){t.target.composing||(e.pass=t.target.value)}}})]),e._v(" "),n("div",{staticClass:"q-pa-sm"},[n("q-btn",{attrs:{color:"primary"},on:{click:function(t){e.onSignin(e.email,e.pass)}}},[e._v("Submit")])],1),e._v(" "),"development"==e.devMode?n("div",{staticClass:"q-pa-sm"},[n("q-btn",{attrs:{color:"primary"},on:{click:function(t){e.onSignin("d@d.com","asdfasdf","dname")}}},[e._v("D Submit")]),e._v(" "),n("q-btn",{attrs:{color:"primary"},on:{click:function(t){e.onSignin("a@a.com","asdfasdf","aname")}}},[e._v("A Submit")]),e._v(" "),n("q-btn",{attrs:{color:"primary"},on:{click:function(t){e.onSignin("b@b.com","asdfasdf","bname")}}},[e._v("B Submit")]),e._v(" "),n("q-btn",{attrs:{color:"primary"},on:{click:function(t){e.onSignin("c@c.com","asdfasdf","cname")}}},[e._v("C Submit")]),e._v(" "),n("q-btn",{attrs:{color:"primary"},on:{click:function(t){e.onSignin("john.w@andrewscarpetcleaning.com","Andrews1","cname")}}},[e._v("john weldon")])],1):e._e(),e._v(" "),"development"==e.devMode?n("div",{staticClass:"q-pa-sm"}):e._e()])]),e._v(" "),n("h4",[e._v("Andrews Administration Application")])]),e._v(" "),n("div",{staticClass:"row justify-center"},[n("q-alert",{staticClass:"q-mb-lg",attrs:{color:"warning",inline:""}},[e._v(" Any links in the menu to the left that are grey is becuase I only want to test just a few features at a time, I will turn on the other features after the bugs are worked out of what I have open now ")])],1)])])],1)],1)},i=[];a._withStripped=!0;var u=r("XyMi"),o=!1;var s=function(e){o||r("oTsQ")},l=Object(u.a)(n,a,i,!1,s,"data-v-ef68022e",null);l.options.__file="src/components/Login.vue";t.default=l.exports}});