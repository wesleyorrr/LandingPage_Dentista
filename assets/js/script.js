/* script.js */
let currentIndex = 0;
const images = ["img1.jpg", "img2.jpg", "img3.jpg"];
const carouselImage = document.querySelector(".carousel-image");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

function showImage(index) {
  carouselImage.src = images[index];
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
});

setInterval(() => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}, 10000);

const iconSlides = document.querySelectorAll(".icon-slide");
let iconIndex = 0;
setInterval(() => {
  iconSlides[iconIndex].classList.remove("active");
  iconIndex = (iconIndex + 1) % iconSlides.length;
  iconSlides[iconIndex].classList.add("active");
}, 10000);

function enviarParaWhatsapp() {
  const mensagem = document.getElementById("duvidaInput").value;
  const link = `https://wa.me/5538999999999?text=${encodeURIComponent(mensagem)}`;
  window.open(link, '_blank');
}
