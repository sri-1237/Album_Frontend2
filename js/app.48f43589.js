(function(){"use strict";var e={50:function(e,t,a){var l=a(963),n=a(252);const s={class:"navbar navbar-expand navbar-dark bg-dark"},r=(0,n.Uk)("Music Info"),i={class:"navbar-nav mr-auto"},o={class:"nav-item"},u=(0,n.Uk)("Add New Album"),c={class:"container mt-3"};function m(e,t,a,l,m,d){const b=(0,n.up)("router-link"),p=(0,n.up)("router-view");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("nav",s,[(0,n.Wm)(b,{to:"/",class:"navbar-brand"},{default:(0,n.w5)((()=>[r])),_:1}),(0,n._)("div",i,[(0,n._)("li",o,[(0,n.Wm)(b,{to:"/addAlbum",class:"nav-link"},{default:(0,n.w5)((()=>[u])),_:1})])])]),(0,n._)("div",c,[(0,n.Wm)(p)])],64)}var d={name:"app"},b=a(744);const p=(0,b.Z)(d,[["render",m]]);var f=p,v=a(119),h=a(577),g=a.p+"img/beatles.3952aab6.png";const _=(0,n._)("h1",null,"Albums",-1),k={class:"card card__big margin-top-xxl"},w={class:"album-list flex-list"},y=["onClick"],A=(0,n._)("img",{src:g,class:"img-thumbnail album-image",alt:"Cinque Terre",width:"250",height:"150"},null,-1);function T(e,t,a,l,s,r){const i=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)(n.HY,null,[_,(0,n._)("div",k,[(0,n._)("ul",w,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(s.albums,((t,a)=>((0,n.wg)(),(0,n.iD)("li",{class:(0,h.C_)(["album-wrapper",{active:a==s.currentIndex}]),key:a,onClick:l=>e.setActiveTutorial(t,a)},[(0,n.Wm)(i,{to:{name:"viewAlbum",params:{id:t.id,album:t.title}},class:(0,h.C_)("album")},{default:(0,n.w5)((()=>[A,(0,n._)("p",null,(0,h.zw)(t.title),1)])),_:2},1032,["to"])],10,y)))),128))])])],64)}var x=a(669),C=a.n(x),D="";D="/api/";var O=C().create({baseURL:D,headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest",crossDomain:!0}});class ${getAll(){return O.get("/albums")}get(e){return O.get(`/albums/${e}`)}create(e){return O.post("/albums",e)}update(e,t){return O.put(`/albums/${e}`,t)}delete(e){return O["delete"](`/albums/${e}`)}deleteAll(){return O["delete"]("/albums")}findByTitle(e){return O.get(`/albums?title=${e}`)}}var j=new $,H={name:"albums-list",data(){return{albums:[],currentTutorial:null,currentIndex:-1,title:""}},methods:{retrieveAlbums(){j.getAll().then((e=>{this.albums=e.data,console.log(this.albums)})).catch((e=>{this.message=e.response.data.message}))}},mounted(){this.retrieveAlbums()}};const S=(0,b.Z)(H,[["render",T]]);var U=S;const F=(0,n._)("h2",null,"Album View",-1),I=(0,n._)("h3",null,"Playlist",-1);function Y(e,t,a,l,s,r){const i=(0,n.up)("TracksDisplay");return(0,n.wg)(),(0,n.iD)(n.HY,null,[F,(0,n._)("h4",null,(0,h.zw)(s.message),1),(0,n._)("h3",null,(0,h.zw)(s.album.title),1),(0,n._)("button",{color:"success",onClick:t[0]||(t[0]=t=>e.goEditTutorial())},"Edit"),(0,n._)("button",{color:"success",onClick:t[1]||(t[1]=t=>e.goAddLesson(a.id))},"Add Songs"),I,((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(s.tracks,(e=>((0,n.wg)(),(0,n.j4)(i,{key:e.id,track:e},null,8,["track"])))),128))],64)}class E{getAllTracks(e){return console.log("album id...",e),O.get(`/albums/${e}/tracks`)}getTrack(e,t){return O.get(`/albums/${e}/tracks/${t}`)}createTrack(e,t){return O.post(`/albums/${e}/tracks`,t)}updateTrack(e,t,a){return O.put(`/albums/${e}/tracks/${t}`,a)}deleteTrack(e,t){return O["delete"](`/albums/${e}/tracks/${t}`)}}var P=new E;const M={class:"col-md-6"},N={class:"p-3 card"},V={class:"d-flex justify-content-between align-items-center p-3 music"},W={class:"d-flex flex-row align-items-center"},Z=(0,n._)("i",{class:"fa fa-music color"},null,-1),z={class:"ml-2"},L=(0,n._)("i",{class:"fa fa-check color"},null,-1);function R(e,t,a,l,s,r){return(0,n.wg)(),(0,n.iD)("div",M,[(0,n._)("div",N,[(0,n._)("div",V,[(0,n._)("div",W,[Z,(0,n._)("small",z,(0,h.zw)(a.track.title),1)]),L])])])}var q={props:{track:Object},data(){return{}},methods:{}};const K=(0,b.Z)(q,[["render",R]]);var X=K,B={name:"view-album",props:["id"],components:{TracksDisplay:X},data(){return{album:{},tracks:[],message:""}},methods:{retrieveTracks(){j.get(this.id).then((e=>{this.album=e.data,P.getAllTracks(this.id).then((e=>{this.tracks=e.data,console.log("Tracks...",this.tracks)})).catch((e=>{this.message=e.response.data.message}))})).catch((e=>{this.message=e.response.data.message}))},cancel(){this.$router.push({name:"Home"})}},mounted(){this.retrieveTracks()}};const G=(0,b.Z)(B,[["render",Y]]);var J=G;const Q=(0,n._)("h1",null,"Add New Album",-1),ee={class:"row"},te=(0,n._)("div",{class:"col-sm-2"},[(0,n._)("label",{for:"albumTitle"}," Title")],-1),ae={class:"col-sm-8"},le={class:"row"},ne=(0,n._)("div",{class:"col-sm-2"},[(0,n._)("label",{for:"formFile",class:"form-label"}," Cover Image")],-1),se={class:"col-sm-8"},re={class:"row"},ie=(0,n._)("div",{class:"col-sm-2"},[(0,n._)("label",{for:"albumDesc",class:"form-label"},"Description")],-1),oe={class:"col-sm-8"},ue={class:"row"},ce=(0,n._)("div",{class:"col-sm-2"},[(0,n._)("label",{for:"albumDesc",class:"form-label"},"Add Tracks")],-1),me={class:"col-sm-6"},de=["onUpdate:modelValue"],be={id:"add-delete-icons"},pe=["onClick"],fe=["onClick"];function ve(e,t,a,s,r,i){return(0,n.wg)(),(0,n.iD)(n.HY,null,[Q,(0,n._)("div",ee,[te,(0,n._)("div",ae,[(0,n.wy)((0,n._)("input",{type:"text",class:"form-control","onUpdate:modelValue":t[0]||(t[0]=e=>r.album.title=e),id:"album-title",placeholder:"Enter Album Title",name:"title"},null,512),[[l.nr,r.album.title]])])]),(0,n._)("div",le,[ne,(0,n._)("div",se,[(0,n._)("input",(0,n.dG)({class:"form-control",type:"file"},(0,n.mx)(r.album.coverImg),{id:"formFile"}),null,16)])]),(0,n._)("div",re,[ie,(0,n._)("div",oe,[(0,n.wy)((0,n._)("textarea",{class:"form-control","onUpdate:modelValue":t[1]||(t[1]=e=>r.album.description=e),id:"album-desc",rows:"3"},null,512),[[l.nr,r.album.description]])])]),(0,n._)("div",ue,[ce,(0,n._)("div",me,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(r.inputs,((e,t)=>((0,n.wg)(),(0,n.iD)("div",{class:"form-group d-flex flex-row align-items-center",key:t},[(0,n.wy)((0,n._)("input",{type:"text",class:"form-control","onUpdate:modelValue":t=>e.name=t,placeholder:"Enter Song URL"},null,8,de),[[l.nr,e.name]]),(0,n._)("span",be,[(0,n.wy)((0,n._)("i",{class:"fas fa-minus-circle",onClick:e=>i.remove(t)},null,8,pe),[[l.F8,t||!t&&r.inputs.length>1]]),(0,n.wy)((0,n._)("i",{class:"fas fa-plus-circle",onClick:e=>i.add(t)},null,8,fe),[[l.F8,t==r.inputs.length-1]])])])))),128))])]),(0,n._)("button",{type:"button",class:"btn btn-success",onClick:t[2]||(t[2]=e=>i.saveAlbum())},"Save"),(0,n._)("button",{type:"button",class:"btn btn-secondary",onClick:t[3]||(t[3]=e=>i.cancel())},"Cancel")],64)}var he={name:"add-album",data(){return{album:{id:null,title:"",coverImg:"",description:"",published:!1},inputs:[{id:null,name:"",description:"",albumId:""}],message:"Enter data and click save"}},methods:{saveAlbum(){var e={title:this.album.title,description:this.album.description};console.log("Data..",e),j.create(e).then((e=>{for(var t in this.album.id=e.data.id,console.log("add album "+e.data),console.log("inputs..",this.inputs),this.inputs){var a={title:this.inputs[t].name};P.createTrack(this.album.id,a).then((e=>{this.tracks=e.data,console.log("Tracks...",this.tracks)})).catch((e=>{this.message=e.response.data.message}))}this.$router.push({name:"viewAlbum",params:{id:this.album.id,album:this.album.title}})})).catch((e=>{this.message=e.response.data.message}))},cancel(){this.$router.push({name:"Home"})},add(e){console.log("index..",e),this.inputs.push({name:""})},remove(e){this.inputs.splice(e,1)}}};const ge=(0,b.Z)(he,[["render",ve]]);var _e=ge;const ke=[{path:"/",component:U,name:"Home",meta:{transitionName:"slide"}},{path:"/:album",component:J,name:"Album",meta:{transitionName:"slide"}},{path:"/addAlbum",component:_e,name:"addAlbum",meta:{transitionName:"slide"}},{path:"/:id/:album",component:J,name:"viewAlbum",props:!0}],we=(0,v.p7)({base:"/tutorial-frontend-1/",history:(0,v.PO)("/Album_Frontend2/"),routes:ke});var ye=we;a(244);(0,l.ri)(f).use(ye).mount("#app")}},t={};function a(l){var n=t[l];if(void 0!==n)return n.exports;var s=t[l]={exports:{}};return e[l](s,s.exports,a),s.exports}a.m=e,function(){var e=[];a.O=function(t,l,n,s){if(!l){var r=1/0;for(c=0;c<e.length;c++){l=e[c][0],n=e[c][1],s=e[c][2];for(var i=!0,o=0;o<l.length;o++)(!1&s||r>=s)&&Object.keys(a.O).every((function(e){return a.O[e](l[o])}))?l.splice(o--,1):(i=!1,s<r&&(r=s));if(i){e.splice(c--,1);var u=n();void 0!==u&&(t=u)}}return t}s=s||0;for(var c=e.length;c>0&&e[c-1][2]>s;c--)e[c]=e[c-1];e[c]=[l,n,s]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var l in t)a.o(t,l)&&!a.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p="/Album_Frontend2/"}(),function(){var e={143:0};a.O.j=function(t){return 0===e[t]};var t=function(t,l){var n,s,r=l[0],i=l[1],o=l[2],u=0;if(r.some((function(t){return 0!==e[t]}))){for(n in i)a.o(i,n)&&(a.m[n]=i[n]);if(o)var c=o(a)}for(t&&t(l);u<r.length;u++)s=r[u],a.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return a.O(c)},l=self["webpackChunkvue_3_crud"]=self["webpackChunkvue_3_crud"]||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))}();var l=a.O(void 0,[998],(function(){return a(50)}));l=a.O(l)})();
//# sourceMappingURL=app.48f43589.js.map