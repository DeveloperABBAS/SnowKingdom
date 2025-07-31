// reviews.js

document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 600,
    grabCursor: true,
    breakpoints: {
      0: {
        slidesPerView: 1
      },
      640: {
        slidesPerView: 2
      },
      900: {
        slidesPerView: 3
      }
    }
  });
});