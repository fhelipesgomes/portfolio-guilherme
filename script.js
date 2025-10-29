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

    // Tenta pelos 'name' do FormData; se não existir, usa fallback por 'id'
    const fd = new FormData(form);
    const name = (fd.get('name') ?? document.getElementById('name')?.value ?? '').toString().trim();
    const email = (fd.get('email') ?? document.getElementById('email')?.value ?? '').toString().trim();
    const message = (fd.get('message') ?? document.getElementById('message')?.value ?? '').toString().trim();

    if(msg){ msg.textContent = ''; }

    // Usa placeholders se algum campo vier vazio (não bloqueia)
    const n = name || '(sem nome)';
    const em = email || '(sem e-mail)';
    const ms = message || '(sem mensagem)';

    const subject = encodeURIComponent('Contato via Portfólio — ' + n);
    const body = encodeURIComponent(`Nome: ${n}\nE-mail: ${em}\n\nMensagem:\n${ms}`);

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      const text = encodeURIComponent(`Olá! Me chamo ${n}. Meu e-mail é ${em}.\n\n${ms}`);
      window.open(`https://wa.me/5585982351950?text=${text}`, '_blank');
    } else {
      window.location.href = `mailto:fhelipesgomes@gmail.com?subject=${subject}&body=${body}`;
    }

    // Opcional: feedback visual suave sem alterar layout
    if(msg){
      msg.textContent = 'Abrindo seu aplicativo de mensagem...';
      msg.style.color = '#a7f3d0';
    }
  });
}
