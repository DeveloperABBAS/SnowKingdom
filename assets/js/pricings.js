document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".pricing-swiper", {
    slidesPerView: 3,           // show 3 on desktop
    spaceBetween: 20,           // gap between cards
    centeredSlides: true,       // keep the active card perfectly centered
    loop: true,                 // infinite loop
    autoplay: {
      delay: 2500,              // auto scroll delay
      disableOnInteraction: false, // keep autoplay after manual swipe
    },
    speed: 700,                 // smooth transition speed
    grabCursor: true,           // cursor becomes grab hand
    breakpoints: {
      0: { 
        slidesPerView: 1,       // 1 card on mobile
        centeredSlides: true 
      },
      640: { 
        slidesPerView: 2,       // 2 cards on tablet
        centeredSlides: true 
      },
      900: { 
        slidesPerView: 3,       // 3 cards on desktop
        centeredSlides: true 
      }
    }
  });
});
