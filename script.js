const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')})}
document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.12,rootMargin:'0px 0px -35px 0px'});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
