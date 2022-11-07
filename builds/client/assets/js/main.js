// const mainSwiper = new Swiper('.main-swiper', {
//     speed: 1000,
//     direction: 'vertical',
//     autoHeight: true,
//     mousewheel: true,
//     allowTouchMove: false
// });
//
//
// const $header = document.querySelector('.header');
// mainSwiper.on('slideChange', e => {
//     if ( mainSwiper.activeIndex !== 0 ) {
//         $header.classList.remove('header--white');
//     } else {
//         $header.classList.add('header--white');
//     }
// });

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

const rndSwiperBottom = new Swiper('.rnd-bottom', {});

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
    if (parent !== undefined) {
        const length = swiper.slides.length;
        const $first = swiper.el.closest(parent).querySelector('.swiper-pagination__number-first');
        const $last = swiper.el.closest(parent).querySelector('.swiper-pagination__number-last');
        
        $first.innerHTML = 1;
        $last.innerHTML = length;
    } else {
        const length = swiper.slides.length;
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

window.onload = function () {
    tabInit();
    swiperPaginationNumber(introSwiper);
    swiperVideoPlaying(introSwiper);
    swiperAutoplayControl(introSwiper);
    swiperAnimatedActive(introSwiper);
    swiperEachProgressbar(techSwiper);
    swiperAnimatedActive(techSwiper);
    swiperPaginationNumber(techSwiper, '.tech');
    swiperPaginationNumber(rndSwiperTop, '.rnd');
}