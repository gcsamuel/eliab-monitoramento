// Script simples para melhorias UX
document.addEventListener('DOMContentLoaded', function(){
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener('click', function(e){
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth'});
    });
  });

  // Animate cards on scroll (simple)
  var cards = document.querySelectorAll('.animate-card');
  function revealCards(){
    var windowH = window.innerHeight;
    cards.forEach(function(c){
      var rect = c.getBoundingClientRect();
      if(rect.top < windowH - 60){
        c.style.opacity = 1;
        c.style.transform = 'none';
      }
    });
  }
  revealCards();
  window.addEventListener('scroll', revealCards);

  // Mobile menu toggle
  function setupMobile(btnId, navId){
    var btn = document.getElementById(btnId);
    var nav = document.getElementById(navId);
    if(btn && nav){
      btn.addEventListener('click', function(){
        nav.classList.toggle('open');
      });
    }
  }
  setupMobile('mobileBtn','mainNav');
  setupMobile('mobileBtn2','mainNav2');
  setupMobile('mobileBtn3','mainNav3');
  setupMobile('mobileBtn4','mainNav4');

  // Form submit -> POST /api/send
  var form = document.getElementById('quoteForm');
  if (form) {
    var resp = document.getElementById('response');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      resp.textContent = 'Enviando...';
      var data = new FormData(form);
      var body = JSON.stringify(Object.fromEntries(data.entries()));
      fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      }).then(function(r){
        return r.json();
      }).then(function(json){
        if (json.ok) {
          resp.textContent = 'Mensagem enviada. Obrigado.';
          form.reset();
        } else {
          resp.textContent = 'Erro ao enviar: ' + (json.error || 'tente novamente');
        }
      }).catch(function(){
        resp.textContent = 'Erro de conexão.';
      });
    });
  }
});
