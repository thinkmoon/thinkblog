import{T as w}from"./components.fa647b49.js";import{a as h,bE as V,r as b,b as x,j as o,w as t,i as y,u as a,p as s,o as B,t as p,x as C,bF as T,y as k}from"./entry.1e6957bb.js";import{u as F}from"./cookie.ddc8e2b4.js";import{u as E}from"./config.878b087e.js";import{d as A}from"./RequestAdapter.5a97ef36.js";import"./composables.f8751a8f.js";class D{static login(l){return A({method:"post",url:"/user/login",data:l})}}const N={class:"app-container"},U={class:"login-dialog"},I=h({__name:"login",setup(c){const l=E(),r=F("auth",{domain:"thinkmoon.cn",maxAge:3600});r.value&&V({path:"/admin"});const e=b({account:"",password:""});function _(){D.login(e).then(d=>{r.value=d,window.location.href="/admin"}).catch(()=>{T.error("\u767B\u5F55\u5931\u8D25")})}return(d,n)=>{const f=w,m=s("el-input"),u=s("el-form-item"),g=s("el-button"),v=s("el-form");return B(),x("div",N,[o(f,null,{default:t(()=>[p("\u767B\u5F55 | "+C(a(l).TITLE),1)]),_:1}),y("div",U,[o(v,{model:a(e)},{default:t(()=>[o(u,{label:"\u8D26\u53F7"},{default:t(()=>[o(m,{modelValue:a(e).account,"onUpdate:modelValue":n[0]||(n[0]=i=>a(e).account=i)},null,8,["modelValue"])]),_:1}),o(u,{label:"\u5BC6\u7801"},{default:t(()=>[o(m,{modelValue:a(e).password,"onUpdate:modelValue":n[1]||(n[1]=i=>a(e).password=i),type:"password","show-password":""},null,8,["modelValue"])]),_:1}),o(u,null,{default:t(()=>[o(g,{type:"primary",onClick:_},{default:t(()=>[p(" \u767B\u5F55 ")]),_:1})]),_:1})]),_:1},8,["model"])])])}}});const z=k(I,[["__scopeId","data-v-0d18ae74"]]);export{z as default};