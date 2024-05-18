import{s as g,r as c,j as e,J as f,u as y,L as r}from"./index-Bm7inwCK.js";import{d as j}from"./donateGood-C6WDbpsJ.js";const i=["Select Category","Apparel","Educational","Tools","Home","Appliances","Seasonal","Groceries","Outdoor","Culturel","Personal","Pet care","Media","Children","Medical","Other"],w=["Select Condition","Brand new","Like new","Gently used","Used","Fair","Needs repair","Not working"],D=()=>{const x=g(),[m,h]=c.useState(!1),[a,l]=c.useState({name:"",description:"",boughtdate:"",expirydate:"",condition:"",quantity:"",city:"",image:"",video:"",brand:"",weight:"",dimensions:{lengthe:"",breadth:""},resaonOfDonation:"",category:i[0]});console.log(a);const n=s=>{const{name:t,value:o}=s.target;l(d=>({...d,[t]:o}))},u=async()=>{const s=await y(),t=s.user.document;console.log(s,t),t?(h(!0),r.success("You are Verified, You can Donate")):r.error("Upload Document, Before Donating, For Verification")};c.useEffect(()=>{u()},[]);const p=async s=>{if(s.preventDefault(),console.log("SDF"),console.log(m),m){const t=new FormData;console.log(a),Object.entries(a).forEach(([d,b])=>{t.append(d,b)});const o=await j(t);o.success?(r.success("Thanks for donating! Your listing has been submitted"),setTimeout(()=>{l({name:"",description:"",boughtdate:"",expirydate:"",condition:"",quantity:"",city:"",image:"",video:"",brand:"",weight:"",dimensions:"",resaonOfDonation:"",category:i[0]})},2e3),x("/")):(r.error(`${o.message}`),setTimeout(()=>{l({name:"",description:"",boughtdate:"",expirydate:"",condition:"",quantity:"",city:"",image:"",video:"",brand:"",weight:"",dimensions:"",resaonOfDonation:"",category:i[0]})},2e3))}};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"min-h-screen relative flex flex-col w-full justify-center overflow-y-hidden bg-gray-200 text-black",children:e.jsxs("div",{className:"mt-32 w-full max-w-4xl mx-auto overflow-hidden",children:[e.jsx("h2",{className:"font-bold text-center h-[75px] flex justify-center items-center  text-5xl bg-gray-200 fixed w-full top-[60px] shadow-lg shadow-black right-[2px] z-10",children:"Make an Impact by Donating Goods"}),e.jsxs("form",{onSubmit:p,className:"w-full bg-white rounded-lg cursor-pointer  mt-6 shadow-lg p-8 space-y-4",children:[e.jsxs("div",{className:"flex flex-wrap -mx-2",children:[e.jsxs("div",{className:"w-full md:w-1/2 px-2 mb-4",children:[e.jsxs("label",{htmlFor:"name",className:"block mb-1 flex",children:["Name of Good ",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx("input",{type:"text",id:"name",name:"name",value:a.name,onChange:n,className:"w-full border border-gray-300 rounded px-3 py-2"})]}),e.jsxs("div",{className:"w-full md:w-1/2 px-2 mb-4",children:[e.jsx("label",{htmlFor:"brand",className:"block mb-1 flex",children:"Brand"}),e.jsx("input",{type:"text",id:"brand",name:"brand",value:a.brand,onChange:n,className:"w-full border border-gray-300 rounded px-3 py-2"})]})]}),e.jsxs("div",{className:"flex flex-wrap -mx-2",children:[e.jsxs("div",{className:"w-full md:w-1/2 px-2 mb-4",children:[e.jsx("label",{htmlFor:"weight",className:"block mb-1 flex",children:"Weight (in kg)"}),e.jsx("input",{type:"text",id:"weight",name:"weight",value:a.weight,onChange:n,className:"w-full border border-gray-300 rounded px-3 py-2"})]}),e.jsxs("div",{className:"w-full md:w-1/2 px-2 mb-4",children:[e.jsx("label",{htmlFor:"dimensions",className:"block mb-1 flex",children:"Dimensions (in feet)"}),e.jsx("input",{type:"text",id:"dimensions",name:"dimensions",placeholder:"length",value:a.dimensions.lengthe,onChange:s=>l({...a,dimensions:{...a.dimensions,lengthe:s.target.value}}),className:"w-1/2 border border-gray-300 rounded px-3 py-2"}),e.jsx("input",{type:"text",id:"dimensions",name:"dimensions",placeholder:"breadth",value:a.dimensions.breadth,onChange:s=>l({...a,dimensions:{...a.dimensions,breadth:s.target.value}}),className:"w-1/2 border border-gray-300 rounded px-3 py-2"})]})]}),e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"reasonOfDonation",className:"block mb-1 flex",children:["Reason for Donation ",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx("textarea",{id:"reasonOfDonation",name:"resaonOfDonation",value:a.resaonOfDonation,onChange:n,className:"w-full border border-gray-300 rounded px-3 py-2"})]}),e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"description",className:"block mb-1 flex",children:["Description ",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx("textarea",{id:"description",name:"description",value:a.description,onChange:n,className:"w-full border border-gray-300 rounded px-3 py-2"})]}),e.jsxs("div",{className:"flex flex-wrap -mx-2",children:[e.jsxs("div",{className:"w-full md:w-1/2 px-2 mb-4",children:[e.jsxs("label",{htmlFor:"boughtdate",className:"block mb-1 flex",children:["Bought Date ",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx("input",{type:"date",id:"boughtdate",name:"boughtdate",value:a.boughtdate,onChange:n,className:"w-full border border-gray-300 rounded px-3 py-2"})]}),e.jsxs("div",{className:"w-full md:w-1/2 px-2 mb-4",children:[e.jsx("label",{htmlFor:"expirydate",className:"block mb-1",children:"Expiry Date (if applicable)"}),e.jsx("input",{type:"date",id:"expirydate",name:"expirydate",value:a.expirydate,onChange:n,className:"w-full border border-gray-300 rounded px-3 py-2"})]})]}),e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"category",className:"block mb-1 flex",children:["Category ",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx("select",{id:"category",name:"category",value:a.category,onChange:n,className:"w-full border border-gray-300 rounded px-3 py-2",children:i.map(s=>e.jsx("option",{value:s,children:s},s))})]}),e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"image",className:"block mb-1 flex",children:["Image ",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx("input",{type:"file",id:"image",name:"image",onChange:s=>{l({...a,image:s.target.files[0]})},className:"w-full border border-gray-300 rounded px-3 py-2",accept:"image/*"})]}),e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"video",className:"block mb-1 flex",children:["Video ",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx("input",{type:"file",id:"video",name:"video",onChange:s=>{l({...a,video:s.target.files[0]})},className:"w-full border border-gray-300 rounded px-3 py-2",accept:"image/*"})]}),e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"city",className:"block mb-1 flex",children:["City ",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx("input",{type:"text",id:"city",name:"city",value:a.city,onChange:n,className:"w-full border border-gray-300 rounded px-3 py-2"})]}),e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"condition",className:"block mb-1 flex",children:["Condition ",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx("select",{id:"condition",name:"condition",value:a.condition,onChange:n,className:"w-full border border-gray-300 rounded px-3 py-2",children:w.map(s=>e.jsx("option",{value:s,children:s},s))})]}),e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"quantity",className:"block mb-1 flex",children:["Quantity ",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx("input",{type:"number",id:"quantity",name:"quantity",value:a.quantity,onChange:n,className:"w-full border border-gray-300 rounded px-3 py-2"})]}),e.jsx("button",{type:"submit",className:"w-full bg-black text-white rounded py-2 hover:bg-gray-800",children:"Submit"})]})]})}),e.jsx(f,{})]})};export{D as default};
