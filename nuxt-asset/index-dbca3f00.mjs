import{_ as y,d as C,l as h,m as x,r as o,o as s,c as p,f as u,w as r,F as k,g as v,i as d,t as c,h as T,C as w}from"./entry-4033bfcf.mjs";import{u as B}from"./asyncData-b0244fb3.mjs";const b=C({async setup(f,{expose:_}){_();let e,t;const i=h(),{data:l}=([e,t]=x(()=>B("category",()=>w.getCategory())),e=await e,t(),e),n={config:i,data:l};return Object.defineProperty(n,"__isScriptSetup",{enumerable:!1,value:!0}),n}}),A={class:"page-content"};function S(f,_,e,t,i,l){const n=o("Title"),m=o("el-link"),g=o("el-tag");return s(),p("div",A,[u(n,null,{default:r(()=>[d("\u6240\u6709\u5206\u7C7B | "+c(t.config.TITLE),1)]),_:1}),(s(!0),p(k,null,v(t.data,a=>(s(),T(g,{key:a.mid,type:"info",class:"category-list"},{default:r(()=>[u(m,{href:`/category/${a.name}/1`,type:"info"},{default:r(()=>[d(c(a.name)+"("+c(a.count)+") ",1)]),_:2},1032,["href"])]),_:2},1024))),128))])}var E=y(b,[["render",S],["__scopeId","data-v-595487db"]]);export{E as default};