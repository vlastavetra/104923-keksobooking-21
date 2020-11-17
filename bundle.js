(()=>{"use strict";window.util={disableElements:(e,t)=>{e.forEach((e=>{e.disabled=t,!0===t&&(e.style.cursor="default")}))},createErrorMessage:e=>{const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: red;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)},removePins:()=>{document.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((e=>{e.remove()}))},noop:()=>{}},(()=>{const e="GET",t="POST",o="https://21.javascript.pages.academy/keksobooking/data",r="https://21.javascript.pages.academy/keksobooking";let n=(e,t,o,r=window.util.noop)=>{let n=new XMLHttpRequest;return n.responseType="json",n.open(e,t),n.timeout=1e4,((e,t,o)=>{e.addEventListener("load",(()=>{200===e.status?t(e.response):o(`Статус ответа: ${e.status} ${e.statusText}`)})),e.addEventListener("error",(()=>{o("Произошла ошибка соединения")})),e.addEventListener("timeout",(()=>{o(`Запрос не успел выполниться за ${e.timeout} мс`)}))})(n,o,r),n};window.backend={loadData:(t,r)=>{n(e,o,t,r).send()},saveData:(e,o,i)=>{n(t,r,o,i).send(e)}}})(),window.debounce=e=>{let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}},(()=>{const e=1e4,t=document.querySelector(".map__filters"),o=t.querySelector("#housing-type"),r=t.querySelector("#housing-price"),n=t.querySelector("#housing-rooms"),i=t.querySelector("#housing-guests"),a=t.querySelector("#housing-features").querySelectorAll("input"),l=e=>e.offer.type===o.value||"any"===o.value,s=t=>{switch(r.value){case"low":return t.offer.price<e;case"middle":return t.offer.price>=e&&t.offer.price<=5e4;case"high":return t.offer.price>e;default:return t}},d=e=>e.offer.rooms===Number(n.value)||"any"===n.value,c=e=>e.offer.guests===Number(i.value)||"any"===i.value,u=e=>Array.from(a).filter((e=>e.checked)).every((t=>-1!==e.offer.features.indexOf(t.value))),p=e=>{t.addEventListener("change",window.debounce((()=>{let t=[];for(let o=0;o<e.length;o++){const r=e[o];if(l(r)&&s(r)&&d(r)&&c(r)&&u(r)&&t.push(r),5===t.length)break}window.util.removePins(),window.offer.renderMany(t),document.removeEventListener("change",p)})))};window.filter={filter:p}})(),(()=>{const e=document.querySelector("#pin").content.querySelector("button"),t=document.querySelector(".map"),o=t.querySelector(".map__pins"),r=t.querySelector(".map__filters-container"),n=()=>{o.querySelectorAll(".map__pin").forEach((e=>{e.classList.remove("map__pin--active")}))};window.pin={render:o=>{const i=e.cloneNode(!0),a=i.querySelector("img");return a.src=o.author.avatar,a.alt=o.offer.title,i.style.left=o.location.x-25+"px",i.style.top=o.location.y-87+"px",i.addEventListener("click",(e=>{const i=t.querySelector(".map__card");i&&i.remove(),t.insertBefore(window.offer.render(o),r),n(),e.currentTarget.classList.add("map__pin--active")})),i},removeClassActive:n}})(),(()=>{const e=document.querySelector(".map__pins"),t=document.createDocumentFragment(),o=document.querySelector("#card").content.querySelector(".popup"),r=document.querySelector(".map__filters");let n;const i=e=>{"Escape"!==e.key&&0!==e.button&&e.change||(n.remove(),window.pin.removeClassActive(),document.removeEventListener("keydown",i))};window.offer={render:e=>{const t=o.cloneNode(!0),a={TITLE:t.querySelector(".popup__title"),ADDRESS:t.querySelector(".popup__text--address"),PRICE:t.querySelector(".popup__text--price"),TYPE:t.querySelector(".popup__type"),CAPACITY:t.querySelector(".popup__text--capacity"),TIME:t.querySelector(".popup__text--time"),FEATURES:t.querySelector(".popup__features"),FEATURE_LIST:t.querySelectorAll(".popup__feature"),DESCRIPTION:t.querySelector(".popup__description"),AVATAR:t.querySelector(".popup__avatar"),PHOTOS:t.querySelector(".popup__photos")},l=a.PHOTOS.querySelector(".popup__photo");a.ADDRESS.textContent=e.offer.address,a.PRICE.textContent=e.offer.price.toLocaleString()+" ₽/ночь",a.TITLE.textContent=e.offer.title,a.CAPACITY.textContent=`${e.offer.rooms} комнаты для ${e.offer.guests} гостей`,a.TIME.textContent=`Заезд после ${e.offer.checkin}, выезд до ${e.offer.checkout}`,a.AVATAR.src=e.author.avatar,a.TYPE.textContent={flat:"Квартира",bungalow:"Бунгало",house:"Дом",palace:"Дворец"}[e.offer.type],e.offer.description?a.DESCRIPTION.textContent=e.offer.description:a.DESCRIPTION.remove(),e.offer.photos.length>0?(e.offer.photos.forEach((e=>{const t=l.cloneNode(!0);t.src=e,a.PHOTOS.appendChild(t)})),l.remove()):a.PHOTOS.remove(),e.offer.features.length>0?a.FEATURE_LIST.forEach((t=>{e.offer.features.some((e=>t.className.endsWith("--"+e)))||t.remove()})):a.FEATURES.remove();const s=t.querySelector(".popup__close");return n=t,document.addEventListener("keydown",i),s.addEventListener("click",i),s.addEventListener("keydown",i),r.addEventListener("change",i),t},renderMany:o=>{const r=Math.min(o.length,5);for(let e=0;e<r;e++)t.appendChild(window.pin.render(o[e]));e.appendChild(t)}}})(),(()=>{const e=document.querySelector(".map"),t=document.querySelector(".map__pin--main"),o=document.querySelector(".ad-form").querySelector("[name='address']"),r=31,n=e.clientWidth,i={X:601,Y:462};let a=parseInt(t.style.left,10)+r,l=parseInt(t.style.left,10)-164;const s=(e=i.X,t=i.Y)=>{o.setAttribute("value",`${e}, ${t}`)};s(a,l),t.addEventListener("mousedown",(e=>{e.preventDefault();let o={x:e.clientX,y:e.clientY},i=e=>{let i=o.x-e.clientX,d=o.y-e.clientY,c=t.offsetLeft-i,u=t.offsetTop-d;o={x:e.clientX,y:e.clientY},c>=-31&&c+r<=n&&(t.style.left=c+"px"),u+87>=130&&u+87<=630&&(t.style.top=u+"px"),a=parseInt(t.style.left,10)+r,l=parseInt(t.style.top,10)+87,s(a,l)},d=e=>{e.preventDefault(),document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",d)};document.addEventListener("mousemove",i),document.addEventListener("mouseup",d)})),window.movepin={resetMapPinMain:()=>{t.style.left="570px",t.style.top="375px",s(i.X,406)},setAddress:s}})(),(()=>{const e=document.querySelector("main"),t=document.querySelector(".ad-form"),o=document.querySelector("#success").content.querySelector(".success"),r=document.querySelector("#error").content.querySelector(".error");let n;const i=e=>{"Escape"!==e.key&&0!==e.button||(n.remove(),document.removeEventListener("keydown",i))},a=t=>{const o=t.cloneNode(!0);n=o,e.appendChild(o),document.addEventListener("keydown",i),document.addEventListener("click",i),t===r&&document.querySelector(".error__button").addEventListener("click",i)},l=()=>{a(r)},s=()=>{a(o),t.reset(),window.main.deactivatePage()};t.addEventListener("submit",(e=>{e.preventDefault();const o=new FormData(t);window.backend.saveData(o,s,l)}))})(),(()=>{const e={bungalow:0,flat:1e3,house:5e3,palace:1e4},t={1:["1"],2:["1","2"],3:["1","2","3"],100:["0"]},o=document.querySelector(".ad-form");o.price.addEventListener("input",(()=>{o.price.min=e[o.type.value],o.price.placeholder=e[o.type.value],o.price.value<e[o.type.value]?o.price.setCustomValidity("Недопустимая цена"):o.price.setCustomValidity(""),o.price.reportValidity()})),o.type.addEventListener("input",(t=>{t.target===o.type&&(o.price.placeholder=e[o.type.value])})),o.timein.addEventListener("input",(e=>{e.target===o.timein?o.timeout.value=o.timein.value:o.timein.value=o.timeout.value})),o.timeout.addEventListener("input",(e=>{e.target===o.timeout?o.timein.value=o.timeout.value:o.timeout.value=o.timein.value})),o.capacity.addEventListener("input",(()=>{t[o.rooms.value].includes(o.capacity.value)?o.capacity.setCustomValidity(""):o.capacity.setCustomValidity("Недопустимое количество гостей"),o.capacity.reportValidity()})),window.formvalidation={reset:()=>{o.price.placeholder=e.flat}}})(),(()=>{const e=["gif","jpg","jpeg","png","svg"],t=document.querySelector(".ad-form"),o={AVATAR:t.querySelector(".ad-form__field input[type=file]"),PHOTO:t.querySelector(".ad-form__upload input[type=file]")},r=t.querySelector(".ad-form-header__preview img"),n=t.querySelector(".ad-form__photo"),i=document.createElement("img");i.width=70,i.height=70;const a=[r,n.appendChild(i)];[o.AVATAR,o.PHOTO].forEach(((t,o)=>{t.addEventListener("change",(()=>{let r=t.files[0],n=r.name.toLowerCase();if(e.some((e=>n.endsWith(e)))){const e=new FileReader;e.addEventListener("load",(()=>{a[o].src=e.result})),e.readAsDataURL(r)}}))}))})(),(()=>{const e="map--faded",t="ad-form--disabled",o=document.querySelector(".map"),r=document.querySelector(".map__pin--main"),n=document.querySelector(".map__filters"),i=Array.from(n.children),a=document.querySelector(".map__features"),l=Array.from(a.children),s=document.querySelector(".ad-form"),d=Array.from(s.querySelectorAll(".ad-form > fieldset")),c=s.querySelector(".ad-form__reset"),u=s.querySelector(".ad-form-header__preview img"),p=s.querySelector(".ad-form__photo img"),m="img/muffin-grey.svg",f=e=>{window.util.disableElements(i,!1),window.util.disableElements(l,!1),window.offer.renderMany(e),window.filter.filter(e)},y=e=>{window.util.createErrorMessage(e),window.util.disableElements(i,!0),window.util.disableElements(l,!0)},v=r=>{(o.classList.contains(e)&&0===r.button||"Enter"===r.key)&&(window.backend.loadData(f,y),o.classList.remove(e),s.classList.remove(t),window.util.disableElements(d,!1),window.movepin.setAddress()),o.querySelectorAll(".map__pin").length>=2&&(window.util.disableElements(i,!1),window.util.disableElements(l,!1))},w=()=>{s.reset(),n.reset(),o.classList.add(e),s.classList.add(t),window.formvalidation.reset(),window.util.removePins(),window.util.disableElements(i,!0),window.util.disableElements(l,!0),window.util.disableElements(d,!0),window.movepin.resetMapPinMain(),u.src=m,p.src=m};c.addEventListener("click",(()=>{w()})),window.util.disableElements(i,!0),window.util.disableElements(d,!0),window.util.disableElements(l,!0),r.addEventListener("mousedown",v),r.addEventListener("keydown",v),window.main={deactivatePage:w}})()})();
