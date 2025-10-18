const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');
const yearPlaceholder = document.getElementById('year');
const sliderTrack = document.querySelector('.slider__track');
const prevButton = document.querySelector('.slider__control--prev');
const nextButton = document.querySelector('.slider__control--next');
let currentSlide = 0;

if (yearPlaceholder) {
  yearPlaceholder.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    navMenu.classList.toggle('is-visible');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-visible');
    });
  });
}

if (sliderTrack && prevButton && nextButton) {
  const slides = Array.from(sliderTrack.children);

  const updateSlider = () => {
    const offset = currentSlide * sliderTrack.clientWidth;
    sliderTrack.scrollTo({ left: offset, behavior: 'smooth' });
  };

  const goToSlide = (index) => {
    const totalSlides = slides.length;
    currentSlide = (index + totalSlides) % totalSlides;
    updateSlider();
  };

  prevButton.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
  });

  nextButton.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
  });

  window.addEventListener('resize', updateSlider);

  setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 8000);
}
