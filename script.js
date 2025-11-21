// Ano no rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// Menu mobile
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

// Scroll suave em âncoras
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Filtro de projetos
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.project-card');

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const f = chip.dataset.filter;
    cards.forEach(card => {
      const tags = card.dataset.tags.split(',').map(t => t.trim());
      card.style.display = (f === 'all' || tags.includes(f)) ? '' : 'none';
    });
  });
});

// Reveal ao rolar (seções + cards)
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: .15 });

document.querySelectorAll('.reveal, .project-card').forEach(el => obs.observe(el));

// Formulário de contato (WhatsApp no mobile, e-mail no desktop)
const form = document.getElementById('contactForm');
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const messageEl = document.getElementById('message');
const msg = document.querySelector('.form-msg');

if (form && nameEl && emailEl && messageEl) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameEl.value.trim() || '(sem nome)';
    const email = emailEl.value.trim() || '(sem email)';
    const message = messageEl.value.trim() || '(sem mensagem)';

    const subject = encodeURIComponent(`Contato — ${name}`);
    const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\nMensagem:\n${message}`);
    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

    if (isMobile) {
      const text = encodeURIComponent(`Olá! Me chamo ${name}. Meu e-mail é ${email}.\n\n${message}`);
      window.open(`https://wa.me/5585982351950?text=${text}`, '_blank');
    } else {
      window.location.href = `mailto:fhelipesgomes@gmail.com?subject=${subject}&body=${body}`;
    }

    if (msg) {
      msg.textContent = 'Abrindo sua aplicação de mensagem...';
    }
  });
}

// Scroll progress + header hide/show
const progress = document.getElementById('scroll-progress');
const header = document.querySelector('.site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const h = document.documentElement;

  // Progress bar
  if (progress) {
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progress.style.width = scrolled + '%';
  }

  // Header hide/show
  if (!header) return;

  const current = window.pageYOffset || h.scrollTop;

  if (current <= 0) {
    header.classList.remove('hide');
    lastScroll = 0;
    return;
  }

  if (current > lastScroll && current > 80) {
    // rolando para baixo
    header.classList.add('hide');
  } else {
    // rolando para cima
    header.classList.remove('hide');
  }

  lastScroll = current;
});

// Partículas de fundo
const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  for (let i = 0; i < 70; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      s: Math.random() * 0.8 + 0.2
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,205,0,.55)';
      ctx.fill();
      p.y += p.s;
      if (p.y > canvas.height) {
        p.y = -5;
        p.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}
