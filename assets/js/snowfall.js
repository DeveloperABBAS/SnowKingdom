// snowfall.js

document.addEventListener('DOMContentLoaded', () => {
  const snowfall = document.querySelector('.snow-fall');

  
function createSnowFlake() {
  const snowFlake = document.createElement('div');
  snowFlake.classList.add('snowFlake');
  snowFlake.textContent = '❄';
  const isMobile = window.innerWidth <= 900;
  const minSize = isMobile ? 6 : 10;
  const maxSize = isMobile ? 10 : 20;
  snowFlake.style.left = `${Math.random() * 100}vw`;
  snowFlake.style.fontSize = `${Math.random() * (maxSize - minSize) + minSize}px`;
  snowFlake.style.opacity = Math.random();
  snowFlake.style.animationDuration = `${Math.random() * 3 + 2}s`;
  snowfall.appendChild(snowFlake);
  setTimeout(() => snowFlake.remove(), 5000);
}


  setInterval(createSnowFlake, 50);
});