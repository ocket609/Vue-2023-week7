import{a as m}from"./axios-L6U4YIEh.js";import{_ as p,c as _,a as e,g as f,h as l,v as d,b as h,F as w,o as g,r as v}from"./index-z-fCUgK3.js";var c={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_NAME:"qoo",BASE_URL:"/Vue-week7/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};console.log(c);const{VITE_URL:b}=c,V={data(){return{user:{username:"",password:""}}},methods:{login(){const r=`${b}/admin/signin`;m.post(r,this.user).then(o=>{const{token:n,expired:a}=o.data;document.cookie=`loginToken=${n}; expires=${new Date(a)}`,this.$router.push("admin/products")}).catch(()=>{alert("登入失敗，請重新操作")})}},mounted(){console.log(this.$router,this.torte)}},x=e("h2",null,"登入頁面",-1),E={class:"container"},R={class:"row justify-content-center"},k=e("h1",{class:"h3 mb-3 font-weight-normal"}," 請先登入 ",-1),y={class:"col-8"},D={class:"form-floating mb-3"},T=e("label",{for:"username"},"Email address",-1),U={class:"form-floating"},B=e("label",{for:"password"},"Password",-1),L=e("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"submit"}," 登入 ",-1),M=e("p",{class:"mt-5 mb-3 text-muted"}," © 2021~∞ - 六角學院 ",-1);function S(r,o,n,a,t,i){const u=v("RouterView");return g(),_(w,null,[x,e("div",E,[e("div",R,[k,e("div",y,[e("form",{id:"form",class:"form-signin",onSubmit:o[2]||(o[2]=f((...s)=>i.login&&i.login(...s),["prevent"]))},[e("div",D,[l(e("input",{type:"email",class:"form-control",id:"username",placeholder:"name@example.com",required:"",autofocus:"","onUpdate:modelValue":o[0]||(o[0]=s=>t.user.username=s)},null,512),[[d,t.user.username]]),T]),e("div",U,[l(e("input",{type:"password",class:"form-control",id:"password",placeholder:"Password",required:"","onUpdate:modelValue":o[1]||(o[1]=s=>t.user.password=s)},null,512),[[d,t.user.password]]),B]),L],32)])]),M]),h(u)],64)}const N=p(V,[["render",S]]);export{N as default};
