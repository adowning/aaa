webpackJsonp([2],{"+tPU":function(n,e,t){t("xGkn");for(var o=t("7KvD"),r=t("hJx8"),a=t("/bQp"),i=t("dSzd")("toStringTag"),s="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),l=0;l<s.length;l++){var c=s[l],u=o[c],f=u&&u.prototype;f&&!f[i]&&r(f,i,c),a[c]=a.Array}},"/bQp":function(n,e){n.exports={}},"3fs2":function(n,e,t){var o=t("RY/4"),r=t("dSzd")("iterator"),a=t("/bQp");n.exports=t("FeBl").getIteratorMethod=function(n){if(void 0!=n)return n[r]||n["@@iterator"]||a[o(n)]}},"4mcu":function(n,e){n.exports=function(){}},"880/":function(n,e,t){n.exports=t("hJx8")},"94VQ":function(n,e,t){"use strict";var o=t("Yobk"),r=t("X8DO"),a=t("e6n0"),i={};t("hJx8")(i,t("dSzd")("iterator"),function(){return this}),n.exports=function(n,e,t){n.prototype=o(i,{next:r(1,t)}),a(n,e+" Iterator")}},BO1k:function(n,e,t){n.exports={default:t("fxRn"),__esModule:!0}},EGZi:function(n,e){n.exports=function(n,e){return{value:e,done:!!n}}},EJqq:function(n,e,t){var o=t("bf3/");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);(0,t("rjj0").default)("4bf56989",o,!1,{})},IPjP:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t("BO1k"),r=t.n(o),a=t("qVsQ"),i=t.n(a).a.defaultStore,s={name:"Employees",data:function(){return{employeeDialog:!1,employeeFormValid:!0,newEmployee:{id:null,name:null,url:null},employees:[],servicesLoading:!1,editOn:!1}},methods:{listEmployees:function(){var n=this;this.employeesLoading=!0,this.employees=[],i.collection("employees").get().then(function(e){e.forEach(function(e){e.data.cdl;e.data().photoUrl="../statics/quasar-logo.png",e.data().photoUrl="../statics/quasar-logo.png",n.employees.push(e.data())})}),this.employeesLoading=!1},createEmployees:function(){var n=[{first_name:"Ash",last_name:"Downing",full_name:"Ash Downing",gender:"M",position:"Techician",cellPhone:"903-530-1197",wage:50},{first_name:"Adreain",last_name:"Dunn",full_name:"Adreain Dunn",gender:"M",position:"Lead",cellPhone:"903-372-5013",wage:50},{first_name:"Codey",last_name:"Rush",gender:"M",full_name:"Codey Rush",position:"Helper",cellPhone:null,wage:50},{first_name:"Dairi",last_name:"Bustos",gender:"F",full_name:"Dairi Bustos",position:"Helper",cellPhone:null,wage:50},{first_name:"Darien",last_name:"Dunn",gender:"M",full_name:"Darien Dunn",position:"Helper",cellPhone:"903-330-9874",wage:50},{first_name:"Hilaria",last_name:"Robles",gender:"F",full_name:"Hilaria Robles",position:"Techician",cellPhone:null,wage:50},{first_name:"Jerran",last_name:"McGee",gender:"M",full_name:"Jerran McGee",position:"Helper",cellPhone:"402-598-8309",wage:50},{first_name:"Jessica",last_name:"Johnson",gender:"F",full_name:"Jessica Johnson",position:"Lead",cellPhone:"903-603-0837",wage:50},{first_name:"John",last_name:"Chance",gender:"M",full_name:"John Chance",position:"Supervisor",cellPhone:"903-571-9131",wage:50},{first_name:"John",last_name:"Weldon",gender:"M",full_name:"John Weldon",position:"Contractor",cellPhone:"903-780-3373",wage:50},{first_name:"Juan",last_name:"Leon",gender:"M",full_name:"Juan Leon",position:"Lead",cellPhone:"903725013",wage:50},{first_name:"Kathy",last_name:"Loftis",gender:"F",full_name:"Kathy Loftis",position:"Office",cellPhone:null,wage:50},{first_name:"Kayla",last_name:"Rush",gender:"F",full_name:"Kayla Rush",position:"Helper",cellPhone:"903-780-7073",wage:50},{first_name:"Letesia",last_name:"Ford",gender:"F",full_name:"Letesia Ford",position:"Helper",cellPhone:"903-705-5094",wage:50},{first_name:"Mark",last_name:"Schrader",gender:"M",full_name:"Mark Schrader",position:"Manager",cellPhone:"903725013",wage:50},{first_name:"Randi",last_name:"Newton",gender:"F",full_name:"Randi Newton",position:"Supervisor",cellPhone:"903-617-3485",wage:50},{first_name:"Nathan",last_name:"Dungca",gender:"M",full_name:"Nathan Dungca",position:"Supervisor",cellPhone:"903-504-3544",wage:50},{first_name:"Tawnya",last_name:"Jackson",gender:"F",full_name:"Tawnya Jackson",position:"Supervisor",cellPhone:"903-705-5467",wage:50},{first_name:"Virginia",last_name:"Rodriguez",gender:"F",full_name:"Virginia Rodriguez",position:"Lead",cellPhone:"903-952-7065",wage:50}];console.log("creating list ",n);var e=0,t=!0,o=!1,a=void 0;try{for(var i,s=r()(n);!(t=(i=s.next()).done);t=!0){var l=i.value,c=(l.first_name.charAt(0)+"."+l.last_name).toLowerCase();if(e<10)var u="000"+(e++).toString();else u="00"+(e++).toString();var f="https://firebasestorage.googleapis.com/v0/b/andrewsadmin.appspot.com/o/profilePhotos%2F"+u+".jpg?alt=media";try{console.log(f),console.log("yay")}catch(n){console.log(n),console.log("get img")}console.log(doc.data().photoUrl);l.first_name,l.last_name;console.log(c)}}catch(n){o=!0,a=n}finally{try{!t&&s.return&&s.return()}finally{if(o)throw a}}}},created:function(){this.listEmployees()}},l=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticStyle:{padding:"100px"},attrs:{id:"Employees"}},[t("q-page",{staticClass:"row"},n._l(n.employees,function(e){return t("div",{staticClass:"row no-wrap q-ma-xl",staticStyle:{"max-height":"260px"}},[t("q-card",{attrs:{square:"",color:"secondary"}},[t("q-card-media",{staticStyle:{"background-color":"#4c566a","text-align":"center"}},[t("img",{staticClass:"avatar img-thumbnail hidden-print inline-block q-ma-sm",staticStyle:{width:"140px",height:"140px"},attrs:{src:e.photoUrl}})]),n._v(" "),t("q-card-main",{staticStyle:{"background-color":"#4c566a","text-align":"center"}},[n._v("\n\t"+n._s(e.full_name)+"\n\n    ")]),n._v(" "),t("q-card-separator"),n._v(" "),t("q-card-actions",[t("q-btn",{attrs:{flat:""}},[n._v("View")]),n._v(" "),t("q-btn",{attrs:{flat:""}},[n._v("Contact")])],1)],1)],1)}))],1)},c=[];l._withStripped=!0;var u=t("XyMi"),f=!1;var p=function(n){f||t("EJqq")},d=Object(u.a)(s,l,c,!1,p,"data-v-1077d026",null);d.options.__file="src/components/Directory.vue";e.default=d.exports},O4g8:function(n,e){n.exports=!0},PzxK:function(n,e,t){var o=t("D2L2"),r=t("sB3e"),a=t("ax3d")("IE_PROTO"),i=Object.prototype;n.exports=Object.getPrototypeOf||function(n){return n=r(n),o(n,a)?n[a]:"function"==typeof n.constructor&&n instanceof n.constructor?n.constructor.prototype:n instanceof Object?i:null}},RPLV:function(n,e,t){var o=t("7KvD").document;n.exports=o&&o.documentElement},"RY/4":function(n,e,t){var o=t("R9M2"),r=t("dSzd")("toStringTag"),a="Arguments"==o(function(){return arguments}());n.exports=function(n){var e,t,i;return void 0===n?"Undefined":null===n?"Null":"string"==typeof(t=function(n,e){try{return n[e]}catch(n){}}(e=Object(n),r))?t:a?o(e):"Object"==(i=o(e))&&"function"==typeof e.callee?"Arguments":i}},Yobk:function(n,e,t){var o=t("77Pl"),r=t("qio6"),a=t("xnc9"),i=t("ax3d")("IE_PROTO"),s=function(){},l=function(){var n,e=t("ON07")("iframe"),o=a.length;for(e.style.display="none",t("RPLV").appendChild(e),e.src="javascript:",(n=e.contentWindow.document).open(),n.write("<script>document.F=Object<\/script>"),n.close(),l=n.F;o--;)delete l.prototype[a[o]];return l()};n.exports=Object.create||function(n,e){var t;return null!==n?(s.prototype=o(n),t=new s,s.prototype=null,t[i]=n):t=l(),void 0===e?t:r(t,e)}},"bf3/":function(n,e,t){(n.exports=t("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},dSzd:function(n,e,t){var o=t("e8AB")("wks"),r=t("3Eo+"),a=t("7KvD").Symbol,i="function"==typeof a;(n.exports=function(n){return o[n]||(o[n]=i&&a[n]||(i?a:r)("Symbol."+n))}).store=o},e6n0:function(n,e,t){var o=t("evD5").f,r=t("D2L2"),a=t("dSzd")("toStringTag");n.exports=function(n,e,t){n&&!r(n=t?n:n.prototype,a)&&o(n,a,{configurable:!0,value:e})}},fxRn:function(n,e,t){t("+tPU"),t("zQR9"),n.exports=t("g8Ux")},g8Ux:function(n,e,t){var o=t("77Pl"),r=t("3fs2");n.exports=t("FeBl").getIterator=function(n){var e=r(n);if("function"!=typeof e)throw TypeError(n+" is not iterable!");return o(e.call(n))}},h65t:function(n,e,t){var o=t("UuGF"),r=t("52gC");n.exports=function(n){return function(e,t){var a,i,s=String(r(e)),l=o(t),c=s.length;return l<0||l>=c?n?"":void 0:(a=s.charCodeAt(l))<55296||a>56319||l+1===c||(i=s.charCodeAt(l+1))<56320||i>57343?n?s.charAt(l):a:n?s.slice(l,l+2):i-56320+(a-55296<<10)+65536}}},qio6:function(n,e,t){var o=t("evD5"),r=t("77Pl"),a=t("lktj");n.exports=t("+E39")?Object.defineProperties:function(n,e){r(n);for(var t,i=a(e),s=i.length,l=0;s>l;)o.f(n,t=i[l++],e[t]);return n}},"vIB/":function(n,e,t){"use strict";var o=t("O4g8"),r=t("kM2E"),a=t("880/"),i=t("hJx8"),s=t("D2L2"),l=t("/bQp"),c=t("94VQ"),u=t("e6n0"),f=t("PzxK"),p=t("dSzd")("iterator"),d=!([].keys&&"next"in[].keys()),g=function(){return this};n.exports=function(n,e,t,m,h,_,v){c(t,e,m);var y,x,S,L=function(n){if(!d&&n in M)return M[n];switch(n){case"keys":case"values":return function(){return new t(this,n)}}return function(){return new t(this,n)}},w=e+" Iterator",P="values"==h,b=!1,M=n.prototype,k=M[p]||M["@@iterator"]||h&&M[h],D=!d&&k||L(h),O=h?P?L("entries"):D:void 0,R="Array"==e&&M.entries||k;if(R&&(S=f(R.call(new n)))!==Object.prototype&&S.next&&(u(S,w,!0),o||s(S,p)||i(S,p,g)),P&&k&&"values"!==k.name&&(b=!0,D=function(){return k.call(this)}),o&&!v||!d&&!b&&M[p]||i(M,p,D),l[e]=D,l[w]=g,h)if(y={values:P?D:L("values"),keys:_?D:L("keys"),entries:O},v)for(x in y)x in M||a(M,x,y[x]);else r(r.P+r.F*(d||b),e,y);return y}},xGkn:function(n,e,t){"use strict";var o=t("4mcu"),r=t("EGZi"),a=t("/bQp"),i=t("TcQ7");n.exports=t("vIB/")(Array,"Array",function(n,e){this._t=i(n),this._i=0,this._k=e},function(){var n=this._t,e=this._k,t=this._i++;return!n||t>=n.length?(this._t=void 0,r(1)):r(0,"keys"==e?t:"values"==e?n[t]:[t,n[t]])},"values"),a.Arguments=a.Array,o("keys"),o("values"),o("entries")},zQR9:function(n,e,t){"use strict";var o=t("h65t")(!0);t("vIB/")(String,"String",function(n){this._t=String(n),this._i=0},function(){var n,e=this._t,t=this._i;return t>=e.length?{value:void 0,done:!0}:(n=o(e,t),this._i+=n.length,{value:n,done:!1})})}});