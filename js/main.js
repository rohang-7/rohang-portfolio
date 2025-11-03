// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Tilt effect on cards
document.querySelectorAll('.tilt').forEach(card=>{
  let rect;
  const onMove = (e)=>{
    rect = rect || card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height/2) / rect.height) * -10;
    const ry = ((x - rect.width/2) / rect.width) * 10;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const reset = ()=> card.style.transform = 'perspective(800px)';
  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', reset);
});

// Active nav
const sections = [...document.querySelectorAll('section, main.hero')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const spy = new IntersectionObserver((ents)=>{
  ents.forEach(ent=>{
    if(ent.isIntersecting){
      const id = ent.target.getAttribute('id') || 'home';
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    }
  });
},{threshold:.6});
sections.forEach(s=>spy.observe(s));

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const root = document.documentElement;
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  function closeMenu() {
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close on link click (nice for one-page sites)
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // Close on ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

