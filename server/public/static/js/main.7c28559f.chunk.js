(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{35:function(e,t,n){e.exports=n(70)},40:function(e,t,n){},42:function(e,t,n){},68:function(e,t,n){},70:function(e,t,n){"use strict";n.r(t);var a=n(2),c=n.n(a),o=n(29),r=n.n(o),i=(n(40),n(12)),u=n(13),l=n(16),s=n(14),p=n(17),d=n(11),h=(n(42),n(20)),m=n.n(h),O=n(8),E=n(30),b=n.n(E),w=m.a.mark(j),f=function(e){try{return JSON.parse(atob(e.split(".")[1]))}catch(t){return null}};function j(){var e,t,n;return m.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(a.prev=0,e=document.cookie&&document.cookie["feathers-jwt"]){a.next=5;break}return Object(O.a)({type:"NOT_AUTHENTICATED"}),a.abrupt("return");case 5:return t=f(e),console.log(t),a.next=9,b.a.get("/users",{});case 9:n=a.sent,Object(O.a)({type:"AUTHENTICATION_SUCCESS",payload:n}),console.log("got a response:",n),a.next=18;break;case 14:a.prev=14,a.t0=a.catch(0),Object(O.a)({type:"AUTHENTICATION_FAILED",error:a.t0}),console.log("got an error:",a.t0);case 18:case"end":return a.stop()}},w,this,[[0,14]])}var v=j,T=n(15),y=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){console.log("component will mount called"),this.props.authentication()}},{key:"render",value:function(){return c.a.createElement("div",{className:"welcome-panel"},c.a.createElement("header",null,c.a.createElement("h1",null,"Welcome to V3")),this.props.isConnected?c.a.createElement("div",null,c.a.createElement("p",null,"You are connected to twitch as ",this.props.twitchId," "),c.a.createElement("button",null,"Disconnect")):c.a.createElement("div",null,c.a.createElement("p",null,"You are not connected to twitch yet"),c.a.createElement("a",{href:"/auth/twitch"},"Connect")))}}]),t}(a.Component);var N=Object(T.b)(function(e){return Object(d.a)({},e,{authentication:v})})(y),C=(n(68),function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"App"},c.a.createElement(N,null))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var I=n(10),A={connected:!1};var k=function(e,t){switch(t.type){case"AUTHENTICATION_SUCCESS":return{connected:!0,user:Object(d.a)({},t.payload)};case"AUTHENTICATION_FAILED":return{connected:!1,connectionError:Object(d.a)({},t.error)};default:return e||A}},_=n(34),g=Object(_.a)(),S=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||I.c,U=Object(I.d)(k,S(Object(I.a)(g)));g.run(v),r.a.render(c.a.createElement(T.a,{store:U},c.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[35,2,1]]]);
//# sourceMappingURL=main.7c28559f.chunk.js.map