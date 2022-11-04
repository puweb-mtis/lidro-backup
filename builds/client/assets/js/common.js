const $header = document.querySelector('.header');
const $menuButton = document.querySelector('.btn-menu');
const $nav = document.querySelector('nav');

$menuButton.addEventListener('click', e => {
    $nav.classList.toggle('active');
    $header.classList.toggle('nav-open');
    
    if (e.target.tagName === 'SPAN') {
        e.target.parentElement.classList.toggle('active');
    } else {
        e.target.classList.toggle('active');
    }
});