import{a as F,b as O,c as W,h as Q,i as R,n as k,o as q,r as L,u as N,v as z,w as G}from"./chunk-GSNGTXPM.js";import{a as H}from"./chunk-ILVZZ3VC.js";import"./chunk-ZAFSEONU.js";import{$ as u,C as d,D as m,Da as w,F as g,K as p,L as a,M as l,N as r,R as v,S as T,Va as C,X as P,Y as y,Z as _,db as x,eb as A,ib as E,ob as j,pb as D,rb as M,s as b,sa as S,t as c,tb as V,wb as B}from"./chunk-SVTJ7FR3.js";import"./chunk-N3PT3BRI.js";import"./chunk-7KGURMOZ.js";import"./chunk-5TFNS7IN.js";import"./chunk-QKUHOLOF.js";import"./chunk-6DP5AXAB.js";import"./chunk-G3CV3VGG.js";import"./chunk-JX3TYZ34.js";import"./chunk-RUY5SX76.js";import"./chunk-NIOQNOHM.js";import"./chunk-4U6PRYVA.js";import"./chunk-QXT6YJJ4.js";import"./chunk-JWIEPCRG.js";import"./chunk-QPVVTFFW.js";import"./chunk-J6ICYO4L.js";import"./chunk-LF5XB4YN.js";import{a as h,b as f,f as I}from"./chunk-RW4GY4BD.js";var U=["toast"],J=(()=>{let s=class s{constructor(o,e,i){this.router=o,this.dataService=e,this.platform=i,this.mensajeToast="",this.titulo="",this.alertInputs=[{name:"nombre",type:"text",placeholder:"Nombre del recuerdo",value:""}],this.alertButtons=[{text:"Cancelar",role:"cancel"},{text:"Crear",role:"confirm",handler:n=>{n.nombre.trim()!==""&&(this.titulo=n.nombre.trim(),this.guardar())}}],F({triangle:G,ellipse:R,square:z,addSharp:O,createOutline:Q,pencilOutline:L,book:W,heart:k,reorderFour:N,home:q})}focusInput(){setTimeout(()=>{document.querySelector("ion-alert input").focus()})}guardar(){return I(this,null,function*(){if(this.dataService.tituloExiste(this.titulo.trim())){this.mensajeToast="Este recuerdo ya existe",this.toast&&(yield this.toast.present());return}else this.mensajeToast="Recuerdo creado",this.dataService.addRecuerdo({titulo:this.titulo.trim(),fecha:new Date,foto:"",completado:!1});this.router.navigate(["/tabs/tab3"]),this.toast&&(yield this.toast.present())})}eliminar(){this.alertInputs=[...this.alertInputs].map(o=>f(h({},o),{value:""}))}ionViewWillEnter(){this.platform.backButton.subscribeWithPriority(10,()=>{this.router.url!=="/tabs/tab1"&&this.router.navigate(["/tabs/tab1"])})}ngOnInit(){}};s.\u0275fac=function(e){return new(e||s)(m(S),m(H),m(w))},s.\u0275cmp=g({type:s,selectors:[["app-tabs"]],viewQuery:function(e,i){if(e&1&&P(U,5),e&2){let n;y(n=_())&&(i.toast=n.first)}},decls:21,vars:4,consts:[["toast",""],["id","tabular"],["slot","bottom"],["tab","tab2","href","/tabs/tab2"],["aria-hidden","true","name","book"],["tab","tab1","href","/tabs/tab1"],["aria-hidden","true","name","home"],["tab","tab3","href","/tabs/tab3"],["aria-hidden","true","name","reorder-four"],[1,"barraNavegacion"],["slot","fixed","vertical","bottom","horizontal","end",1,"custom-fab"],["id","present-alert"],["name","add-sharp"],["trigger","present-alert","header","Crear nuevo recuerdo",3,"ionAlertDidPresent","ionAlertWillPresent","inputs","buttons"],[3,"message","duration"]],template:function(e,i){if(e&1){let n=v();a(0,"ion-tabs",1)(1,"ion-tab-bar",2)(2,"ion-tab-button",3),r(3,"ion-icon",4),a(4,"ion-label"),u(5,"\xC1lbum"),l()(),a(6,"ion-tab-button",5),r(7,"ion-icon",6),a(8,"ion-label"),u(9,"Inicio"),l()(),a(10,"ion-tab-button",7),r(11,"ion-icon",8),a(12,"ion-label"),u(13,"Men\xFA"),l()()()(),r(14,"div",9),a(15,"ion-fab",10)(16,"ion-fab-button",11),r(17,"ion-icon",12),l()(),a(18,"ion-alert",13),T("ionAlertDidPresent",function(){return b(n),c(i.focusInput())})("ionAlertWillPresent",function(){return b(n),c(i.eliminar())}),l(),r(19,"ion-toast",14,0)}e&2&&(d(18),p("inputs",i.alertInputs)("buttons",i.alertButtons),d(),p("message",i.mensajeToast)("duration",2e3))},dependencies:[V,j,D,B,E,x,A,C,M],styles:[".custom-fab[_ngcontent-%COMP%]{bottom:calc(var(--ion-safe-area-bottom, 0px) + 70px + 1.5rem)}ion-tabs[_ngcontent-%COMP%]{padding-bottom:1.5rem}"]});let t=s;return t})();var lt=[{path:"tabs",component:J,children:[{path:"tab1",loadComponent:()=>import("./chunk-ECPO7X2N.js").then(t=>t.Tab1Page)},{path:"tab2",loadComponent:()=>import("./chunk-KLWVEQFK.js").then(t=>t.Tab2Page)},{path:"tab3",loadComponent:()=>import("./chunk-YGXICE4O.js").then(t=>t.Tab3Page)},{path:"",redirectTo:"/tabs/tab1",pathMatch:"full"}]},{path:"",redirectTo:"/tabs/tab1",pathMatch:"full"}];export{lt as routes};
