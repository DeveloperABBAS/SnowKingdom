document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery-grid img");
  const overlay = document.getElementById("overlay");
  const preview = document.getElementById("previewImage");
  const closeBtn = document.getElementById("closeBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentIndex = 0;

  function showImage(index) {
    preview.src = images[index].src;
    overlay.classList.add("active");
    closeBtn.style.display = "block";
    document.body.style.overflow = "hidden";
    currentIndex = index;
  }

  images.forEach((img, index) => {
    img.addEventListener("click", () => showImage(index));
  });

  function closeOverlay() {
    overlay.classList.remove("active");
    closeBtn.style.display = "none";
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeOverlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeOverlay();
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });

  // Touch swipe support
  let startX = 0;
  overlay.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  overlay.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    } else if (startX - endX > 50) {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }
  });
});