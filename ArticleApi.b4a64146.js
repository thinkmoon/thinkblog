import{d as e}from"./RequestAdapter.5a97ef36.js";class o{static getList(t){return e({method:"get",url:"/post/list",params:t})}static getListByTag(t){return e({method:"get",url:"/post/list-by-tag",params:t})}static getDetail(t){return e({method:"get",url:`/post/${t.cid}`,params:t})}static update(t){return e({method:"post",url:"/post/update",data:t})}static add(t){return e({method:"post",url:"/post/add",data:t})}}export{o as A};