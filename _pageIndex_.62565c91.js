import{T as I}from"./components.bf3e1317.js";import{_ as k}from"./PostList.f4f45e70.js";import{a as A,bG as E,bc as N,r as b,b as C,k as g,w as _,j as r,u as e,c as x,aj as v,i as B,o as l,m as u,t as y,y as T}from"./entry.a4e2a0a3.js";import{u as w}from"./asyncData.4bdd4e99.js";import{u as L}from"./config.62c248f9.js";import{A as V}from"./ArticleApi.b5312855.js";import{p as $}from"./BaiduSite.247fc092.js";import"./composables.8750476a.js";import"./TimeUtils.dee93a10.js";import"./RequestAdapter.9216c8df.js";import"./cookie.bb3576d1.js";const j={class:"page-content"},D={class:"post-container"},G={class:"pagination-div"},P=A({__name:"[pageIndex]",async setup(R){let a,m;const h=L(),c=E(),t=c.params.pageIndex,{data:p}=([a,m]=N(()=>w("res",()=>V.getList({current:t}))),a=await a,m(),a),d=b(p.value.records);return d.forEach(s=>{var i;if(s.fields instanceof Array){const o={};(i=s.fields)==null||i.forEach(n=>{o[n.name]=n.value}),s.fields=o}}),p.value.total,$(`/page/${c.params.pageIndex}`),(s,i)=>{const o=I,n=k,f=B("el-link");return l(),C("div",j,[g(o,null,{default:_(()=>[u("\u7B2C"+y(e(c).params.pageIndex)+"\u9875 | "+y(e(h).TITLE),1)]),_:1}),r("div",D,[g(n,{"post-list":e(d)},null,8,["post-list"]),r("div",G,[r("div",null,[Number(e(t))!==1?(l(),x(f,{key:0,href:`/page/${Number(e(t))-1}`,type:"primary"},{default:_(()=>[u(" \u4E0A\u4E00\u9875 ")]),_:1},8,["href"])):v("",!0)]),r("div",null,[Number(e(t))!==e(p).pages?(l(),x(f,{key:0,href:`/page/${Number(e(t))+1}`,type:"primary"},{default:_(()=>[u(" \u4E0B\u4E00\u9875 ")]),_:1},8,["href"])):v("",!0)])])])])}}});const W=T(P,[["__scopeId","data-v-cf53511c"]]);export{W as default};