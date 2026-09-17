/**
 * EMBELLISH BEAUTY SALON - GSAP & THREE.JS ANIMATIONS
 * Lightweight, GPU-friendly, reduced-motion conscious
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced) {
    initGSAPAnimations();
    initThreeJsHero();
  }
});

/* --- GSAP Scroll-Triggered Reveals --- */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero Entrance
  gsap.from('.reveal-text', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
  });

  // Section Cards Reveal
  const cards = document.querySelectorAll('.luxury-card, .service-item-card, .info-box');
  cards.forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 88%'
      },
      y: 25,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  });
}

/* --- Subtle Three.js Background Canvas --- */
function initThreeJsHero() {
  const container = document.getElementById('three-canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  let scene, camera, renderer, particles;

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Subtle Particle Geometry
    const geometry = new THREE.BufferGeometry();
    const count = 40; // Extremely low count for speed
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xC5A059, // Gold accent
      size: 0.05,
      transparent: true,
      opacity: 0.4
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    animate();
  }

  function animate() {
    requestAnimationFrame(animate);
    if (particles) {
      particles.rotation.y += 0.0008;
    }
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', () => {
    if (!camera || !renderer) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  init();
}
