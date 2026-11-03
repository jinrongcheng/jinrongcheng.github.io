const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')})}
document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.12,rootMargin:'0px 0px -35px 0px'});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-zoom').forEach(el=>observer.observe(el));
// Scroll progress bar + header state
const progress=document.createElement('div');progress.className='scroll-progress';document.body.prepend(progress);
const header=document.querySelector('.site-header');
const heroPhoto=document.querySelector('.campaign-hero-photo');
let ticking=false;
function onScroll(){
  const y=window.scrollY, max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(max>0?(y/max*100):0)+'%';
  if(header) header.classList.toggle('scrolled', y>10);
  if(heroPhoto && !reduced) heroPhoto.style.transform=`translateY(${y*0.22}px) scale(1.04)`;
  ticking=false;
}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(onScroll);ticking=true}},{passive:true});onScroll();
// Count-up stats when visible
const counters=document.querySelectorAll('[data-count]');
if(counters.length){
  const co=new IntersectionObserver(entries=>{entries.forEach(entry=>{
    if(!entry.isIntersecting) return; const el=entry.target; co.unobserve(el);
    const target=Number(el.dataset.count), suffix=el.dataset.suffix||'';
    if(reduced){el.textContent=target.toLocaleString()+suffix;return}
    const start=performance.now(), dur=1400;
    (function step(now){const p=Math.min((now-start)/dur,1), eased=1-Math.pow(1-p,3);
      el.textContent=Math.round(target*eased).toLocaleString()+suffix;
      if(p<1) requestAnimationFrame(step)})(start);
  })},{threshold:.5});
  counters.forEach(el=>co.observe(el));
}

// Cookie consent: analytics off by default, on only after Accept
(function(){
  var key='cookie-consent';
  function apply(v){try{if(window.gtag)gtag('consent','update',{'analytics_storage':v});}catch(e){}}
  var stored=null; try{stored=localStorage.getItem(key);}catch(e){}
  if(stored==='granted'){apply('granted');}
  var reset=document.getElementById('reset-cookie-choice');
  if(reset){reset.addEventListener('click',function(){try{localStorage.removeItem(key);}catch(e){}location.reload();});}
  var statusEl=document.getElementById('cookie-choice-status');
  if(statusEl){statusEl.textContent=stored?(stored==='granted'?'Accepted':'Declined'):'Not set yet';}
  var acc=document.getElementById('accept-cookie-choice');
  if(acc){acc.addEventListener('click',function(){try{localStorage.setItem(key,'granted');}catch(e){}apply('granted');if(statusEl)statusEl.textContent='Accepted';var bb=document.querySelector('.cookie-banner');if(bb)bb.remove();});}
  var dec=document.getElementById('decline-cookie-choice');
  if(dec){dec.addEventListener('click',function(){try{localStorage.setItem(key,'denied');}catch(e){}apply('denied');if(statusEl)statusEl.textContent='Declined';var bb=document.querySelector('.cookie-banner');if(bb)bb.remove();});}
  if(stored){return;}
  var b=document.createElement('div'); b.className='cookie-banner'; b.setAttribute('role','dialog'); b.setAttribute('aria-label','Cookie consent');
  b.innerHTML='<p>This site uses Google Analytics cookies to see how many people visit and which pages they read. Accept to allow them, or decline — the site still works either way. <a href="cookies.html">Cookie policy</a></p><button class="cookie-accept" type="button">Accept</button><button class="cookie-decline" type="button">Decline</button>';
  document.body.appendChild(b);
  b.querySelector('.cookie-accept').addEventListener('click',function(){try{localStorage.setItem(key,'granted');}catch(e){}apply('granted');b.remove();});
  b.querySelector('.cookie-decline').addEventListener('click',function(){try{localStorage.setItem(key,'denied');}catch(e){}apply('denied');b.remove();});
})();
