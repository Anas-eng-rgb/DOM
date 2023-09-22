const nav__bar = document.querySelector('.nav__bar');
const nav__links__list = document.querySelector('.nav__links__list');

nav__bar.addEventListener('click' , () => {
    nav__links__list.classList.toggle('toggle__menu__bar');
});



