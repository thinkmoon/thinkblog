import{_ as m,d as C,h as f,u as v,i as x,x as h,b as i,c as w,e as _,w as B,f as E,t as l,m as F,k as D,o as $,P as g}from"./entry-723d84a1.mjs";const y=C({async setup(d,{expose:s}){s();let u,t;const n=f(),a=v(),o=`https://www.thinkmoon.cn/post/${a.params.cid}`,{data:e}=([u,t]=x(()=>D("article",()=>g.getDetail({cid:a.params.cid}))),u=await u,t(),u);let c=`> \u7248\u6743\u58F0\u660E: \u672C\u6587\u9996\u53D1\u4E8E[\u6307\u5C16\u9B54\u6CD5\u5C4B-${e.value.title}](${o}),\u8F6C\u8F7D\u6216\u5F15\u7528\u5FC5\u987B\u7533\u660E\u539F\u6307\u5C16\u9B54\u6CD5\u5C4B\u6765\u6E90\u53CA\u6E90\u5730\u5740\uFF01`;const p=h(()=>`# ${e.value.title} \r
 ${e.value.text} \r
 ${c}`),r={config:n,route:a,url:o,data:e,copyRight:c,content:p};return Object.defineProperty(r,"__isScriptSetup",{enumerable:!1,value:!0}),r}}),T={class:"app-container"},k={class:"article-content"};function A(d,s,u,t,n,a){const o=i("Title"),e=i("v-md-preview");return $(),w("div",T,[_(o,null,{default:B(()=>[E(l(t.data.title)+" | "+l(t.config.TITLE),1)]),_:1}),F("div",k,[_(e,{text:t.content},null,8,["text"])])])}var N=m(y,[["render",A],["__scopeId","data-v-589d7ed6"]]);export{N as default};
