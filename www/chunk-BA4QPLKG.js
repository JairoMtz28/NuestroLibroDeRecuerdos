import{b as E}from"./chunk-O2MFTEA2.js";import"./chunk-MT72KDUU.js";import{a as B}from"./chunk-ILVZZ3VC.js";import"./chunk-VHKH62GO.js";import"./chunk-ZDDW5CPB.js";import"./chunk-YMI2B6JE.js";import"./chunk-KMFQRFGI.js";import"./chunk-HC6MZPB3.js";import"./chunk-SJ3XB5YM.js";import"./chunk-FERD25SW.js";import"./chunk-SYQESB6R.js";import"./chunk-LEIMCQKJ.js";import"./chunk-MM5QLNJM.js";import"./chunk-72KDLSWN.js";import"./chunk-5OMUW5VI.js";import"./chunk-OBXDPQ3V.js";import"./chunk-RGGZSNFT.js";import"./chunk-MCRJI3T3.js";import"./chunk-7DSXY4XA.js";import"./chunk-TPTBYCHL.js";import"./chunk-ZAFSEONU.js";import{$ as l,C as r,Ca as w,D as s,F as b,K as d,L as n,M as i,N as _,S as M,Xa as I,ca as m,cb as S,da as c,ea as p,gb as j,oa as v,qb as T,rb as x,sa as y,sb as W,vb as D,xb as O,ya as C,za as P}from"./chunk-SVTJ7FR3.js";import"./chunk-N3PT3BRI.js";import"./chunk-7KGURMOZ.js";import"./chunk-5TFNS7IN.js";import"./chunk-QKUHOLOF.js";import"./chunk-6DP5AXAB.js";import"./chunk-G3CV3VGG.js";import"./chunk-JX3TYZ34.js";import"./chunk-RUY5SX76.js";import"./chunk-NIOQNOHM.js";import"./chunk-4U6PRYVA.js";import"./chunk-QXT6YJJ4.js";import"./chunk-JWIEPCRG.js";import"./chunk-QPVVTFFW.js";import"./chunk-J6ICYO4L.js";import"./chunk-LF5XB4YN.js";import{f}from"./chunk-RW4GY4BD.js";var q=(()=>{let o=class o{constructor(u,a,e){this.router=u,this.dataService=a,this.toastController=e,this.nombre="",this.nombrePareja="",this.aniversario=null,this.fechaHoy=new Date}iniciar(){return f(this,null,function*(){this.dataService.nombre=this.nombre,this.dataService.nombrePareja=this.nombrePareja,this.dataService.aniversario=this.aniversario,this.router.navigate(["/tabs"])})}get boton(){return this.nombre.trim()!==""&&this.nombrePareja.trim()!==""&&this.aniversario!==null&&new Date(this.aniversario)<=new Date}ngOnInit(){}};o.\u0275fac=function(a){return new(a||o)(s(y),s(B),s(E))},o.\u0275cmp=b({type:o,selectors:[["app-inicio"]],decls:16,vars:6,consts:[[3,"fullscreen"],["collapse","condense"],["size","large"],["label","T\xFA nombre o apodo","label-placement","floating","fill","solid","placeholder","Nombre",3,"ngModelChange","ngModel"],["label","Nombre o apodo de tu pareja","label-placement","floating","fill","solid","placeholder","Nombre de tu pareja",3,"ngModelChange","ngModel"],["presentation","date",3,"ngModelChange","ngModel"],["id","mostrarToast",3,"click","disabled"],["trigger","mostrarToast","message","\xA1Bienvenido!",3,"duration"]],template:function(a,e){a&1&&(n(0,"ion-content",0)(1,"ion-header",1)(2,"ion-toolbar")(3,"ion-title",2),l(4,"inicio"),i()()(),n(5,"section")(6,"h1"),l(7,"\xA1Bienvenido!"),i(),l(8," Por favor, introduce tu informaci\xF3n: "),n(9,"ion-input",3),p("ngModelChange",function(t){return c(e.nombre,t)||(e.nombre=t),t}),i(),n(10,"ion-input",4),p("ngModelChange",function(t){return c(e.nombrePareja,t)||(e.nombrePareja=t),t}),i(),l(11," Selecciona la fecha de su aniversario: "),n(12,"ion-datetime",5),p("ngModelChange",function(t){return c(e.aniversario,t)||(e.aniversario=t),t}),i(),n(13,"ion-button",6),M("click",function(){return e.iniciar()}),l(14,"Iniciar"),i()()(),_(15,"ion-toast",7)),a&2&&(d("fullscreen",!0),r(9),m("ngModel",e.nombre),r(),m("ngModel",e.nombrePareja),r(2),m("ngModel",e.aniversario),r(),d("disabled",!e.boton),r(2),d("duration",2e3))},dependencies:[S,j,T,W,v,w,C,P,O,D,I,x],styles:["ion-content[_ngcontent-%COMP%]{--background: #f8f9fa;display:flex;justify-content:center;align-items:center;height:100vh;text-align:center}ion-header[_ngcontent-%COMP%]{position:absolute;top:0;width:100%}section[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;width:90%;max-width:400px;background:#fff;padding:20px;border-radius:10px;box-shadow:0 4px 6px #0000001a;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}h1[_ngcontent-%COMP%]{margin-bottom:10px}ion-input[_ngcontent-%COMP%]{width:100%;margin-bottom:15px;text-align:start}ion-button[_ngcontent-%COMP%]{width:100%;margin-top:10px}"]});let g=o;return g})();export{q as InicioPage};
