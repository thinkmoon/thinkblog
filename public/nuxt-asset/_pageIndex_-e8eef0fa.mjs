import{_ as x}from"./PostList-9f19f1f4.mjs";import{_ as T,d as v,m as y,k as E,n as A,q as h,r as B,o as C,c as L,f as m,w as P,j as w,t as f,P as I}from"./entry-d06f46ad.mjs";import{u as d}from"./asyncData-27d44127.mjs";import{T as b}from"./TagApi-1c78ac16.mjs";const k=v({__name:"[pageIndex]",async setup(g,{expose:r}){r();let t,e;const c=y(),a=E(),s={total:0,current:0};s.current=Number(a.params.pageIndex);const[{data:o},{data:i}]=([t,e]=A(()=>Promise.all([d("tag",()=>b.getTag({name:a.params.name})),d("post",()=>I.getListByTag({name:a.params.name}))])),t=await t,e(),t),p=h(i.value);p.forEach(n=>{if(n.fields instanceof Array){const u={};n.fields.forEach(l=>{u[l.name]=l.value}),n.fields=u}});const _={config:c,route:a,pageData:s,tag:o,post:i,postList:p};return Object.defineProperty(_,"__isScriptSetup",{enumerable:!1,value:!0}),_}});function D(g,r,t,e,c,a){const s=B("Title"),o=x;return C(),L("div",null,[m(s,null,{default:P(()=>[w('\u6807\u7B7E" '+f(e.tag[0].name)+'"\u4E0B\u7684\u6587\u7AE0 | '+f(e.config.TITLE),1)]),_:1}),m(o,{"post-list":e.postList},null,8,["post-list"])])}var V=T(k,[["render",D]]);export{V as default};