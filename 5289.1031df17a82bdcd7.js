"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5289],{5289:($,P,F)=>{F.r(P),F.d(P,{CifradoPageModule:()=>q});var K=F(6895),i=F(433),s=F(6114),Z=F(2598),r=F(8256);const S=[{path:"",component:(()=>{class n{constructor(){this.generarClavesForm=new i.cw({clave:new i.NI("",i.kI.required),subclaveK1:new i.NI,subclaveK2:new i.NI}),this.cifradoForm=new i.cw({textoClaroInput:new i.NI("",i.kI.required),textoCifradoOutput:new i.NI}),this.descifradoForm=new i.cw({textoCifradoInput:new i.NI("",i.kI.required),textoClaroOutput:new i.NI})}calcularClave(){var e,o,a,t;const l=null===(e=this.generarClavesForm.get("clave"))||void 0===e||null===(o=e.value)||void 0===o?void 0:o.toString().split("").map(_=>+_),c=this.verificarVector(l,10),d=this.permutar10(c),[f,b]=this.splitEnDos(d),p=this.corrimientoCircularIzquierda(f),m=this.corrimientoCircularIzquierda(b),g=this.concatenarBloques(p,m),C=this.permutar8(g);null===(a=this.generarClavesForm.get("subclaveK1"))||void 0===a||a.patchValue(C.join(""));let h=this.corrimientoCircularIzquierda(p);h=this.corrimientoCircularIzquierda(h);let v=this.corrimientoCircularIzquierda(m);v=this.corrimientoCircularIzquierda(v);const x=this.concatenarBloques(h,v),u=this.permutar8(x);null===(t=this.generarClavesForm.get("subclaveK2"))||void 0===t||t.patchValue(u.join(""))}cifrar(){var e,o,a,t,l,c,d;const f=null===(e=this.cifradoForm.get("textoClaroInput"))||void 0===e||null===(o=e.value)||void 0===o?void 0:o.toString().split("").map(u=>+u),b=this.verificarVector(f,8),p=this.permutarIP(b),m=null===(a=this.generarClavesForm.get("subclaveK1"))||void 0===a||null===(t=a.value)||void 0===t?void 0:t.toString().split("").map(u=>+u),g=null===(l=this.generarClavesForm.get("subclaveK2"))||void 0===l||null===(c=l.value)||void 0===c?void 0:c.toString().split("").map(u=>+u),C=this.funcionFx(p,m),h=this.swap(C),v=this.funcionFx(h,g),x=this.permutarIPInversa(v);null===(d=this.cifradoForm.get("textoCifradoOutput"))||void 0===d||d.patchValue(x.join(""))}descifrar(){var e,o,a,t,l,c,d;const f=null===(e=this.descifradoForm.get("textoCifradoInput"))||void 0===e||null===(o=e.value)||void 0===o?void 0:o.toString().split("").map(u=>+u),b=this.verificarVector(f,8),p=this.permutarIP(b),m=null===(a=this.generarClavesForm.get("subclaveK1"))||void 0===a||null===(t=a.value)||void 0===t?void 0:t.toString().split("").map(u=>+u),g=null===(l=this.generarClavesForm.get("subclaveK2"))||void 0===l||null===(c=l.value)||void 0===c?void 0:c.toString().split("").map(u=>+u),C=this.funcionFx(p,g),h=this.swap(C),v=this.funcionFx(h,m),x=this.permutarIPInversa(v);null===(d=this.descifradoForm.get("textoClaroOutput"))||void 0===d||d.patchValue(x.join("")),console.log("textoCifradoInput ",f),console.log("vectorIP ",p),console.log("claveK1 ",m),console.log("claveK2 ",g),console.log("fxK1 ",v),console.log("fxSwap ",h),console.log("fxK2 ",C),console.log("mensajeClaro ",x)}permutar10(e){const o=[];return o.push(e[2]),o.push(e[4]),o.push(e[1]),o.push(e[6]),o.push(e[3]),o.push(e[9]),o.push(e[0]),o.push(e[8]),o.push(e[7]),o.push(e[5]),o}splitEnDos(e){const o=e.length/2;return[e.slice(0,o),e.slice(o,2*o)]}corrimientoCircularIzquierda([...e]){const o=e.shift();return e.push(o),e}concatenarBloques(e,o){return[...e,...o]}permutar8(e){const o=[];return o.push(e[5]),o.push(e[2]),o.push(e[6]),o.push(e[3]),o.push(e[7]),o.push(e[4]),o.push(e[9]),o.push(e[8]),o}permutarIP(e){const o=[];return o.push(e[1]),o.push(e[5]),o.push(e[2]),o.push(e[0]),o.push(e[3]),o.push(e[7]),o.push(e[4]),o.push(e[6]),o}permutarIPInversa(e){const o=[];return o.push(e[3]),o.push(e[0]),o.push(e[2]),o.push(e[4]),o.push(e[6]),o.push(e[1]),o.push(e[7]),o.push(e[5]),o}permutarExpansion(e){const o=[];return o.push(e[3]),o.push(e[0]),o.push(e[1]),o.push(e[2]),o.push(e[1]),o.push(e[2]),o.push(e[3]),o.push(e[0]),o}xor(e,o){const a=[];for(let t=0;t<e.length;t++)a.push(e[t]^o[t]);return a}buscarEnS0(e){return[[[0,1],[0,0],[1,1],[1,0]],[[1,1],[1,0],[0,1],[0,0]],[[0,0],[1,0],[0,1],[1,1]],[[1,1],[0,1],[1,1],[1,0]]][2*e[0]+e[3]][2*e[1]+e[2]]}buscarEnS1(e){return[[[0,0],[0,1],[1,0],[1,1]],[[1,0],[0,0],[0,1],[1,1]],[[1,1],[0,0],[0,1],[0,0]],[[1,0],[0,1],[0,0],[1,1]]][2*e[0]+e[3]][2*e[1]+e[2]]}permutar4(e){const o=[];return o.push(e[1]),o.push(e[3]),o.push(e[2]),o.push(e[0]),o}funcionFx(e,o){const[a,t]=this.splitEnDos(e),l=this.permutarExpansion(t),c=this.xor(l,o),[d,f]=this.splitEnDos(c),b=this.buscarEnS0(d),p=this.buscarEnS1(f),m=this.concatenarBloques(b,p),g=this.permutar4(m),C=this.xor(a,g);return this.concatenarBloques(C,t)}swap(e){const[o,a]=this.splitEnDos(e);return[...a,...o]}verificarVector(e,o){if(e.length===o)return[...e];{const a=o-e.length,t=[...e];for(let l=0;l<a;l++)t.unshift(0);return t}}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=r.Xpm({type:n,selectors:[["app-cifrado"]],decls:48,vars:9,consts:[[1,"main-card"],[1,"ion-margin"],[3,"formGroup"],["formControlName","clave","label","Clave","labelPlacement","floating","placeholder","Ingrese una clave de 10 bits","type","number"],[1,"ion-margin",3,"disabled","click"],["formControlName","subclaveK1","label","Subclave K1","labelPlacement","floating","readonly","true"],["formControlName","subclaveK2","label","Subclave K2","labelPlacement","floating","readonly","true"],["formControlName","textoClaroInput","label","Texto claro","labelPlacement","stacked","placeholder","Ingrese un bloque de 8 bits","type","number"],["formControlName","textoCifradoOutput","label","Resultado cifrado","labelPlacement","floating","readonly","true"],["formControlName","textoCifradoInput","label","Texto cifrado","labelPlacement","stacked","placeholder","Ingrese un bloque de 8 bits","type","number"],["formControlName","textoClaroOutput","label","Resultado descifrado","labelPlacement","floating","readonly","true"]],template:function(e,o){1&e&&(r.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),r._uU(3,"Cifrado S-DES para CAYD - C. Camilo Bernal Alarc\xf3n"),r.qZA()()(),r.TgZ(4,"ion-content")(5,"ion-grid")(6,"ion-row")(7,"ion-col")(8,"ion-card",0)(9,"ion-card-header")(10,"ion-card-title"),r._uU(11," Cifrador / Descifrador S-DES "),r.qZA()(),r.TgZ(12,"ion-card-content")(13,"ion-row",1)(14,"ion-col")(15,"form",2)(16,"ion-item"),r._UZ(17,"ion-input",3),r.qZA(),r.TgZ(18,"ion-button",4),r.NdJ("click",function(){return o.calcularClave()}),r._uU(19," Crear subclaves "),r.qZA()()(),r.TgZ(20,"ion-col")(21,"form",2)(22,"ion-item"),r._UZ(23,"ion-input",5),r.qZA(),r.TgZ(24,"ion-item"),r._UZ(25,"ion-input",6),r.qZA()()()(),r.TgZ(26,"ion-row",1)(27,"ion-col")(28,"form",2)(29,"ion-item"),r._UZ(30,"ion-input",7),r.qZA(),r.TgZ(31,"ion-button",4),r.NdJ("click",function(){return o.cifrar()}),r._uU(32," Cifrar "),r.qZA()()(),r.TgZ(33,"ion-col")(34,"form",2)(35,"ion-item"),r._UZ(36,"ion-input",8),r.qZA()()()(),r.TgZ(37,"ion-row",1)(38,"ion-col")(39,"form",2)(40,"ion-item"),r._UZ(41,"ion-input",9),r.qZA(),r.TgZ(42,"ion-button",4),r.NdJ("click",function(){return o.descifrar()}),r._uU(43," Descrifrar "),r.qZA()()(),r.TgZ(44,"ion-col")(45,"form",2)(46,"ion-item"),r._UZ(47,"ion-input",10),r.qZA()()()()()()()()()()),2&e&&(r.xp6(15),r.Q6J("formGroup",o.generarClavesForm),r.xp6(3),r.Q6J("disabled",!o.generarClavesForm.valid),r.xp6(3),r.Q6J("formGroup",o.generarClavesForm),r.xp6(7),r.Q6J("formGroup",o.cifradoForm),r.xp6(3),r.Q6J("disabled",!o.cifradoForm.valid||!o.generarClavesForm.valid),r.xp6(3),r.Q6J("formGroup",o.cifradoForm),r.xp6(5),r.Q6J("formGroup",o.descifradoForm),r.xp6(3),r.Q6J("disabled",!o.descifradoForm.valid||!o.generarClavesForm.valid),r.xp6(3),r.Q6J("formGroup",o.descifradoForm))},dependencies:[i._Y,i.JJ,i.JL,i.sg,i.u,s.YG,s.PM,s.FN,s.Zi,s.Dq,s.wI,s.W2,s.jY,s.Gu,s.pK,s.Ie,s.Nd,s.wd,s.sr,s.as,s.j9],styles:[".main-card[_ngcontent-%COMP%]{margin:50px 10%;box-shadow:var(--main-card-box-shadow)}"]}),n})()}];let w=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=r.oAB({type:n}),n.\u0275inj=r.cJS({imports:[Z.Bz.forChild(S),Z.Bz]}),n})(),q=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=r.oAB({type:n}),n.\u0275inj=r.cJS({imports:[K.ez,i.u5,i.UX,s.Pc,w]}),n})()}}]);