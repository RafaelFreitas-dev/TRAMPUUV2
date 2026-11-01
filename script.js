(function () {
  'use strict';

  var PHONE = '5511965562394';
  var DEFAULT_MSG = 'Olá! Conheci a TrampuuCerto pelo site e gostaria de solicitar um orçamento para um serviço elétrico residencial. Poderia me ajudar?';
  var SERVICES = [
    'Instalações elétricas', 'Manutenção elétrica', 'Instalação de luminárias', 'Instalação de chuveiros',
    'Troca de disjuntores', 'Ventiladores de teto', 'Curto-circuito', 'Reformas elétricas'
  ];

  // Mensagem conforme a origem do botão (atributo data-wa)
  function buildMessage(origin) {
    if (SERVICES.indexOf(origin) !== -1) {
      return 'Olá! Conheci a TrampuuCerto pelo site e gostaria de solicitar atendimento para o serviço: ' +
        origin + '. Poderia me ajudar com um orçamento?';
    }
    if (origin === 'cta') {
      return 'Olá! Vi o site da TrampuuCerto e preciso falar com um eletricista agora. Podem me atender?';
    }
    return DEFAULT_MSG;
  }

  document.querySelectorAll('[data-wa]').forEach(function (el) {
    el.href = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(buildMessage(el.getAttribute('data-wa')));
    el.target = '_blank';
    el.rel = 'noopener';
  });

  // Menu mobile
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  function closeMenu() {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Animação suave ao rolar
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.card, .steps li, .check li, .shot, details').forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  // Ano no rodapé
  var y = document.getElementById('ano');
  if (y) y.textContent = new Date().getFullYear();
})();
