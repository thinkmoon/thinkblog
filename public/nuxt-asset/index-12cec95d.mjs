import{_ as y,d as T,l as h,m as x,r as o,o as s,c as p,f,w as r,F as k,g as v,i as u,t as c,h as C}from"./entry-4033bfcf.mjs";import{u as w}from"./asyncData-b0244fb3.mjs";import{T as B}from"./TagApi-b908df3a.mjs";const b=T({async setup(d,{expose:_}){_();let e,t;const i=h(),{data:l}=([e,t]=x(()=>w("tag",()=>B.getTag())),e=await e,t(),e),n={config:i,data:l};return Object.defineProperty(n,"__isScriptSetup",{enumerable:!1,value:!0}),n}}),A={class:"page-content"};function E(d,_,e,t,i,l){const n=o("Title"),m=o("el-link"),g=o("el-tag");return s(),p("div",A,[f(n,null,{default:r(()=>[u("\u6807\u7B7E | "+c(t.config.TITLE),1)]),_:1}),(s(!0),p(k,null,v(t.data,a=>(s(),C(g,{key:a.tid,type:"info",class:"tag-list"},{default:r(()=>[f(m,{href:`/tag/${a.name}/1`,type:"info"},{default:r(()=>[u(c(a.name)+"("+c(a.count)+") ",1)]),_:2},1032,["href"])]),_:2},1024))),128))])}var F=y(b,[["render",E],["__scopeId","data-v-06f19bee"]]);export{F as default};