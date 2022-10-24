const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");let n;t.addEventListener("click",(function(){n||(n=setInterval((()=>{document.body.style.background=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3))})),e.addEventListener("click",(function(){clearInterval(n),n=null}));
//# sourceMappingURL=01-color-switcher.de83a65f.js.map
