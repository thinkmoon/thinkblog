import{G as g,_ as h,d as v,m as w,H as V,I as b,q as B,r as a,o as C,c as x,f as t,w as n,e as T,j as _,t as k,J as y}from"./entry-d06f46ad.mjs";class S{static login(e){return g({method:"post",url:"/user/login",data:e})}}const F=v({__name:"login",setup(c,{expose:e}){e();const d=w(),o=V("auth",{domain:"thinkmoon.cn",maxAge:3600});o.value&&b({path:"/admin"});const r=B({account:"",password:""});function m(){S.login(r).then(s=>{o.value=s,window.location.href="/admin"}).catch(()=>{y.error("\u767B\u5F55\u5931\u8D25")})}const l={config:d,auth:o,form:r,onSubmit:m};return Object.defineProperty(l,"__isScriptSetup",{enumerable:!1,value:!0}),l}}),D={class:"app-container"},E={class:"login-dialog"},I=_(" \u767B\u5F55 ");function N(c,e,d,o,r,m){const l=a("Title"),s=a("el-input"),u=a("el-form-item"),p=a("el-button"),f=a("el-form");return C(),x("div",D,[t(l,null,{default:n(()=>[_("\u767B\u5F55 | "+k(o.config.TITLE),1)]),_:1}),T("div",E,[t(f,{model:o.form},{default:n(()=>[t(u,{label:"\u8D26\u53F7"},{default:n(()=>[t(s,{modelValue:o.form.account,"onUpdate:modelValue":e[0]||(e[0]=i=>o.form.account=i)},null,8,["modelValue"])]),_:1}),t(u,{label:"\u5BC6\u7801"},{default:n(()=>[t(s,{modelValue:o.form.password,"onUpdate:modelValue":e[1]||(e[1]=i=>o.form.password=i),type:"password","show-password":""},null,8,["modelValue"])]),_:1}),t(u,null,{default:n(()=>[t(p,{type:"primary",onClick:o.onSubmit},{default:n(()=>[I]),_:1})]),_:1})]),_:1},8,["model"])])])}var j=h(F,[["render",N],["__scopeId","data-v-c2a835c0"]]);export{j as default};