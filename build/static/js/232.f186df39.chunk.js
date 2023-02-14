"use strict";(self.webpackChunkpublicwebapp=self.webpackChunkpublicwebapp||[]).push([[232],{8232:function(e,t,s){s.r(t),s.d(t,{default:function(){return R}});var i=s(1413),r=s(4165),l=s(2982),n=s(5861),a=s(885),u=s(1134),o=s(4695),d=s(4925),c=s(2791),m=s(6871),f=s(3153),h=s(5107),p=s(9689),v=s(7942),x=v.Ry().shape({name:v.Z_().required("Name is required").min(3,"minimum 3 charcter is required").max(20,"maximum 20 charcter is allowed"),identifier:v.Z_().required("identifier is required").length(14,"enter valid identifier"),addressLine1:v.Z_().required("Address is required"),addressLine2:v.Z_().default(null).nullable(),city:v.Z_().required("City is required"),postcode:v.Z_().required("post code is required").length(6,"enter a valid postcode "),country:v.Z_(),territory:v.Ry().required("Territory is required").nullable(),localAuthority:v.Z_().required("Local Authority is required"),homePage:v.Z_().default(null).nullable(),level:v.Ry().required("Level is required").nullable(),noOfStudents:v.Z_().nullable(),type:v.Ry().default(null).nullable(),isGuest:v.O7().default(!1)}),y=s(7686),g=s(184),b=["type","level","territory"];function j(e){var t=e.levels,s=e.types,r=e.territories,l=(0,c.useState)(""),n=(0,a.Z)(l,2),v=n[0],j=n[1],Z=(0,c.useState)(""),S=(0,a.Z)(Z,2),I=S[0],q=S[1],N=(0,u.cI)({mode:"onChange",resolver:(0,o.X)(x)}),w=(0,m.bx)().handleLoading;return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{className:"flex justify-center",children:[v.length>0&&(0,g.jsx)("div",{className:"bg-warning rounded p-2",children:v}),I.length>0&&(0,g.jsx)("div",{className:"bg-success p-2 rounded",children:I})]}),(0,g.jsx)(u.RV,(0,i.Z)((0,i.Z)({},N),{},{children:(0,g.jsxs)("form",{onSubmit:N.handleSubmit((function(t){q(""),j(""),w(!0);t.type,t.level,t.territory;var s=(0,d.Z)(t,b);(0,y.Qj)("institute/",(0,i.Z)({type:t.type.value,level:t.level.value,territory:t.territory.value},s),{}).then((function(t){1===t.success?(q(t.message),N.reset(),w(!1),e.viewCreatedData(!0)):0===t.success&&(j(t.message),w(!1))}))})),children:[(0,g.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-2",children:[(0,g.jsx)(f.Z,{fieldname:"name",label:"Name",required:!0}),(0,g.jsx)(f.Z,{fieldname:"identifier",label:"Indetifier",type:"number",required:!0}),(0,g.jsx)(f.Z,{fieldname:"addressLine1",label:"Address line 1",required:!0}),(0,g.jsx)(f.Z,{fieldname:"addressLine2",label:"Address line 2"}),(0,g.jsx)(f.Z,{fieldname:"city",label:"Town / City",required:!0}),(0,g.jsx)(f.Z,{fieldname:"postcode",label:"Postcode",type:"number",required:!0}),(0,g.jsx)(f.Z,{fieldname:"country",label:"Country"}),(0,g.jsx)("div",{className:"w-full mt-5",children:(0,g.jsx)(h.q4,{fieldname:"territory",placeholder:"Select Territory",options:r,isSearchable:!1,required:!0})}),(0,g.jsx)("div",{children:(0,g.jsx)(f.Z,{fieldname:"localAuthority",label:"Local Authority",required:!0})}),(0,g.jsx)("div",{className:"w-full mt-5",children:(0,g.jsx)(h.q4,{fieldname:"level",placeholder:"Level",options:t,isSearchable:!1,required:!0})}),(0,g.jsx)("div",{className:"w-full mt-5",children:(0,g.jsx)(h.q4,{fieldname:"type",placeholder:"Type",options:s,isSearchable:!1})}),(0,g.jsx)(f.Z,{fieldname:"homePage",label:"Home Page"}),(0,g.jsx)(f.Z,{fieldname:"noOfStudents",label:"No Of Students",type:"number"})]}),(0,g.jsx)(p.Z,{fieldname:"isGuest",children:(0,g.jsx)("label",{children:"Guset Institution"})}),(0,g.jsx)("div",{className:"flex justify-center",children:(0,g.jsx)("button",{type:"submit",className:"border border-primary px-5 text-center bg-primary text-white  py-1  capitalize hover:bg-white hover:text-primary ",children:"Create Institution"})})]})}))]})}var Z=s(7519),S=["territory","level","type"];function I(e){var t=e.instituteId,s=e.territories,r=e.types,l=e.levels,n=(0,c.useState)({}),v=(0,a.Z)(n,2),b=v[0],j=v[1],I=(0,c.useState)(""),q=(0,a.Z)(I,2),N=q[0],w=q[1],V=(0,c.useState)(""),_=(0,a.Z)(V,2),L=_[0],A=_[1],T=(0,m.bx)().handleLoading,C=(0,u.cI)({mode:"onChange",resolver:(0,o.X)(x)});return(0,c.useEffect)((function(){var e=sessionStorage.getItem("Access");(0,y.dX)("institute/"+t,e,{}).then((function(e){if(1===e.success){var t=e.data;C.setValue("name",t.name),C.setValue("identifier",t.identifier),C.setValue("addressLine1",t.addressLine1),C.setValue("addressLine2",t.addressLine2),C.setValue("city",t.city),C.setValue("country",t.country),C.setValue("postcode",t.postcode),C.setValue("localAuthority",t.localAuthority),C.setValue("noOfStudents",t.noOfStudents),C.setValue("homePage",t.homePage),C.setValue("isGuest",t.isGuest),C.setValue("territory",{label:t.territory,value:t.territory}),C.setValue("level",{label:t.level,value:t.level}),C.setValue("type",{label:t.type,value:t.type}),j(C.getValues())}}))}),[t]),(0,g.jsxs)("div",{children:[(0,g.jsxs)("div",{className:"flex justify-center",children:[N.length>0&&(0,g.jsx)("div",{className:"bg-warning rounded p-2",children:N}),L.length>0&&(0,g.jsx)("div",{className:"bg-success p-2 rounded",children:L})]}),(0,g.jsx)(u.RV,(0,i.Z)((0,i.Z)({},C),{},{children:(0,g.jsxs)("form",{onSubmit:C.handleSubmit((function(s){if((0,Z.O)(b,s)){var r=s.territory,l=s.level,n=s.type,a=(0,d.Z)(s,S),u=sessionStorage.getItem("Access");(0,y.BN)("institute/"+t,(0,i.Z)({level:l.value,type:n.value,territory:r.value},a),u,{}).then((function(t){1===t.success?(A(t.message),T(!1),e.viewUpdatedData(!0)):(w(t.message),T(!1))}))}})),children:[(0,g.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-2",children:[(0,g.jsx)(f.Z,{fieldname:"name",label:"Name",required:!0}),(0,g.jsx)(f.Z,{fieldname:"identifier",label:"Indetifier",type:"number",required:!0}),(0,g.jsx)(f.Z,{fieldname:"addressLine1",label:"Address line 1",required:!0}),(0,g.jsx)(f.Z,{fieldname:"addressLine2",label:"Address line 2"}),(0,g.jsx)(f.Z,{fieldname:"city",label:"Town / City",required:!0}),(0,g.jsx)(f.Z,{fieldname:"postcode",label:"Postcode",type:"number",required:!0}),(0,g.jsx)(f.Z,{fieldname:"country",label:"Country"}),(0,g.jsx)("div",{className:"w-full mt-5",children:(0,g.jsx)(h.q4,{fieldname:"territory",placeholder:"Select Territory",options:s,isSearchable:!1,required:!0})}),(0,g.jsx)(f.Z,{fieldname:"localAuthority",label:"Local Authority",required:!0}),(0,g.jsx)("div",{className:"w-full mt-5",children:(0,g.jsx)(h.q4,{fieldname:"level",placeholder:"Level",options:l,isSearchable:!1,required:!0})}),(0,g.jsx)("div",{className:"w-full mt-5",children:(0,g.jsx)(h.q4,{fieldname:"type",placeholder:"Type",options:r,isSearchable:!1})}),(0,g.jsx)(f.Z,{fieldname:"homePage",label:"Home Page"}),(0,g.jsx)(f.Z,{fieldname:"noOfStudents",label:"No Of Students",type:"number"})]}),(0,g.jsx)(p.Z,{fieldname:"isGuest",children:(0,g.jsx)("label",{children:"Guset Institution"})}),(0,g.jsx)("div",{className:"flex justify-center",children:(0,g.jsx)("button",{type:"submit",className:"border border-primary px-5 text-center bg-primary text-white  py-1  capitalize hover:bg-white hover:text-primary ",children:"Update Institution"})})]})}))]})}var q=s(6226),N=s(4583),w=s(5108),V=s(314),_=v.Ry().shape({query:v.Z_().nullable(),limit:v.Rx().default(5),offset:v.Rx().default(0),institution:v.IX().of(v.Ry()),territory:v.IX().of(v.Ry()),level:v.IX().of(v.Ry()),type:v.IX().of(v.Ry()),guest:v.Ry().nullable()}),L=s(8806),A=s(3839),T=s(158),C=s(100);function R(){var e=(0,u.cI)({mode:"onChange",resolver:(0,o.X)(_),defaultValues:{query:null,limit:5,offset:1,institution:[],territory:[],level:[],type:[],guest:null}}),t=(0,c.useState)([]),s=(0,a.Z)(t,2),d=s[0],f=s[1],p=(0,c.useState)([]),v=(0,a.Z)(p,2),x=v[0],b=v[1],Z=(0,c.useState)([]),S=(0,a.Z)(Z,2),R=S[0],O=S[1],P=(0,c.useState)([]),X=(0,a.Z)(P,2),D=X[0],k=X[1],z=(0,c.useState)([]),G=(0,a.Z)(z,2),M=G[0],F=G[1],E=(0,c.useState)({}),U=(0,a.Z)(E,2),H=U[0],J=U[1],B=(0,c.useState)(""),Y=(0,a.Z)(B,2),Q=Y[0],K=Y[1],W=(0,c.useState)(),$=(0,a.Z)(W,2),ee=$[0],te=$[1],se=(0,c.useState)(),ie=(0,a.Z)(se,2),re=ie[0],le=ie[1],ne=(0,c.useState)({limit:5,offset:1}),ae=(0,a.Z)(ne,2),ue=ae[0],oe=ae[1],de=(0,c.useState)({order:1,sort_by:""}),ce=(0,a.Z)(de,2),me=ce[0],fe=ce[1],he=(0,c.useState)("search"),pe=(0,a.Z)(he,2),ve=pe[0],xe=pe[1],ye=(0,c.useState)(""),ge=(0,a.Z)(ye,2),be=ge[0],je=ge[1],Ze=(0,c.useState)(!1),Se=(0,a.Z)(Ze,2),Ie=Se[0],qe=Se[1],Ne=(0,m.bx)().handleLoading,we=function(){var e=(0,n.Z)((0,r.Z)().mark((function e(t){var s,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t.length>2)){e.next=7;break}return e.next=3,(0,N.t)(t);case 3:return s=e.sent,i=s.map((function(e){return{label:e.name.toUpperCase(),value:e._id}})),f((0,l.Z)(i)),e.abrupt("return",i);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();(0,c.useMemo)((0,n.Z)((0,r.Z)().mark((function t(){var s,i;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s=sessionStorage.getItem("Access"),Ne(!0),t.next=4,(0,y.dX)("institute/",s,{query:e.getValues("query"),limit:e.getValues("limit"),offset:e.getValues("offset"),search_institutions:void 0!==e.getValues("institution")?e.getValues("institution").map((function(e){return e.value})).join("&&"):"",search_territory:void 0!==e.getValues("territory")?e.getValues("territory").map((function(e){return e.value})).join("&&"):"",search_level:void 0!==e.getValues("level")?e.getValues("level").map((function(e){return e.value})).join("&&"):"",order:me.order,sort_by:me.sort_by});case 4:return 1===(i=t.sent).success&&(F(i.data),le(i.count),te(Math.ceil(parseInt(i.count)/e.getValues("limit"))),Ne(!1)),0===i.success&&(F([]),le(0),te(0),Ne(!1)),t.abrupt("return",!0);case 8:case"end":return t.stop()}}),t)}))),[ue,Q,Ie,me]);(0,c.useEffect)((function(){var e=sessionStorage.getItem("Access");return Ne(!0),(0,y.dX)("institute/territory",e,{}).then((function(e){b(e.map((function(e){return{label:e,value:e}})))})),(0,y.dX)("institute/level",e,{}).then((function(e){O(e.map((function(e){return{label:e,value:e}})))})),(0,y.dX)("institute/type",e,{}).then((function(e){k(e.map((function(e){return{label:e,value:e}})))})),Ne(!1)}),[]),(0,c.useEffect)((function(){Ne(!0);var e=sessionStorage.getItem("Access"),t=sessionStorage.getItem("Instituteorder"),s=sessionStorage.getItem("Institutesort_by");return void 0!==s&&null!==s&&null!==t&&void 0!==t&&fe({order:parseInt(t),sort_by:s}),(0,y.dX)("institute/",e,{order:void 0!==t&&null!==t?parseInt(t):1,sort_by:void 0!==s&&null!==s?s:"_id"}).then((function(e){1===e.success?(F(e.data),te(Math.ceil(parseInt(e.count)/5)),le(e.count)):(F([]),te(0),le(0))})),Ne(!1)}),[]);var Ve=function(e){qe(!0!==Ie&&e)};return(0,g.jsxs)("div",{className:"container px-2 text-primary",children:[(0,g.jsx)("div",{className:"capitalize text-lg",children:"institutes"}),(0,g.jsx)(u.RV,(0,i.Z)((0,i.Z)({},e),{},{children:(0,g.jsxs)("form",{onSubmit:e.handleSubmit((function(t){var s=sessionStorage.getItem("Access");e.setValue("limit",5),e.setValue("offset",1),Ne(!0),(0,y.dX)("institute/",s,{query:null!==t.query?t.query:"",search_institutions:void 0!==t.institution&&t.institution.length>0?t.institution.map((function(e){return e.value})).join("&&"):"",search_territory:void 0!==t.territory&&t.territory.length>0?t.territory.map((function(e){return e.value})).join("&&"):"",search_level:void 0!==t.level&&t.level.length>0?t.level.map((function(e){return e.value})).join("&&"):"",search_type:void 0!==t.type&&t.type.length>0?t.type.map((function(e){return e.value})).join("&&"):"",guest:void 0!==t.guest&&null!==t.guest?t.guest.value:""}).then((function(t){1===t.success?(F(t.data),le(t.count),te(Math.ceil(parseInt(t.count)/e.getValues("limit"))),Ne(!1)):0===t.success&&(F([]),le(0),te(0),Ne(!1))}))})),children:[(0,g.jsxs)("div",{className:" mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3",children:[(0,g.jsxs)("div",{className:"w-full pr-4",children:[(0,g.jsx)("label",{className:"capitalize",id:"InstituteSearchLabel","data-tooltip-content":"Search The Name, Territory, Level And Type Here.... ",children:"search"}),(0,g.jsx)("input",(0,i.Z)({type:"text",className:"border rounded primary-placeholder w-full p-4  focus:outline-none",placeholder:"Search..."},e.register("query")))]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("label",{className:"capitalize",children:"Institution"}),(0,g.jsx)(h.EG,{fieldname:"institution",placeholder:"Select Institution",loadOptions:we,defaultOptions:d})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("label",{className:"capitalize",children:"Territory"}),(0,g.jsx)(h.q4,{fieldname:"territory",placeholder:"Select Territory",isMulti:!0,options:x,isSearchable:!1})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("label",{className:"capitalize",children:"Institution level"}),(0,g.jsx)(h.q4,{fieldname:"level",placeholder:"Select Level",isMulti:!0,options:R,isSearchable:!1})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("label",{htmlFor:"",children:" Institution Type"}),(0,g.jsx)(h.q4,{fieldname:"type",placeholder:"Select Type",isMulti:!0,options:D,isSearchable:!1})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("label",{htmlFor:"",children:"Guest Institution"}),(0,g.jsx)(h.q4,{fieldname:"guest",placeholder:"Select...",options:[{label:"Yes",value:"true"},{label:"No",value:"false"}],isSearchable:!1})]})]}),(0,g.jsxs)("div",{className:"flex flex-col space-y-4 md:flex-row md:justify-between  mt-5 md:mt-3",children:[(0,g.jsxs)("div",{className:"flex space-x-8",children:[(0,g.jsx)("button",{type:"submit",className:"border border-primary w-32 text-center bg-primary text-white  py-1  capitalize hover:bg-white hover:text-primary ",children:"search"}),(0,g.jsx)("button",{id:"InstituteSearchReset",className:"border border-primary w-32 text-center bg-primary text-white py-1  capitalize hover:bg-white hover:text-primary",onClick:function(t){t.preventDefault(),e.reset()},children:"reset"})]}),(0,g.jsx)("div",{children:(0,g.jsx)("button",{className:"underline capitalize",onClick:function(e){e.preventDefault(),xe("new"),sessionStorage.setItem("Instituteaction","new")},children:"+ create institute"})})]}),(0,g.jsx)("div",{children:(0,g.jsxs)("div",{className:"conatiner py-1  mt-5",id:"userTableParentDiv",children:[M&&(0,g.jsx)(g.Fragment,{children:M.length>0&&(0,g.jsx)(w.Z,{data:M,isFor:"Institute",handleEdit:function(e){je(e),xe("edit")},handleDelete:function(e){var t;J(e),null===(t=document.getElementById("deleteInstituteModal"))||void 0===t||t.click()},handleSort:function(e){fe({sort_by:e.sort_by,order:e.order})},children:(0,g.jsx)(q.Z,{TotalData:re})})}),0===M.length&&(0,g.jsx)(g.Fragment,{children:(0,g.jsx)("div",{className:"capitalize w-full  text-center text-3xl mt-10",children:"There is No Data To show"})})]})}),M.length>0&&(0,g.jsxs)("div",{className:"flex my-5 justify-between",children:[(0,g.jsx)(T.Z,{handlePageUp:function(t){var s=ue.offset;s<parseInt(ee)&&(e.setValue("offset",s+1),sessionStorage.setItem("offset",(s+1).toString()),oe((0,i.Z)((0,i.Z)({},ue),{},{offset:s+1})))},handlePageDown:function(t){var s=e.getValues("offset");s>1&&(e.setValue("offset",s-1),sessionStorage.setItem("offset",(s-1).toString()),oe((0,i.Z)((0,i.Z)({},ue),{},{offset:s-1})))},handlePageJump:function(t){var s=parseInt(t);t.length>0&&s>=1&&s!==ue.offset&&(e.setValue("offset",s),oe((0,i.Z)((0,i.Z)({},ue),{},{offset:s})),sessionStorage.setItem("offset",t))},lastPage:ee}),(0,g.jsx)(L.Z,{handleChange:function(t){sessionStorage.setItem("limit",t),e.setValue("limit",parseInt(t)),e.setValue("offset",1),sessionStorage.setItem("offset","1"),oe({offset:0,limit:parseInt(t)})},TotalData:re})]})]})})),(0,g.jsx)(V.Z,{id:"deleteInstituteModal",handleConform:function(){Ne(!0);var e=sessionStorage.getItem("Access");(0,y.HG)("user/",e,H._id).then((function(e){Ne(!1),K(e.message)}))},modalText:'Are you sure , You want to delete "'.concat(H.name,'" ?'),isFor:"warning"}),"search"!==ve&&(0,g.jsx)(A.Z,{handleReturn:function(){xe("search"),sessionStorage.setItem("Instituteaction","search")}}),"new"===ve&&(0,g.jsx)(j,{levels:R,types:D,territories:x,viewCreatedData:Ve}),"edit"===ve&&(0,g.jsx)(I,{instituteId:be,levels:R,types:D,territories:x,viewUpdatedData:Ve}),(0,g.jsx)(C.u,{id:"InstituteSearchLabel"})]})}},7519:function(e,t,s){s.d(t,{O:function(){return i}});var i=function(e,t){return JSON.stringify(e)!==JSON.stringify(t)}},9689:function(e,t,s){s.d(t,{Z:function(){return n}});var i=s(1413),r=s(1134),l=s(184);function n(e){var t=(0,r.Gc)().register(e.fieldname),s=(0,r.bc)({name:e.fieldname}).fieldState,n=null===s||void 0===s?void 0:s.error;return(0,l.jsxs)("div",{className:"my-3",children:[(0,l.jsxs)("div",{className:"flex",children:[(0,l.jsx)("input",(0,i.Z)((0,i.Z)({type:"checkbox"},t),{},{className:"h-4 w-4  mt-1"})),(0,l.jsx)("span",{className:" pl-3",children:e.children})]}),(0,l.jsx)("div",{className:"text-sm text-danger",children:null===n||void 0===n?void 0:n.message})]})}},100:function(e,t,s){s.d(t,{u:function(){return l}});var i=s(9248),r=s(184),l=function(e){var t=e.id;return(0,r.jsx)(i.u,{anchorId:t})}}}]);
//# sourceMappingURL=232.f186df39.chunk.js.map