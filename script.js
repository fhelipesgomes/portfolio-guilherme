document.getElementById('year').textContent = new Date().getFullYear();

const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      window.scrollTo({top: el.offsetTop - 70, behavior:'smooth'});
    }
  });
});

const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.project-card');
chips.forEach(chip=>{
  chip.addEventListener('click', ()=>{
    chips.forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    const f = chip.dataset.filter;
    cards.forEach(card=>{
      const tags = card.dataset.tags.split(',');
      const show = f === 'all' || tags.includes(f);
      card.style.display = show ? '' : 'none';
    });
  });
});

const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
},{threshold:.2});
cards.forEach(c=>obs.observe(c));

const form = document.getElementById('contactForm');
const msg = document.querySelector('.form-msg');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name')?.toString().trim();
    const email = data.get('email')?.toString().trim();
    const message = data.get('message')?.toString().trim();
    if(!name || !email || !message){
      msg.textContent = 'Preencha todos os campos.';
      msg.style.color = '#ffb4b4';
      return;
    }
    msg.textContent = 'Mensagem enviada! (mock)';
    msg.style.color = '#a7f3d0';
    form.reset();
  });
}
