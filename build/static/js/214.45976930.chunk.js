"use strict";(self.webpackChunkpublicwebapp=self.webpackChunkpublicwebapp||[]).push([[214],{7686:function(e,t,n){n.d(t,{BN:function(){return d},HG:function(){return c},Qj:function(){return l},dX:function(){return u}});var r=n(4165),a=n(5861),i=n(8695),s="http://localhost:3000/",o=function(e){return{authorization:e,Accept:"application/json","Content-Type":"application/json"}},l=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t,n,a){var l,d;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l=sessionStorage.getItem("Access"),e.prev=1,e.next=4,i.Z.post(s+t,n,{headers:o(l),params:a});case 4:return d=e.sent,console.log(l,"token"),e.abrupt("return",d.data);case 9:return e.prev=9,e.t0=e.catch(1),e.abrupt("return",e.t0.response.data);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t,n,r){return e.apply(this,arguments)}}(),d=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t,n,a,l){var d;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.Z.put(s+t,n,{headers:o(a),params:l});case 3:return d=e.sent,e.abrupt("return",d.data);case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",e.t0.response.data);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n,r,a){return e.apply(this,arguments)}}(),c=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t,n,a){var l;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.Z.delete(s+t+a,{headers:o(n)});case 3:return l=e.sent,e.abrupt("return",l.data);case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",e.t0.response.data);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n,r){return e.apply(this,arguments)}}(),u=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t,n,a){var l;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.Z.get(s+t,{headers:o(n),params:a});case 3:return l=e.sent,e.abrupt("return",l.data);case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",e.t0.response.data);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n,r){return e.apply(this,arguments)}}()},4583:function(e,t,n){n.d(t,{M:function(){return o},t:function(){return d}});var r=n(4165),a=n(5861),i=n(8695),s="http://localhost:3000/";function o(){return l.apply(this,arguments)}function l(){return(l=(0,a.Z)((0,r.Z)().mark((function e(){var t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.Z.get(s+"title");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function d(e){return c.apply(this,arguments)}function c(){return(c=(0,a.Z)((0,r.Z)().mark((function e(t){var n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.Z.get(s+"searchinstitute",{params:{key:t}});case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},5107:function(e,t,n){n.d(t,{EG:function(){return b},q4:function(){return v},rS:function(){return g}});var r=n(4925),a=n(1413),i=n(8622),s=n(1249),o=n(1134),l=n(2791),d=n(184),c=["fieldname","required","options","isSearchable","isMulti"],u=["singleValue"],f=["fieldname","required","loadOptions","instituteDefaultOptions"],p=["singleValue"],h=["fieldname","required","loadOptions","defaultOptions","isSearchable"],m=function(e){return{display:"flex",flexDirection:"column",":before":{content:e,textTransform:"capitalize",fontSize:"15px",opacity:"0.7"}}},x={menu:function(e){return(0,a.Z)((0,a.Z)({},e),{},{zIndex:50})},control:function(e){return(0,a.Z)((0,a.Z)({},e),{},{padding:"10px 0px",color:"#274472",outline:0,border:"1 !important",borderColor:"#274472",boxShadow:"0 !important","&:hover":{borderColor:"#274472"}})},singleValue:function(e){return(0,a.Z)((0,a.Z)({},e),{},{color:"#274472"})},placeholder:function(e){return(0,a.Z)((0,a.Z)({},e),{},{color:"#274472"})}},v=(0,l.forwardRef)((function(e,t){var n=e.fieldname,s=e.required,l=e.options,f=e.isSearchable,p=e.isMulti,h=(0,r.Z)(e,c),v=(0,o.Gc)(),g=v.register(n),b=(0,o.bc)({name:n}).fieldState,y=null===b||void 0===b?void 0:b.error,j="'"+n+"'",w=(0,r.Z)(x,u);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"flex  w-full space-x-2",children:[(0,d.jsx)("div",{className:"w-full",children:(0,d.jsx)(o.Qr,(0,a.Z)((0,a.Z)({control:v.control},g),{},{render:function(e){var t=e.field;return(0,d.jsx)(i.ZP,(0,a.Z)((0,a.Z)({isSearchable:f},t),{},{options:l,isMulti:void 0!==p&&!0===p,isClearable:!0,styles:(0,a.Z)({singleValue:function(e){return(0,a.Z)((0,a.Z)((0,a.Z)({},e),m(j)),{},{color:"#274472",fontSize:"15px"})}},w)},h))}}))}),(0,d.jsx)("div",{className:"w-2 ".concat("required"!==(null===y||void 0===y?void 0:y.type)?"text-primary":"text-danger"),children:s&&(0,d.jsx)("span",{children:"*"})})]}),(0,d.jsx)("div",{className:"text-sm text-danger capitalize",children:null===y||void 0===y?void 0:y.message})]})}));function g(e){var t=e.fieldname,n=e.required,i=e.loadOptions,l=e.instituteDefaultOptions,c=(0,r.Z)(e,f),u=(0,o.Gc)(),h=u.register(t),v=(0,o.bc)({name:t}).fieldState,g=null===v||void 0===v?void 0:v.error,b=null!==u.getValues(t)?l:[],y="'"+t+"'",j=(0,r.Z)(x,p);return(0,d.jsxs)("div",{children:[(0,d.jsxs)("div",{className:"flex mt-5 w-full space-x-2",children:[(0,d.jsx)("div",{className:"w-full",children:(0,d.jsx)(o.Qr,(0,a.Z)((0,a.Z)({control:u.control},h),{},{render:function(e){var t=e.field;return(0,d.jsx)(s.Z,(0,a.Z)((0,a.Z)((0,a.Z)({},t),{},{cacheOptions:!0,defaultOptions:b,isClearable:!0,loadOptions:i,getOptionValue:function(e){return e.value},getOptionLabel:function(e){return e.label},styles:(0,a.Z)({singleValue:function(e){return(0,a.Z)((0,a.Z)((0,a.Z)({},e),m(y)),{},{color:"#274472",fontSize:"15px"})}},j)},c),{},{noOptionsMessage:function(e){var t=e.inputValue;return t?t.length>2?"No Result Are Found Matching This Value":"Type At Least Three Character to View Result":"Start Typing to View Results"}}))}}))}),(0,d.jsx)("div",{className:"w-2 ".concat("required"!==(null===g||void 0===g?void 0:g.type)?"text-primary":"text-danger"),children:n&&(0,d.jsx)("span",{children:"*"})})]}),(0,d.jsx)("div",{className:"text-sm text-danger capitalize",children:null===g||void 0===g?void 0:g.message})]})}function b(e){var t=e.fieldname,n=e.required,i=e.loadOptions,c=e.defaultOptions,u=e.isSearchable,f=(0,r.Z)(e,h),p=(0,o.Gc)(),m=p.register(t),v=(0,o.bc)({name:t}).fieldState,g=null===v||void 0===v?void 0:v.error;return(0,l.useEffect)((function(){var e=sessionStorage.getItem(t);void 0!==e&&null!==e&&(null===e||void 0===e?void 0:e.length)>0&&p.setValue(t,JSON.parse(e))}),[]),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"flex w-full space-x-2",children:[(0,d.jsx)("div",{className:"w-full",children:(0,d.jsx)(o.Qr,(0,a.Z)((0,a.Z)({control:p.control},m),{},{render:function(e){var t=e.field;return(0,d.jsx)(s.Z,(0,a.Z)((0,a.Z)({},t),{},{isMulti:!0,isClearable:!0,cacheOptions:!0,isSearchable:u,defaultOptions:c,loadOptions:i,getOptionValue:function(e){return e.value},getOptionLabel:function(e){return e.label},styles:x,noOptionsMessage:function(e){var t=e.inputValue;return t?t.length>2?"No Result Are Found Matching This Value":"Type At Least Three Character to View Result":"Start Typing to View Results"}},f))}}))}),(0,d.jsx)("div",{className:"w-2 ".concat("required"!==(null===g||void 0===g?void 0:g.type)?"text-primary":"text-danger"),children:n&&(0,d.jsx)("span",{children:"*"})})]}),(0,d.jsx)("div",{className:"text-sm text-danger capitalize",children:null===g||void 0===g?void 0:g.message})]})}},3153:function(e,t,n){n.d(t,{Z:function(){return l}});var r=n(1413),a=n(4925),i=n(1134),s=n(184),o=["fieldname","required","type","label"];function l(e){var t=e.fieldname,n=e.required,l=e.type,d=e.label,c=(0,a.Z)(e,o),u=(0,i.Gc)(),f=u.register(t),p=(0,i.bc)({name:t}).fieldState,h=null===p||void 0===p?void 0:p.error;return(0,s.jsxs)("div",{children:[(0,s.jsxs)("div",{className:"flex mt-5 w-full space-x-2",children:[(0,s.jsxs)("div",{className:"form-floating  w-full",children:[(0,s.jsx)("input",(0,r.Z)((0,r.Z)((0,r.Z)({type:l||"text"},f),c),{},{className:"form-control  block rounded px-2.5 pb-2.5 pt-5 w-full text-sm border transition ease-in-out m-0  focus:outline-none focus:ring-0",placeholder:d,onKeyDown:function(e){"number"===l&&"KeyE"===e.code&&e.preventDefault(),"identifier"===t&&u.getValues(t).length>=14&&(parseInt(e.key)<=9||parseInt(e.key)>=0||"-"===e.key||"+"===e.key)&&e.preventDefault(),"postcode"===t&&u.getValues(t).length>=6&&(parseInt(e.key)<=9||parseInt(e.key)>=0||"-"===e.key||"+"===e.key)&&e.preventDefault()}})),(0,s.jsx)("label",{className:"text-primary",children:d})]}),(0,s.jsx)("div",{className:"w-2 ".concat("required"!==(null===h||void 0===h?void 0:h.type)?"text-primary":"text-danger"),children:n&&(0,s.jsx)("span",{children:"*"})})]}),(0,s.jsx)("div",{className:"text-sm text-danger capitalize",children:null===h||void 0===h?void 0:h.message})]})}},314:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(8820),a=n(184);function i(e){var t=e.handleConform,n=e.modalText,i=e.isFor,s=e.id;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("button",{id:s,className:"hidden","data-bs-toggle":"modal","data-bs-target":"#confirm"+s}),(0,a.jsx)("div",{className:"modal fade fixed top-20 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto",id:"confirm"+s,"data-bs-backdrop":"static","data-bs-keyboard":"false",tabIndex:-1,"aria-labelledby":"staticBackdropLabel","aria-hidden":"true",children:(0,a.jsx)("div",{className:"modal-dialog relative w-auto pointer-events-none text-primary",children:(0,a.jsxs)("div",{className:"modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current",children:[(0,a.jsxs)("div",{className:"modal-header flex flex-shrink-0 items-center justify-between p-4 border-b  rounded-t-md",children:[(0,a.jsx)("h5",{className:"text-xl font-medium leading-normal ",id:"exampleModalLabel",children:(0,a.jsxs)("div",{className:"flex items-center space-x-2 ".concat("warning"===i?"text-danger":"text-success"),children:["warning"===i?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.SR5,{})," ",(0,a.jsx)("span",{children:" Alert"})]}):(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("span",{children:"success"})})," "]})}),(0,a.jsx)("button",{type:"button",className:"btn-close box-content w-4 h-4 p-1 text-secondary border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-primary hover:opacity-75 hover:no-underline","data-bs-dismiss":"modal","aria-label":"Close"})]}),(0,a.jsx)("div",{className:"modal-body relative p-4",children:n}),(0,a.jsxs)("div",{className:"modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t  rounded-b-md",children:[(0,a.jsx)("button",{type:"button",className:"inline-block px-6 py-2.5  text-danger font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out","data-bs-dismiss":"modal",onClick:function(e){e.preventDefault(),t()},children:"Yes"}),(0,a.jsx)("button",{type:"button","data-bs-dismiss":"modal",className:"inline-block px-6 py-2.5 bg-blue-600  font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1",children:"No"})]})]})})})]})}},158:function(e,t,n){var r=n(1413),a=n(1134),i=n(9126),s=n(184);t.Z=function(e){var t=e.handlePageUp,n=e.handlePageDown,o=e.handlePageJump,l=e.lastPage,d=(0,a.Gc)();return(0,s.jsxs)("div",{children:[(0,s.jsx)("button",{onClick:function(e){e.preventDefault(),n()},children:(0,s.jsx)(i.eG2,{})}),(0,s.jsx)("input",(0,r.Z)((0,r.Z)({type:"number",id:"offsetForUserManagement",className:"w-10 mx-3 text-center appearance-none border-b border-primary focus:outline-none "},d.register("offset")),{},{onChange:function(e){e.target.value=e.target.value.replace(/e/g,""),parseInt(e.target.value)<1&&(e.target.value=""),parseInt(e.target.value)>l&&(e.target.value=l),o(e.target.value)},onKeyDown:function(e){"KeyE"===e.code&&e.preventDefault()},onWheel:function(e){e.target.blur()}})),(0,s.jsx)("button",{onClick:function(e){e.preventDefault(),t()},children:(0,s.jsx)(i.F3t,{})})]})}},3839:function(e,t,n){var r=n(6856),a=n(184);t.Z=function(e){var t=e.handleReturn;return(0,a.jsx)("div",{className:"flex justify-end",children:(0,a.jsxs)("button",{className:"flex items-center space-x-2  text-primary ",onClick:function(e){e.preventDefault(),t()},children:[(0,a.jsx)("span",{children:"return to top"})," ",(0,a.jsx)(r.FU5,{className:"text-lg"})]})})}},8806:function(e,t,n){var r=n(1413),a=n(1134),i=n(184);t.Z=function(e){var t=e.handleChange,n=e.TotalData,s=(0,a.Gc)();return(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{htmlFor:"",children:"Display "}),(0,i.jsxs)("select",(0,r.Z)((0,r.Z)({id:"",className:"bg-white focus:outline-none border-b "},s.register("limit")),{},{onChange:function(e){e.preventDefault(),t(e.target.value)},children:[(0,i.jsx)("option",{value:5,children:"5 rows"}),(0,i.jsx)("option",{value:10,disabled:n<=5,children:"10 rows"}),(0,i.jsx)("option",{value:15,disabled:n<=10,children:"15 rows"})]}))]})}},6226:function(e,t,n){var r=n(1134),a=n(184);t.Z=function(e){var t=e.TotalData,n=(0,r.Gc)();return(0,a.jsxs)("div",{children:["showing ",(n.getValues("offset")-1)*n.getValues("limit")," -"," ",t<n.getValues("offset")*n.getValues("limit")?t:n.getValues("offset")*n.getValues("limit")," ","of ",t," results"]})}},5108:function(e,t,n){n.d(t,{Z:function(){return u}});var r=n(4942),a=n(1413),i=n(885),s=n(6856),o=n(6036),l=n(2791);function d(e,t){var n=e.getElementsByTagName("tr")[0],r=n?n.children:void 0;if(r){e.style.overflow="hidden";for(var a=e.offsetHeight,i=0;i<r.length;i++){var s=l(a);r[i].appendChild(s),r[i].style.position="relative",o(s)}}function o(e){var n,r,a,i;e.addEventListener("mousedown",(function(e){var s;i=null===(s=document.getElementById(t))||void 0===s?void 0:s.offsetWidth,r=e.target.parentElement,r.nextElementSibling,n=e.pageX;var o=function(e){if("border-box"===d(e,"box-sizing"))return 0;var t=d(e,"padding-left"),n=d(e,"padding-right");return parseInt(t)+parseInt(n)}(r);a=r.offsetWidth-o})),e.addEventListener("mouseover",(function(e){e.target.style.borderRight="2px solid #0000ff"})),e.addEventListener("mouseout",(function(e){e.target.style.borderRight=""})),document.addEventListener("mousemove",(function(e){if(r){var s=e.pageX-n;if(s<300)r.style.width=a+s+"px",document.getElementById(t).style.width=i+s+"px"}})),document.addEventListener("mouseup",(function(e){r=void 0,void 0,n=void 0,void 0,a=void 0}))}function l(e){var t=document.createElement("div");return t.style.top=0,t.style.right=0,t.style.width="5px",t.style.position="absolute",t.style.cursor="col-resize",t.style.userSelect="none",t.style.height=e+"px",t}function d(e,t){return window.getComputedStyle(e,null).getPropertyValue(t)}}var c=n(184);function u(e){var t=e.data,n=e.isFor,u=e.handleEdit,f=e.handleDelete,p=e.handleSort,h=e.children,m=(0,l.useState)({}),x=(0,i.Z)(m,2),v=x[0],g=x[1],b=(0,l.useState)({field:"",order:0,visible:!1}),y=(0,i.Z)(b,2),j=y[0],w=y[1];(0,l.useEffect)((function(){for(var e=document.getElementsByClassName("table"),t=0;t<e.length;t++)d(e[t],"Table");var r=sessionStorage.getItem(n+"order"),a=sessionStorage.getItem(n+"sort_by");null!==a&&void 0!==a&&void 0!==r&&null!==r&&w({order:-1===parseInt(r)?0:1,field:a,visible:!0})}),[]),(0,l.useEffect)((function(){var e={};Object.keys(t[0]).map((function(t){e[t]=!0})),g(e)}),[t]);return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{className:"flex justify-between items-center",children:[(0,c.jsx)("div",{children:h}),(0,c.jsxs)("div",{className:"dropdown relative",children:[(0,c.jsx)("button",{className:" dropdown-toggle px-6 py-2 bg-primary text-white font-medium capitalize shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out flex items-center whitespace-nowrap",type:"button","data-bs-toggle":"dropdown","aria-expanded":"false",children:"Column"}),(0,c.jsx)("ul",{className:" dropdown-menu min-w-max h-32 border  overflow-x-hidden overflow-y-auto scrollbar-none  appearance-none absolute hidden bg-white text-base z-20 float-left py-2 list-none text-left   shadow-lg mt-1 m-0 bg-clip-padding ",children:Object.keys(t[0]).map((function(e,t){return(0,c.jsx)("li",{className:"px-2 py-0.5 w-full",children:(0,c.jsxs)("div",{className:"dropdown-item flex space-x-2 w-full",children:[(0,c.jsx)("input",{type:"checkbox",checked:v[e],className:"text-primary w-fit border-primary",onChange:function(t){g((0,a.Z)((0,a.Z)({},v),{},(0,r.Z)({},e,t.target.checked)))},defaultChecked:!0}),(0,c.jsxs)("label",{className:"capitalize",children:[e.toString().split(/(?=[A-Z])/).join(" ")," "]})]})},t)}))})]})]}),(0,c.jsx)("div",{id:"TableParent",className:"w-full overflow-x-auto overflow-y-hidden h-fit  scrollbar-none",onWheel:function(e){!function(e){document.getElementById("TableParent").scrollLeft+=e.deltaY}(e)},onMouseOver:function(e){document.getElementById("LandingPage").style.overflow="hidden"},onMouseLeave:function(e){document.getElementById("LandingPage").style.overflow="auto"},children:(0,c.jsxs)("table",{className:"table w-full text-center border-collapse mt-5 min-w-[1422px]",id:"Table",children:[(0,c.jsx)("thead",{id:n+"TableHeader","data-tooltip-content":"do double click on field header to sort data according to the field and do click to change sort ascending to descending",children:(0,c.jsxs)("tr",{className:"bg-secondary/[0.6]",children:[Object.keys(t[0]).map((function(e,t){return(0,c.jsx)("th",{className:"p-3 text-lg  border  ".concat(!0===v[e]?"show":"hidden"),children:(0,c.jsxs)("button",{className:"w-full flex justify-center items-center space-x-1",onDoubleClick:function(t){t.preventDefault(),w({order:1,field:e,visible:!0}),p({order:1,sort_by:e}),sessionStorage.setItem(n+"order","1"),sessionStorage.setItem(n+"sort_by",e)},onClick:function(t){t.preventDefault(),j.field===e&&(w((0,a.Z)((0,a.Z)({},j),{},{order:1===j.order?0:1})),!0===j.visible&&(p({order:1===j.order?-1:1,sort_by:e}),sessionStorage.setItem(n+"order",0===j.order?"1":"-1"),sessionStorage.setItem(n+"sort_by",e)))},children:[(0,c.jsx)("span",{className:"capitalize whitespace-nowrap",children:e.toString().split(/(?=[A-Z])/).join(" ")}),!0===j.visible&&j.field===e&&(0,c.jsxs)(c.Fragment,{children:[1===j.order&&(0,c.jsx)(o.qwl,{}),0===j.order&&(0,c.jsx)(o.dbR,{})]})]})},t)})),(0,c.jsx)("th",{className:"capitalize border p-3 text-lg ",children:"Action"})]})}),(0,c.jsx)("tbody",{children:t.map((function(e,t){return(0,c.jsxs)("tr",{className:"border even:bg-light2",children:[Object.keys(e).map((function(t){return(0,c.jsx)("td",{className:"border p-2 max-w-[50px]  truncate ".concat(!0===v[t]?"show":"hidden"),style:{fontSize:"17px",lineHeight:"28px"},children:"boolean"===typeof e[t]?!0===e[t]?"Yes":"No":e[t]},t)})),(0,c.jsxs)("td",{className:"flex p-2  items-center justify-center space-x-2",children:[(0,c.jsx)("button",{onClick:function(t){t.preventDefault(),u(e._id),sessionStorage.setItem(n+"action","edit"),sessionStorage.setItem("edit"+n+"Id",e._id)},children:(0,c.jsx)(s.oTc,{})}),(0,c.jsx)("button",{onClick:function(t){t.preventDefault(),f(e)},children:(0,c.jsx)(s.ZkW,{})})]})]},t)}))})]})})]})}}}]);
//# sourceMappingURL=214.45976930.chunk.js.map