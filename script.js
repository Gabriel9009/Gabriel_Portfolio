// CURSOR
const cursor = document.getElementById('cursor');
const cursorDot = cursor.querySelector('.cursor-dot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px'; cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px'; cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateCursor);
}

animateCursor();
document.querySelectorAll('a, button, .skill-pill, .project-card, .service-card, .testimonial-card, .skill-category').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

// NAV SCROLL
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// MOBILE NAV
const mobileMenu = document.getElementById('mobileMenu');
const hamburger = document.getElementById('hamburger');
function toggleMobile() {
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
}

function closeMobile() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
}

  // SCROLL REVEAL
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => observer.observe(el));

  // FORM SUBMIT
const form = document.getElementById("contactForm");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const button = form.querySelector(".form-submit");
  const original = button.innerHTML;

  // Loading state
  button.innerHTML = "<span>Sending...</span><span>⟳</span>";
  button.disabled = true;
  button.style.opacity = "0.8";

  const formData = new FormData(form);

  try {

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if(result.success){

      button.innerHTML = "<span>Message Sent! ✓</span>";
      button.style.background =
        "linear-gradient(135deg, #00ff88, #00d4ff)";

      // Reset form
      form.reset();

    } else {

      button.innerHTML = "<span>Failed to Send</span>";

    }

  } catch(error) {

    button.innerHTML = "<span>Error Occurred</span>";

  }

  // Reset button after 3 seconds
  setTimeout(() => {
    button.innerHTML = original;
    button.disabled = false;
    button.style.background = "";
    button.style.opacity = "";
  }, 3000);

});


// FLOATING PARTICLES
const heroSection = document.getElementById('hero');
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = Math.random() * 10 + 10;
    p.style.cssText = `
      position:absolute;width:${size}px;height:${size}px;
      background:${Math.random()>0.5?'rgba(0,212,255,0.4)':'rgba(124,58,255,0.4)'};
      border-radius:50%;left:${x}%;bottom:-10px;pointer-events:none;z-index:1;
      animation:floatUp ${duration}s ${delay}s linear infinite;
    `;
    heroSection.appendChild(p);
}

const style = document.createElement('style');
  style.textContent = `
    @keyframes floatUp {
      0% { transform: translateY(0) scale(1); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 0.3; }
      100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
    }
  `;
document.head.appendChild(style);