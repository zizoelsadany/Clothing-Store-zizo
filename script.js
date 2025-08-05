const images = document.querySelectorAll(".slider img");
let current = 0;

function showImage(index) {
  images.forEach(img => img.classList.remove("active"));
  images[index].classList.add("active");
}

// ✅ كيبورد: Left/Right arrows
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
  } else if (e.key === "ArrowRight") {
    current = (current + 1) % images.length;
    showImage(current);
  }
});

// ✅ تاتش سوايب
let startX = 0;

document.querySelector(".slider").addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

document.querySelector(".slider").addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      // Swipe left
      current = (current + 1) % images.length;
    } else {
      // Swipe right
      current = (current - 1 + images.length) % images.length;
    }
    showImage(current);
  }
});


setInterval(() => {
  current = (current + 1) % images.length;
  showImage(current);
}, 10000);
let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
const cartCount = document.getElementById('cart-count');
if (cartCount) cartCount.textContent = cartItems.length;

document.querySelectorAll('.add-cart').forEach(btn => {
  btn.addEventListener('click', function() {
    const product = this.closest('.product-item');
    const name = product.querySelector('h3').innerText;
    const img = product.querySelector('img') ? product.querySelector('img').getAttribute('src') : '';
    const desc = product.querySelector('p').innerText;
    const price = product.querySelector('.price') ? parseFloat(product.querySelector('.price').innerText) : 0;
    cartItems.push({ name, img, desc, price });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    if (cartCount) cartCount.textContent = cartItems.length;
    showPopup(`${name} تم إضافته إلى السلة!`);
  });
});

function showPopup(msg) {
  let popup = document.createElement('div');
  popup.textContent = msg;
  popup.style.position = 'fixed';
  popup.style.top = '30px';
  popup.style.left = '50%';
  popup.style.transform = 'translateX(-50%)';
  popup.style.background = '#f8b500';
  popup.style.color = '#fff';
  popup.style.padding = '16px 32px';
  popup.style.borderRadius = '12px';
  popup.style.fontWeight = 'bold';
  popup.style.fontSize = '1.1rem';
  popup.style.zIndex = '9999';
  popup.style.boxShadow = '0 2px 12px #f8b50055';
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 1500);
}

document.querySelectorAll('.price').forEach(span => {
  let priceText = span.innerText.trim();
  if (priceText.endsWith('ج.م')) {
    let egp = parseFloat(priceText.replace('ج.م', '').trim());
    let usd = (egp / 50).toFixed(2); 
    span.innerText = `${usd} $`;
  }
});
 const toggle = document.getElementById('menu-toggle');
  const links = document.getElementById('nav-links');

  toggle.addEventListener('click', () => {
    links.classList.toggle('active');
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('active');
    });
  });
  // script.js

const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const NUM_PARTICLES = 80;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    this.size = Math.random() * 3 + 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around the screen
    if (this.x > canvas.width) this.x = 0;
    else if (this.x < 0) this.x = canvas.width;

    if (this.y > canvas.height) this.y = 0;
    else if (this.y < 0) this.y = canvas.height;
  }

  draw() {
ctx.fillStyle = '#000000';

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
ctx.strokeStyle = `rgba(0, 0, 0, ${0.8 * (1 - distance / 150)})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  connectParticles();

  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
  
init();
animate();