(this.webpackJsonpturnips=this.webpackJsonpturnips||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(5),l=n.n(i),o=n(6),c=n(2),s=(n(12),function(e){var t=e.quantity*e.initialPrice,n=e.quantity*e.currentPrice,a=n-t;return{gross:n,investment:t,lossful:a<0,profit:a,profitable:a>0,profitPercentage:(a/t*100||0).toFixed(2)}}),u=function(e){return(e||0).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},m=function(e){var t=e.history,n=e.setHistory;return t.length>0?a.createElement(a.Fragment,null,a.createElement("h2",{id:"history-header"},a.createElement("span",null,"Saved data\xa0"),a.createElement("button",{id:"clear-history-button",onClick:function(e){e.preventDefault(),n("[]"),localStorage.removeItem("history")},className:"elevation-1"},"delete all")),a.createElement("div",{id:"history-container"},a.createElement("table",null,a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",null,"Quantity"),a.createElement("th",null,"Initial price"),a.createElement("th",null,"Sale price"),a.createElement("th",null,"Gross"),a.createElement("th",null,"Profit"),a.createElement("th",null,"Time"))),a.createElement("tbody",null,t.sort((function(e,t){return e&&t?new Date(t.time).getTime()-new Date(e.time).getTime():0})).map((function(e,t){if(e){var n=s({quantity:e.quantity,initialPrice:e.initialPrice,currentPrice:e.currentPrice}),r=n.gross,i=n.lossful,l=n.profit,o=n.profitable,c=n.profitPercentage;return a.createElement("tr",{key:e.time.toString()||t},a.createElement("td",null,u(e.quantity)),a.createElement("td",null,u(e.initialPrice)),a.createElement("td",null,u(e.currentPrice)),a.createElement("td",null,u(r)),a.createElement("td",{className:o?"good":i?"bad":void 0},u(l)," (",o?"+":"",c,"%)"),a.createElement("td",null,function(e){var t=new Date,n=e.toDateString(),a=t.toDateString()===n,r=e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});return"".concat(a?"Today":n,", ").concat(r)}(new Date(e.time))))}return""})))))):null},d=parseFloat(localStorage.getItem("quantity")||""),f=parseFloat(localStorage.getItem("initialPrice")||""),v=parseFloat(localStorage.getItem("currentPrice")||""),p=localStorage.getItem("history")||"[]",g=function(){var e=r.a.useState(d),t=Object(c.a)(e,2),n=t[0],a=t[1],i=r.a.useState(f),l=Object(c.a)(i,2),g=l[0],h=l[1],E=r.a.useState(v),b=Object(c.a)(E,2),y=b[0],w=b[1],S=r.a.useState(p),P=Object(c.a)(S,2),k=P[0],N=P[1],I=[{label:"Quantity",value:n,setter:a,id:"quantity"},{label:"Initial price",value:g,setter:h,id:"initialPrice"},{label:"Current price",value:y,setter:w,id:"currentPrice"}],T=n||0,D=g||0,q=y||0,C=s({currentPrice:q,initialPrice:D,quantity:T}),O=C.gross,F=C.investment,W=C.lossful,j=C.profit,A=C.profitable,J=C.profitPercentage,L=(0===n||void 0===n)&&(0===g||void 0===g)&&(0===y||void 0===y),x=0===F&&0===j&&0===O,B=function(e){var t=e.currentTarget;setTimeout((function(){t.select()}),100)};return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Turnip calc"),r.a.createElement("main",{className:"app"},r.a.createElement("form",{id:"inputs",className:"half"},I.map((function(e){var t;return r.a.createElement("label",{key:e.id},r.a.createElement("span",null,e.label),r.a.createElement("input",{id:e.id,name:e.id,onChange:(t=e.setter,function(n){var a=parseFloat(n.currentTarget.value||"0");t(a),localStorage.setItem(e.id,a.toString())}),type:"number",inputMode:"decimal",pattern:"[0-9]*",value:e.value||"",min:0,onFocus:B,onClick:B}))})),r.a.createElement("p",{className:"button-row"},r.a.createElement("button",{id:"clear-button",onClick:function(e){e.preventDefault(),a(void 0),h(void 0),w(void 0),I.forEach((function(e){return localStorage.removeItem(e.id)}))},disabled:L,type:"button",className:L?void 0:"elevation-1"},"reset fields"))),r.a.createElement("div",{className:"half"},r.a.createElement("div",{className:"elevation-4",id:"results"},r.a.createElement("div",null,r.a.createElement("p",null,"Investment: ",u(F)),r.a.createElement("p",null,"Gross: ",u(O)),r.a.createElement("p",{className:A?"good":W?"bad":void 0},W?"Loss":"Profit",": ",u(j)," (",A?"+":"",J,"%)")),r.a.createElement("p",{className:"button-row"},r.a.createElement("button",{id:"save-button",onClick:function(e){e.preventDefault();var t=JSON.parse(localStorage.getItem("history")||""),n=t instanceof Array?t:[],a=[].concat(Object(o.a)(n),[{time:new Date,quantity:T,initialPrice:D,currentPrice:q}]),r=JSON.stringify(a);N(r),localStorage.setItem("history",r)},disabled:x,className:x?void 0:"elevation-2"},"save")))),r.a.createElement(m,{setHistory:N,history:JSON.parse(k)}),r.a.createElement("div",{className:"github-link"},r.a.createElement("a",{href:"https://github.com/chadlavi/turnip",rel:"noopener noreferrer",target:"_blank"},"https://github.com/chadlavi/turnip"))))},h=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function E(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!==n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(g,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/turnip",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/turnip","/service-worker.js");h?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!==a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):E(e,t)})).catch((function(){console.log("No internet connection found. Turnip is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):E(t,e)}))}}()},7:function(e,t,n){e.exports=n(13)}},[[7,1,2]]]);
//# sourceMappingURL=main.15249a87.chunk.js.map