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
