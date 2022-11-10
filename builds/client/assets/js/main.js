$(document).ready(function () {
    $('#fullpage').fullpage({
        menu: '#fullpage_menu',
        anchors: ['intro', 'technology', 'promotion', 'rnd', 'footer'],
        onLeave: function (index, nextIndex, direction) {
            const $animateItems = $(this).find('.animate__animated.fullpage__animated');
    
            $animateItems.removeClass('animate__fadeInUp');
            
            if (nextIndex !== 1) {
                $('.header').removeClass('header--white');
            } else {
                $('.header').addClass('header--white');
            }
        },
        afterLoad: function (anchorLink, index) {
            const $animateItems = $(this).find('.animate__animated.fullpage__animated');
            $animateItems.addClass('animate__fadeInUp');
        }
    });
});

const introSwiper = new Swiper('.intro-swiper', {
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    speed: 1000,
    spaceBetween: 0,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false
    },
    navigation: {
        prevEl: '.intro-swiper .swiper-button--prev',
        nextEl: '.intro-swiper .swiper-button--next',
    },
    pagination: {
        el: '.intro-swiper .swiper-pagination--custom',
        type: 'bullets',
        clickable: true
    }
});

introSwiper.on('slideChange', swiper => {
    const $slides = swiper.slides;
    const activeIndex = swiper.activeIndex;
    
    const promise = new Promise((resolve, reject) => {
        for (let i = 0; i < $slides.length; i++) {
            const $title = $slides[i].querySelector('.intro-swiper__title');
            $title.classList.remove('active');
        }
        
        resolve();
    });
    
    promise.then(() => {
        const letterWrappers = $slides[activeIndex].querySelectorAll('[data-letters-wrapper]');
    
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
    
    /*
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
    */
});

/* TECH */
const techSwiper = new Swiper('.tech-swiper', {
    autoplay: {
        delay: 4000,
        disableOnInteraction: false
    },
    speed: 500,
    slidesPerView: 1,
    spaceBetween: 100,
    navigation: {
        prevEl: '.tech .swiper-button--arrow-left',
        nextEl: '.tech .swiper-button--arrow-right',
    },
    pagination: {
        el: '.tech .swiper-pagination--custom',
        clickable: true
    }
});

document.querySelector('.tech .swiper-button--prev').addEventListener('click', e => {
    techSwiper.slidePrev();
});

document.querySelector('.tech .swiper-button--next').addEventListener('click', e => {
    techSwiper.slideNext();
});

/* PROMO */
const promoSwipers = [];
const promoSwiperElements = document.querySelectorAll('.promo .swiper');

for (let i = 0; i < promoSwiperElements.length; i++) {
    promoSwipers[i] = new Swiper(promoSwiperElements[i], {
        slidesPerView: 4,
        spaceBetween: 60,
        pagination: {
            el: promoSwiperElements[i].querySelector('.swiper-pagination--custom'),
            clickable: true
        },
        navigation: {
            prevEl: promoSwiperElements[i].querySelector('.swiper-button--prev'),
            nextEl: promoSwiperElements[i].querySelector('.swiper-button--next')
        }
    });
    
    swiperPaginationNumber(promoSwipers[i]);
}

/* R&D */
const rndTitleSlider = document.querySelector('.rnd-title-slider')
const rndTitleSlides = document.querySelectorAll('.rnd-title-slider .rnd-title-slide');
const slideWidth = rndTitleSlides[0].clientWidth;
const slideHeight = rndTitleSlides[0].clientHeight;
const rndSwiperTop = new Swiper('.rnd-top', {
    allowTouchMove: false,
    pagination: {
        el: '.rnd-title-box .swiper-pagination--bullet .swiper-pagination--custom',
        clickable: true
    },
    navigation: {
        prevEl: '.rnd-title-box .swiper-pagination--bullet .swiper-button--prev',
        nextEl: '.rnd-title-box .swiper-pagination--bullet .swiper-button--next',
    }
});

rndTitleSlider.style.position = 'relative';
rndTitleSlider.style.width = slideWidth + 'px';
rndTitleSlider.style.height = slideHeight + 'px';
rndTitleSlider.classList.add('initialized');

rndSwiperTop.on('slideChange', swiper => {
    rndTitleSlides[swiper.activeIndex].classList.add('active');
    rndTitleSlides[swiper.previousIndex].classList.remove('active');
});

const rndSwiperBottom = new Swiper('.rnd-bottom', {
    allowTouchMove: false
});

rndSwiperTop.on('slideNextTransitionEnd', swiper => {
    rndSwiperBottom.slideNext();
});

rndSwiperTop.on('slidePrevTransitionEnd', swiper => {
    rndSwiperBottom.slidePrev();
});

// rndSwiperTop.controller.control = rndSwiperBottom;
// rndSwiperBottom.controller.control = rndSwiperTop;

document.querySelector('.rnd-swiper .swiper-button--arrow-left').addEventListener('click', e => {
    rndSwiperTop.slidePrev();
});

document.querySelector('.rnd-swiper .swiper-button--arrow-right').addEventListener('click', e => {
    rndSwiperTop.slideNext();
});

function tabInit() {
    const tabs = document.querySelectorAll('.tab');
    
    for (let i = 0; i < tabs.length; i++) {
        const tabItems = tabs[i].querySelectorAll('.tab-item');
        const tabContents = tabs[i].querySelectorAll('.tab-content');
        
        tabItems.forEach((tabItem, index) => {
            tabItem.addEventListener('click', e => {
                for (let j = 0; j < tabContents.length; j++) {
                    tabItems[j].classList.remove('active');
                    tabContents[j].classList.remove('active');
                }
                
                tabItem.classList.add('active');
                tabContents[index].classList.add('active');
            });
        });
    }
}

window.onload = function () {
    tabInit();
    swiperPaginationNumber(introSwiper);
    swiperVideoPlaying(introSwiper);
    swiperAutoplayControl(introSwiper);
    swiperEachProgressbar(techSwiper);
    swiperAnimatedActive(techSwiper);
    swiperPaginationNumber(techSwiper, '.tech');
    swiperPaginationNumber(rndSwiperTop, '.rnd');
}