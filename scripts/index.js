
const slides = document.getElementById('slides');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function showSlide(index) {
  currentIndex = index;
  const offset = -index * 100;
  slides.style.transform = `translateX(${offset}%)`;
  updateDots();
}

function updateDots() {
  dots.forEach((dot, idx) => {
    dot.classList.toggle('bg-[#994200]', idx === currentIndex);
    dot.classList.toggle('bg-gray-400', idx !== currentIndex);
  });
}

document.getElementById('prev').addEventListener('click', () => {
  if (currentIndex > 0) {
    showSlide(currentIndex - 1);
  } else {
    showSlide(dots.length - 1);
  }
});

document.getElementById('next').addEventListener('click', () => {
  if (currentIndex < dots.length - 1) {
    showSlide(currentIndex + 1);
  } else {
    showSlide(0);
  }
});

dots.forEach((dot, idx) => {
  dot.addEventListener('click', () => showSlide(idx));
});

showSlide(0);



window.addEventListener('scroll', ()=> {
  const topBar = document.querySelector('.top-bar');
  const navBar = document.querySelector('.nav-bar');
  if (window.scrollY > 50) {
    topBar.classList.remove('bg-[#994200]');
    topBar.classList.add('bg-none');
    navBar.classList.add('shadow-xl');
  } else {
    topBar.classList.remove('bg-none');
    topBar.classList.add('bg-[#994200]');
    navBar.classList.remove('shadow-xl');
  }
});