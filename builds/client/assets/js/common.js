function swiperAnimatedActive(swiper) {
    swiper.on('slideChange', e => {
        const activeAnimatedItems = swiper.slides[swiper.activeIndex].querySelectorAll('.animate__animated:not(.fullpage__animated)');
        const prevAnimatedItems = swiper.slides[swiper.previousIndex].querySelectorAll('.animate__animated:not(.fullpage__animated)');
        
        for (let i = 0; i < activeAnimatedItems.length; i++) {
            activeAnimatedItems[i].classList.add('animate__fadeInUp')
        }
        
        for (let i = 0; i < prevAnimatedItems.length; i++) {
            prevAnimatedItems[i].classList.remove('animate__fadeInUp');
        }
    });
}

function swiperPaginationNumber(swiper, parent = undefined) {
    if ( !swiper ) return false;
    
    if (parent !== undefined) {
        const length = (swiper.loopedSlides) ? swiper.slides.length - 2 : swiper.slides.length;
        const $first = swiper.el.closest(parent).querySelector('.swiper-pagination__number-first');
        const $last = swiper.el.closest(parent).querySelector('.swiper-pagination__number-last');
        
        $first.innerHTML = 1;
        $last.innerHTML = length;
    } else {
        const length = (swiper.loopedSlides) ? swiper.slides.length - 2 : swiper.slides.length;
        const $first = swiper.el.querySelector('.swiper-pagination__number-first');
        const $last = swiper.el.querySelector('.swiper-pagination__number-last');
        
        $first.innerHTML = 1;
        $last.innerHTML = length;
    }
}

function swiperVideoPlaying(swiper) {
    swiper.on('slideChange', (e) => {
        const activeSlideVideo = swiper.slides[swiper.activeIndex].querySelector('video');
        
        if (activeSlideVideo) {
            activeSlideVideo.play();
        }
    });
    
    swiper.on('slideChangeTransitionEnd', (e) => {
        const prevSlideVideo = swiper.slides[swiper.previousIndex].querySelector('video');
        
        if (prevSlideVideo) {
            prevSlideVideo.pause();
            prevSlideVideo.currentTime = 0;
        }
    });
}

function swiperAutoplayControl(swiper) {
    const $swiperPlayButton = swiper.el.querySelector('.swiper-button--play');
    const $swiperProgress = swiper.el.querySelector('.swiper-progressbar');
    
    $swiperProgress.classList.add('active');
    
    swiper.on('slideChange', (e) => {
        if (swiper.autoplay.running) {
            $swiperProgress.classList.remove('active');
        }
    });
    
    swiper.on('slideChangeTransitionEnd', (e) => {
        if (swiper.autoplay.running) {
            $swiperProgress.classList.add('active');
        }
    });
    
    $swiperPlayButton.addEventListener('click', e => {
        $swiperPlayButton.classList.toggle('active');
        
        if ($swiperPlayButton.classList.contains('active')) {
            swiper.autoplay.start();
            $swiperProgress.classList.add('active');
        } else {
            swiper.autoplay.stop();
            $swiperProgress.classList.remove('active');
        }
    });
}

function swiperEachProgressbar(swiper) {
    swiper.on('slideChangeTransitionEnd', e => {
        const $prevProgressbar = swiper.slides[swiper.previousIndex].querySelector('.swiper-progressbar');
        const $currentProgressbar = swiper.slides[swiper.activeIndex].querySelector('.swiper-progressbar');
        
        $prevProgressbar.classList.remove('active');
        $currentProgressbar.classList.add('active');
    });
}

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

const introLocationSlider = document.querySelector('.intro-location__title-slider');
const introLocationSlides = document.querySelectorAll('.intro-location__title-slider .intro-location__title-slide');
let introLocationSwiper;

if (introLocationSlider && introLocationSlides.length > 0) {
    const slideWidth = introLocationSlides[0].clientWidth;
    const slideHeight = introLocationSlides[0].clientHeight;
    
    introLocationSlider.style.position = 'relative';
    introLocationSlider.style.width = slideWidth + 'px';
    introLocationSlider.style.height = slideHeight + 'px';
    introLocationSlider.classList.add('initialized');
    
    introLocationSwiper = new Swiper('.intro-location__swiper .swiper', {
        loop: true,
        speed: 700,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.intro-location .swiper-pagination--custom',
            type: 'bullets',
            clickable: true
        },
        navigation: {
            prevEl: '.intro-location__swiper .swiper-button--arrow-left',
            nextEl: '.intro-location__swiper .swiper-button--arrow-right'
        }
    });
    
    introLocationSwiper.on('slideChange', swiper => {
        const promise = new Promise((resolve, reject) => {
            for (let i = 0; i < introLocationSlides.length; i++) {
                introLocationSlides[i].classList.remove('active');
            }
            
            resolve();
        });
        
        promise.then(() => {
            introLocationSlides[swiper.realIndex].classList.add('active');
            const letterWrappers = introLocationSlides[swiper.realIndex].querySelectorAll('[data-letters-wrapper]');
            
            for (let i = 0; i < letterWrappers.length; i++) {
                const lettersWrapper = letterWrappers[i];
                lettersWrapper.innerHTML = lettersWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
                const letters = lettersWrapper.querySelectorAll('.letter');
                
                anime.timeline({loop: false})
                    .add({
                        targets: letters,
                        translateY: ["1.5em", 0],
                        duration: 700,
                        easing: "easeOutCubic",
                        delay: (el, i) => 50 * i
                    });
            }
        });
    });
}

function lettersAnime(target, effect = 'letter') {
    const $target = document.querySelector(target);
    if (!$target) return false;
    const letterWrappers = $target.querySelectorAll('[data-letters-wrapper]');
    
    switch (effect) {
        case 'letter':
            for (let i = 0; i < letterWrappers.length; i++) {
                const lettersWrapper = letterWrappers[i];
                lettersWrapper.innerHTML = lettersWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
                
                anime.timeline({loop: false})
                    .add({
                        targets: '[data-letters-wrapper] .letter',
                        translateY: ["1.5em", 0],
                        duration: 700,
                        easing: "easeOutCubic",
                        delay: (el, i) => 200 * i
                    });
            }
            break;
        case 'word':
            for (let i = 0; i < letterWrappers.length; i++) {
                const lettersWrapper = letterWrappers[i];
                const letterArray = lettersWrapper.textContent.split(/\s/g);
                
                lettersWrapper.innerHTML = '';
                
                for (let j = 0; j < letterArray.length; j++) {
                    lettersWrapper.innerHTML += `<span class="letter">${letterArray[j]}</span>&nbsp;`;
                }
                
                anime.timeline({loop: false})
                    .add({
                        targets: '[data-letters-wrapper] .letter',
                        translateY: ["1.5em", 0],
                        duration: 1000,
                        easing: "easeOutCubic",
                        delay: (el, i) => 200 * i
                    });
            }
            break;
        default:
            break;
    }
}

window.onload = e => {
    AOS.init();
    swiperPaginationNumber(introLocationSwiper, '.intro-location');
    lettersAnime('.page-title--normal', 'word');
}