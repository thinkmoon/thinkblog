import{_ as p,d as c,m as _,U as f,b as s,c as h,e as t,w as n,n as w,f as u,o as V}from"./entry-f8220ddd.mjs";const b=c({data(){return{form:{account:"",password:""}}},methods:{onSubmit(){const e=_();f.login(this.form).then(o=>{e.auth=o,localStorage.setItem("token",o),this.$router.push("/admin")}).catch(o=>{this.$message.error("\u767B\u5F55\u9519\u8BEF")})}}}),B={class:"app-container"},g=u("\u767B\u5F55"),C={class:"login-dialog"},$=u("\u767B\u5F55");function k(e,o,v,F,U,S){const d=s("Title"),r=s("el-input"),a=s("el-form-item"),m=s("el-button"),i=s("el-form");return V(),h("div",B,[t(d,null,{default:n(()=>[g]),_:1}),w("div",C,[t(i,{model:e.form,"label-width":"120px"},{default:n(()=>[t(a,{label:"\u8D26\u53F7"},{default:n(()=>[t(r,{modelValue:e.form.account,"onUpdate:modelValue":o[0]||(o[0]=l=>e.form.account=l)},null,8,["modelValue"])]),_:1}),t(a,{label:"\u5BC6\u7801"},{default:n(()=>[t(r,{modelValue:e.form.password,"onUpdate:modelValue":o[1]||(o[1]=l=>e.form.password=l),type:"password","show-password":""},null,8,["modelValue"])]),_:1}),t(a,null,{default:n(()=>[t(m,{type:"primary",onClick:e.onSubmit},{default:n(()=>[$]),_:1},8,["onClick"])]),_:1})]),_:1},8,["model"])])])}var N=p(b,[["render",k],["__scopeId","data-v-2d45ae16"]]);export{N as default};
