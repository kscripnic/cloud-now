(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[0],{13:function(e,n,t){},15:function(e,n){function t(e){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}t.keys=function(){return[]},t.resolve=t,e.exports=t,t.id=15},17:function(e,n,t){},19:function(e,n,t){"use strict";t.r(n);var o=t(1),c=t.n(o),u=t(6),r=t.n(u),i=(t(13),t(5)),s=t.n(i),a=t(7),p=t(3),f=t(8),d=t.n(f),l=t(2),b=t.n(l),y=(t(17),t(0));var j=function(){var e=Object(o.useState)(""),n=Object(p.a)(e,2),t=n[0],c=n[1],u=Object(o.useState)(0),r=Object(p.a)(u,2),i=r[0],f=r[1],l=Object(o.useRef)(null),j=Object(o.useState)(null),O=Object(p.a)(j,2),g=O[0],h=O[1],v=function(){var e=Object(a.a)(s.a.mark((function e(){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(n=new d.a("f5e0f2a2-19ed-42bd-8b70-2c033eacc9c6")).on("open",(function(e){c(e),n.on("connection",(function(e){console.log("conectouuu"),h(e),e.on("data",(function(n){switch(n.type){case"ping":default:f(b()().diff(n.dt,"milliseconds")),setTimeout((function(){e.send({dt:b()().toISOString(),type:"ping"})}),1e3)}})),e.send({dt:b()().toISOString()})})),n.on("call",(function(e){e.answer(),e.on("stream",(function(e){l.current&&(l.current.srcObject=e)}))})),n.on("error",(function(e){console.log(e)}))}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(o.useEffect)((function(){v()}),[]),Object(y.jsxs)("div",{className:"App",children:[Object(y.jsxs)("div",{style:{position:"absolute",backgroundColor:"white",zIndex:2},children:[Object(y.jsx)("p",{children:"peerId: ".concat(t)}),Object(y.jsx)("p",{children:"ping: ".concat(i)}),Object(y.jsx)("p",{children:"v3"})]}),Object(y.jsx)("video",{autoPlay:!0,muted:!0,ref:l,onPause:function(){l.current&&l.current.play()},onLoad:function(){l.current&&l.current.play()},style:{height:"100%",width:"100%"},onMouseMove:function(e){g&&g.send({type:"mouseMove",key:{x:e.clientX,y:e.clientY}})},onKeyDown:function(e){e.preventDefault(),e.stopPropagation(),g&&g.send({type:"keyDown",key:e.key})},onKeyUp:function(e){e.preventDefault(),e.stopPropagation(),g&&g.send({type:"keyUp",key:e.key})},onMouseDown:function(e){e.preventDefault(),e.stopPropagation(),g&&g.send({type:"mouseDown",key:e.button})},onMouseUp:function(e){e.preventDefault(),e.stopPropagation(),g&&g.send({type:"mouseUp",key:e.button})}})]})},O=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,20)).then((function(n){var t=n.getCLS,o=n.getFID,c=n.getFCP,u=n.getLCP,r=n.getTTFB;t(e),o(e),c(e),u(e),r(e)}))};r.a.render(Object(y.jsx)(c.a.StrictMode,{children:Object(y.jsx)(j,{})}),document.getElementById("root")),O()}},[[19,1,2]]]);
//# sourceMappingURL=main.525f11c0.chunk.js.map