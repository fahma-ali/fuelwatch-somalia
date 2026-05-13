const burgerBtn = document.getElementById("burgerBtn");
const navLinks = document.querySelector(".nav-links");

burgerBtn.addEventListener("click", function () {
  navLinks.classList.toggle("active");

  if (navLinks.classList.contains("active")) {
    burgerBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  } else {
    burgerBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
  }
});