import{a as L,S as b,i as l}from"./assets/vendor-u8rapaCG.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const S="https://pixabay.com/api/",w="45713433-433c1b648e48abad27090f3cc";async function $(e,r=1,a=15){try{const s=new URLSearchParams({key:w,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:a});return(await L.get(`${S}?${s}`)).data}catch(s){throw console.error("Помилка під час отримання даних:",s),s}}function m(e){e.insertAdjacentHTML("afterend",'<span class="loader"></span>')}function q(){const e=document.querySelector(".loader");e&&e.remove()}function v(e){return e.hits.map(({webformatURL:r,largeImageURL:a,tags:s,likes:t,views:o,comments:i,downloads:h})=>`
            <li class="gallery-item hvr-grow">
              <a class="gallery-link" href="${a}">
                <img
                  class="gallery-image"
                  src="${r}"
                  alt="${s}"
                  loading="lazy"
              /></a>
              <ul class="img-content-wrapper">
                <li class="img-content-descr">Likes<span>${t}</span></li>
                <li class="img-content-descr">Views<span>${o}</span></li>
                <li class="img-content-descr">Comments<span>${i}</span></li>
                <li class="img-content-descr">Downloads<span>${h}</span></li>
              </ul>
            </li>
      `).join("")}const p=document.querySelector(".search-form"),y=document.querySelector(".gallery"),n=document.querySelector(".load-more-button");let M=new b(".gallery a",{captionsData:"alt",captionDelay:250}),d="",c=1,f=0,u=!1;n.style.display="none";p.addEventListener("submit",P);n.addEventListener("click",D);function P(e){e.preventDefault();const r=new FormData(e.target),{search:a}=Object.fromEntries(r.entries());if(d=a.trim(),!d){l.error({title:"Error",message:"The search query is empty.",position:"topRight"});return}c=1,y.innerHTML="",n.style.display="none",m(p),g()}async function g(){try{const e=await $(d,c);if(f=e.totalHits,e.hits.length===0){l.info({position:"topRight",title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"});return}const r=v(e);y.insertAdjacentHTML("beforeend",r),M.refresh(),c*15>=f?(l.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),n.style.display="none"):n.style.display="block"}catch(e){console.error("Помилка:",e),l.error({title:"Error",message:`Error: ${e.message}`,position:"topRight"})}finally{q(),u&&(E(),u=!1)}}function D(){c+=1,n.style.display="none",m(n),u=!0,g()}function E(){const e=document.querySelector(".gallery-item");if(e){const r=e.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
