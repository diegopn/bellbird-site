const root=document.documentElement,nav=document.querySelector("#main-nav"),menu=document.querySelector("[data-menu-toggle]"),theme=document.querySelector("[data-theme-toggle]"),themeColor=document.querySelector('meta[name="theme-color"]');
const locale=root.lang.toLowerCase().startsWith("pt")?"pt":root.lang.toLowerCase().startsWith("es")?"es":"en";
const labels={pt:{dark:"Ativar tema escuro",light:"Ativar tema claro",open:"Abrir menu",close:"Fechar menu"},en:{dark:"Enable dark theme",light:"Enable light theme",open:"Open menu",close:"Close menu"},es:{dark:"Activar tema oscuro",light:"Activar tema claro",open:"Abrir menú",close:"Cerrar menú"}}[locale];
function setTheme(value,save=true){const dark=value==="dark";root.dataset.theme=dark?"dark":"light";theme.setAttribute("aria-pressed",String(dark));theme.setAttribute("aria-label",dark?labels.light:labels.dark);theme.title=dark?labels.light:labels.dark;themeColor.content=dark?"#0e1724":"#f7faff";if(save){try{localStorage.setItem("bellbird-theme",root.dataset.theme)}catch{}}}
function closeMenu(){nav.classList.remove("is-open");menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label",labels.open)}
menu.addEventListener("click",()=>{const open=nav.classList.toggle("is-open");menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?labels.close:labels.open)});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",closeMenu));
theme.addEventListener("click",()=>setTheme(root.dataset.theme==="dark"?"light":"dark"));
let saved;try{saved=localStorage.getItem("bellbird-theme")}catch{}
setTheme(saved||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),false);
