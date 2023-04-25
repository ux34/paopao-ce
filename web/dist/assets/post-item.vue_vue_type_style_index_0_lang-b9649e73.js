import{p as T,a as $,_ as j,b as V,c as D}from"./content-eae289ed.js";import{d as H,n as P,_ as F,o as n,c as d,L as i,a3 as I,U as t,Y as o,F as R,$ as E,Z as x,a as _,K as l,O as r,e as p,M as c}from"./@vue-f70ab1bd.js";import{u as K}from"./vuex-cc1858c6.js";import{b as U,u as Y}from"./vue-router-29025daf.js";import{b as w}from"./formatTime-000dbebb.js";import{j as Z,l as A,m as G,o as J}from"./@vicons-477062ff.js";import{o as Q,M as W,j as X,a as tt,L as et}from"./naive-ui-f5d716a8.js";const st={class:"post-header"},ot={class:"post-header-title"},at={class:"nickname-wrap"},nt={class:"username-wrap"},it={key:3},rt={class:"timestamp-mobile"},ct={key:0,class:"timestamp"},_t=["innerHTML"],lt={class:"opt-item"},pt={class:"opt-item"},mt={class:"opt-item"},ut={class:"opt-item"},xt=H({__name:"post-item",props:{post:null},setup(b){const z=b;U();const g=Y(),u=K(),e=P(()=>{let a=Object.assign({texts:[],imgs:[],videos:[],links:[],attachments:[],charge_attachments:[]},z.post);return a.contents.map(s=>{(+s.type==1||+s.type==2)&&a.texts.push(s),+s.type==3&&a.imgs.push(s),+s.type==4&&a.videos.push(s),+s.type==6&&a.links.push(s),+s.type==7&&a.attachments.push(s),+s.type==8&&a.charge_attachments.push(s)}),a}),y=a=>{g.push({name:"post",query:{id:a}})},C=(a,s)=>{if(a.target.dataset.detail){const m=a.target.dataset.detail.split(":");if(m.length===2){u.commit("refresh"),m[0]==="tag"?g.push({name:"home",query:{q:m[1],t:"tag"}}):g.push({name:"user",query:{username:m[1]}});return}}y(s)};return(a,s)=>{const m=Q,M=F("router-link"),k=W,v=$,S=j,O=V,q=D,h=X,B=tt,L=et;return n(),d("div",{class:"post-item",onClick:s[2]||(s[2]=f=>y(t(e).id))},[i(L,{"content-indented":""},I({header:o(()=>[_("div",st,[t(u).state.desktopModelShow?r("",!0):(n(),l(m,{key:0,round:"",size:34,src:t(e).user.avatar},null,8,["src"])),_("div",ot,[_("span",at,[i(M,{onClick:s[0]||(s[0]=x(()=>{},["stop"])),class:"username-link",to:{name:"user",query:{username:t(e).user.username}}},{default:o(()=>[p(c(t(e).user.nickname),1)]),_:1},8,["to"])]),_("span",nt," @"+c(t(e).user.username),1),t(e).is_top?(n(),l(k,{key:0,class:"top-tag",type:"warning",size:"small",round:""},{default:o(()=>[p(" 置顶 ")]),_:1})):r("",!0),t(e).visibility==1?(n(),l(k,{key:1,class:"top-tag",type:"error",size:"small",round:""},{default:o(()=>[p(" 私密 ")]),_:1})):r("",!0),t(e).visibility==2?(n(),l(k,{key:2,class:"top-tag",type:"info",size:"small",round:""},{default:o(()=>[p(" 好友可见 ")]),_:1})):r("",!0),t(u).state.desktopModelShow?r("",!0):(n(),d("div",it,[_("span",rt,c(t(w)(t(e).created_on))+" "+c(t(e).ip_loc),1)]))])])]),"header-extra":o(()=>[t(u).state.desktopModelShow?(n(),d("span",ct,c(t(e).ip_loc?t(e).ip_loc+" · ":t(e).ip_loc)+" "+c(t(w)(t(e).created_on)),1)):r("",!0)]),footer:o(()=>[t(e).attachments.length>0?(n(),l(v,{key:0,attachments:t(e).attachments},null,8,["attachments"])):r("",!0),t(e).charge_attachments.length>0?(n(),l(v,{key:1,attachments:t(e).charge_attachments,price:t(e).attachment_price},null,8,["attachments","price"])):r("",!0),t(e).imgs.length>0?(n(),l(S,{key:2,imgs:t(e).imgs},null,8,["imgs"])):r("",!0),t(e).videos.length>0?(n(),l(O,{key:3,videos:t(e).videos},null,8,["videos"])):r("",!0),t(e).links.length>0?(n(),l(q,{key:4,links:t(e).links},null,8,["links"])):r("",!0)]),action:o(()=>[i(B,{justify:"space-between"},{default:o(()=>[_("div",lt,[i(h,{size:"18",class:"opt-item-icon"},{default:o(()=>[i(t(Z))]),_:1}),p(" "+c(t(e).upvote_count),1)]),_("div",pt,[i(h,{size:"18",class:"opt-item-icon"},{default:o(()=>[i(t(A))]),_:1}),p(" "+c(t(e).comment_count),1)]),_("div",mt,[i(h,{size:"18",class:"opt-item-icon"},{default:o(()=>[i(t(G))]),_:1}),p(" "+c(t(e).collection_count),1)]),_("div",ut,[i(h,{size:"18",class:"opt-item-icon"},{default:o(()=>[i(t(J))]),_:1}),p(" "+c(t(e).share_count),1)])]),_:1})]),_:2},[t(u).state.desktopModelShow?{name:"avatar",fn:o(()=>[i(m,{round:"",size:30,src:t(e).user.avatar},null,8,["src"])]),key:"0"}:void 0,t(e).texts.length>0?{name:"description",fn:o(()=>[(n(!0),d(R,null,E(t(e).texts,f=>(n(),d("span",{key:f.id,class:"post-text",onClick:s[1]||(s[1]=x(N=>C(N,t(e).id),["stop"])),innerHTML:t(T)(f.content).content},null,8,_t))),128))]),key:"1"}:void 0]),1024)])}}});export{xt as _};
