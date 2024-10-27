// script.js

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 120;
let isStorm = false;
let stormDirectionX = 0;
let stormDirectionY = 0;

// Class Particle untuk partikel salju
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1;
    this.gravity = 0.02;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;

    // Efek badai: arahkan partikel ke arah kursor
    if (isStorm) {
      this.x += stormDirectionX * 0.05;
      this.y += stormDirectionY * 0.05;
    }

    // Ubah posisi kembali ke atas jika sudah mencapai bawah layar
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
  }

  draw() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((particle, index) => {
    particle.update();
    particle.draw();
    if (particle.size <= 0.2) {
      particlesArray.splice(index, 1);
      particlesArray.push(new Particle());
    }
  });
  requestAnimationFrame(animate);
}

// Menentukan arah badai berdasarkan posisi kursor
canvas.addEventListener('mousemove', (event) => {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  stormDirectionX = (event.clientX - centerX) / centerX;
  stormDirectionY = (event.clientY - centerY) / centerY;
});

// Menjalankan dan menghentikan efek badai secara acak
function stormCycle() {
  isStorm = true;
  setTimeout(() => {
    isStorm = false;
    setTimeout(stormCycle, Math.random() * 5000 + 2000); // jeda acak sebelum badai berikutnya
  }, Math.random() * 2000 + 1000); // durasi acak badai berlangsung
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();
stormCycle();
