const detectMobileBrowser = (a) => {
    return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)));
}

const isMobile = detectMobileBrowser(navigator.userAgent || navigator.vendor || window.opera);

console.log(isMobile);

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
    if (!swiper) return false;
    
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
const $prdHeader = document.querySelector('.prd-header');
const $nav = document.querySelector('.nav');
const $navBg = document.querySelector('.nav-bg');
const $menuCloseButton = $nav.querySelector('.btn-menu');
let $menuOpenButton, $headerNavSelects, $prdHeaderNavSelects;

if ($header) {
    $menuOpenButton = $header.querySelector('.btn-menu');
    $headerNavSelects = $header.querySelectorAll('.nav-select');
} else if ($prdHeader) {
    $menuOpenButton = $prdHeader.querySelector('.btn-menu');
    $prdHeaderNavSelects = $prdHeader.querySelectorAll('.nav-select');
}

if ($headerNavSelects) {
    $headerNavSelects.forEach(($select, index, array) => {
        $select.addEventListener('click', e => {
            $select.classList.toggle('active');
            
            for (let i = 0; i < array.length; i++) {
                if (i !== index) {
                    array[i].classList.remove('active');
                }
            }
        });
    });
}

if ($prdHeaderNavSelects) {
    const prdHash = window.location.hash === '' ? '#IL510' : window.location.hash;
    const $currDepth2Link = document.querySelector(`.nav-list.depth-2 [href="${prdHash}"]`);
    const $currNav1Select = document.querySelector('.nav-list.depth-1').closest('.nav-item').querySelector('.nav-select');
    const $currNav2Select = document.querySelector('.nav-list.depth-2').closest('.nav-item').querySelector('.nav-select');
    const currentNavDepth1 = $currDepth2Link.closest('.nav-list').getAttribute('data-nav-depth1');
    const $prdNavDepth1Links = document.querySelectorAll('.prd-header .nav-list.depth-1 .link');
    const $prdNavDepth2Links = document.querySelectorAll('.prd-header .nav-list.depth-2 .link');
    
    
    switch (currentNavDepth1) {
        case 'rotation':
            $currNav1Select.innerText = 'Rotation LiDAR';
            break;
        case 'spad':
            $currNav1Select.innerText = 'SPAD LiDAR';
            break;
        case 'flash':
            $currNav1Select.innerText = 'FLASH LiDAR';
            break;
    }
    
    $currNav2Select.innerText = prdHash.replace('#', '');
    
    document.querySelectorAll(`[data-nav-depth1]`).forEach($target => { $target.classList.add('d-none'); });
    document.querySelector(`[data-nav-depth1="${currentNavDepth1}"]`).classList.remove('d-none');
    
    
    $prdHeaderNavSelects.forEach(($select, index, array) => {
        $select.addEventListener('click', e => {
            $select.classList.toggle('active');
            
            for (let i = 0; i < array.length; i++) {
                if (i !== index) {
                    array[i].classList.remove('active');
                }
            }
        });
    });
    
    $prdNavDepth1Links.forEach($link => {
        $link.addEventListener('click', e => {
            const $select = $link.closest('.nav-item').querySelector('.nav-select');
            const depth1Name = $link.innerText;
            const depth1Type = $link.getAttribute('data-nav-name');
            
            $select.innerText = depth1Name;
            document.querySelectorAll(`[data-nav-depth1]`).forEach($target => {
                $target.classList.add('d-none');
            });
            document.querySelector(`[data-nav-depth1="${depth1Type}"]`).classList.remove('d-none');
            
            $select.classList.remove('active');
        });
    });
    
    $prdNavDepth2Links.forEach($link => {
        $link.addEventListener('click', e => {
            const $select = $link.closest('.nav-item').querySelector('.nav-select');
            
            $select.innerText = $link.innerText;
            $select.classList.remove('active');
        });
    });
}

if ($header) {
    window.addEventListener('scroll', e => {
        if (window.scrollY > 0) {
            $header.classList.add('scrolled');
        } else {
            $header.classList.remove('scrolled');
        }
    });
}

$menuOpenButton.addEventListener('click', e => {
    document.querySelector('html').classList.add('nav-open');
    $nav.classList.add('active');
    
    if ($header) {
        $header.classList.add('nav-open');
    } else {
        $prdHeader.classList.add('nav-open');
    }
});

$menuCloseButton.addEventListener('click', e => {
    document.querySelector('html').classList.remove('nav-open');
    $nav.classList.remove('active');
    
    if ($header) {
        $header.classList.remove('nav-open');
    } else {
        $prdHeader.classList.remove('nav-open');
    }
});

/* 네비게이션 배경 클릭시 닫기 */
$navBg.addEventListener('click', e => {
    $header.classList.remove('nav-open');
    $nav.classList.remove('active');
});

const introLocationSlider = document.querySelector('.intro-location__title-slider');
const introLocationSlides = document.querySelectorAll('.intro-location__title-slider .intro-location__title-slide');
let introLocationSwiper;

if (introLocationSlider && introLocationSlides.length > 0) {
    let slideWidth = introLocationSlides[0].clientWidth;
    let slideHeight = introLocationSlides[0].clientHeight;
    
    introLocationSlider.style.position = 'relative';
    introLocationSlider.style.width = slideWidth + 'px';
    introLocationSlider.style.height = slideHeight + 'px';
    introLocationSlider.classList.add('initialized');
    
    window.addEventListener('resize', e => {
        slideWidth = introLocationSlides[0].clientWidth;
        slideHeight = introLocationSlides[0].clientHeight;
        
        introLocationSlider.style.position = 'relative';
        introLocationSlider.style.width = slideWidth + 'px';
        introLocationSlider.style.height = slideHeight + 'px';
    });
    
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
    
    document.querySelector('.intro-location .swiper-button--prev').addEventListener('click', e => {
        introLocationSwiper.slidePrev();
    });
    
    document.querySelector('.intro-location .swiper-button--next').addEventListener('click', e => {
        introLocationSwiper.slideNext();
    });
    
    introLocationSwiper.on('slideChange', swiper => {
        const $slides = swiper.slides;
        const letterWrappers = introLocationSlides[swiper.realIndex].querySelectorAll('[data-letters-wrapper]');
        
        const promise = new Promise((resolve, reject) => {
            for (let i = 0; i < introLocationSlides.length; i++) {
                introLocationSlides[i].classList.remove('active');
            }
            
            resolve();
        });
        
        promise.then(() => {
            introLocationSlides[swiper.realIndex].classList.add('active');
            
            for (let i = 0; i < letterWrappers.length; i++) {
                const lettersWrapper = letterWrappers[i];
                const letterArray = lettersWrapper.textContent.split(/\s/g);
                
                lettersWrapper.innerHTML = '';
                
                for (let j = 0; j < letterArray.length; j++) {
                    lettersWrapper.innerHTML += `<span class="letter">${letterArray[j]}</span>&nbsp;`;
                }
                
                anime.timeline({loop: false}).add({
                    targets: lettersWrapper.querySelectorAll('.letter'),
                    translateY: ["1.5em", 0],
                    duration: 1000,
                    easing: "easeOutCubic",
                    delay: (el, i) => 200 * i
                });
            }
        });
    });
}

function lettersAnime(target, effect = 'letter') {
    const $target = document.querySelectorAll(target);
    if (!$target) return false;
    
    for (let i = 0; i < $target.length; i++) {
        const letterWrappers = $target[i].querySelectorAll('[data-letters-wrapper]');
        
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
}

const $topButton = document.querySelector('.btn-top');
if ($topButton) {
    $topButton.addEventListener('click', e => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
    
    window.addEventListener('scroll', e => {
        const footerHeight = document.querySelector('.footer').clientHeight;
        const endPoint = document.body.scrollHeight - footerHeight;
        const middlePoint = (document.body.scrollHeight / 2);
        const scrollBottom = window.scrollY + window.innerHeight;
        const scrollMiddle = window.scrollY + (window.innerHeight / 2);
        
        if (scrollMiddle > middlePoint) {
            $topButton.classList.add('active');
        } else {
            $topButton.classList.remove('active');
        }
        
        if (scrollBottom > endPoint) {
            $topButton.classList.add('bottom');
            $topButton.style.bottom = footerHeight + 30 + 'px';
        } else {
            $topButton.classList.remove('bottom');
            $topButton.style.bottom = null;
        }
    });
}

let prdViewSwiper;
if (document.querySelector('.prd-swiper .swiper')) {
    prdViewSwiper = new Swiper('.prd-swiper .swiper', {
        loop: true,
        pagination: {
            el: '.prd-swiper .swiper-pagination--custom',
            clickable: true
        },
        navigation: {
            prevEl: '.prd-swiper .swiper-button--prev',
            nextEl: '.prd-swiper .swiper-button--next'
        }
    });
    
    document.querySelector('.prd-swiper .swiper-button--arrow-left').addEventListener('click', e => {
        prdViewSwiper.slidePrev();
    });
    
    document.querySelector('.prd-swiper .swiper-button--arrow-right').addEventListener('click', e => {
        prdViewSwiper.slideNext();
    });
}

const $droidSwipers = document.querySelectorAll('.droid-swiper');
let droidSwipers = [];

if ($droidSwipers.length > 0) {
    for (let i = 0; i < $droidSwipers.length; i++) {
        const $swiperBox = $droidSwipers[i];
        const $swiper = $swiperBox.querySelector('.swiper');
        
        droidSwipers[i] = new Swiper($swiper, {
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            pagination: {
                el: $swiperBox.querySelector('.swiper-pagination--custom'),
                clickable: true
            },
            navigation: {
                prevEl: $swiperBox.querySelector('.swiper-button--prev'),
                nextEl: $swiperBox.querySelector('.swiper-button--next')
            }
        });
        
        swiperPaginationNumber(droidSwipers[i], '.droid-swiper');
    }
}

const recruitIndex = document.querySelector('.recruit-index');

if (recruitIndex) {
    const recruitIndexSwiper1 = new Swiper('.index-swiper--1 .swiper', {
        autoplay: {
            delay: 4000
        },
        speed: 500,
        navigation: {
            prevEl: '.index-swiper--1 .swiper-button--prev',
            nextEl: '.index-swiper--1 .swiper-button--next'
        }
    });
    
    swiperEachProgressbar(recruitIndexSwiper1);
    
    const $swiper1Players = document.querySelectorAll('.index-swiper--1 .player');
    const $swiper1PlayButtons = document.querySelectorAll('.index-swiper--1 .swiper-button--play');
    const $swiper1PauseButtons = document.querySelectorAll('.index-swiper--1 .swiper-button--pause');
    
    for (let i = 0; i < $swiper1PlayButtons.length; i++) {
        $swiper1PlayButtons[i].addEventListener('click', e => {
            recruitIndexSwiper1.autoplay.start();
            
            for (let j = 0; j < $swiper1Players.length; j++) {
                $swiper1Players[i].classList.add('active');
            }
        });
        
        $swiper1PauseButtons[i].addEventListener('click', e => {
            recruitIndexSwiper1.autoplay.stop();
            
            for (let j = 0; j < $swiper1Players.length; j++) {
                $swiper1Players[i].classList.remove('active');
            }
        });
    }
    
    const recruitIndexSwiper2 = new Swiper('.index-swiper--2 .swiper', {
        autoplay: {
            delay: 4500
        },
        speed: 500,
        navigation: {
            prevEl: '.index-swiper--2 .swiper-button--prev',
            nextEl: '.index-swiper--2 .swiper-button--next'
        }
    });
    
    swiperEachProgressbar(recruitIndexSwiper2);
    
    const $swiper2Players = document.querySelectorAll('.index-swiper--2 .player');
    const $swiper2PlayButtons = document.querySelectorAll('.index-swiper--2 .swiper-button--play');
    const $swiper2PauseButtons = document.querySelectorAll('.index-swiper--2 .swiper-button--pause');
    
    for (let i = 0; i < $swiper2PlayButtons.length; i++) {
        $swiper2PlayButtons[i].addEventListener('click', e => {
            recruitIndexSwiper1.autoplay.start();
            
            for (let j = 0; j < $swiper2Players.length; j++) {
                $swiper2Players[i].classList.add('active');
            }
        });
        
        $swiper2PauseButtons[i].addEventListener('click', e => {
            recruitIndexSwiper1.autoplay.stop();
            
            for (let j = 0; j < $swiper2Players.length; j++) {
                $swiper2Players[i].classList.remove('active');
            }
        });
    }
    
    const recruitIndexSwiper3 = new Swiper('.index-swiper--3 .swiper', {
        autoplay: {
            delay: 5000
        },
        speed: 500,
        navigation: {
            prevEl: '.index-swiper--3 .swiper-button--prev',
            nextEl: '.index-swiper--3 .swiper-button--next'
        }
    });
    
    swiperEachProgressbar(recruitIndexSwiper3);
    
    const $swiper3Players = document.querySelectorAll('.index-swiper--3 .player');
    const $swiper3PlayButtons = document.querySelectorAll('.index-swiper--3 .swiper-button--play');
    const $swiper3PauseButtons = document.querySelectorAll('.index-swiper--3 .swiper-button--pause');
    
    for (let i = 0; i < $swiper3PlayButtons.length; i++) {
        $swiper3PlayButtons[i].addEventListener('click', e => {
            recruitIndexSwiper1.autoplay.start();
            
            for (let j = 0; j < $swiper3Players.length; j++) {
                $swiper3Players[i].classList.add('active');
            }
        });
        
        $swiper3PauseButtons[i].addEventListener('click', e => {
            recruitIndexSwiper1.autoplay.stop();
            
            for (let j = 0; j < $swiper3Players.length; j++) {
                $swiper3Players[i].classList.remove('active');
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', e => {
    if (!$header) return false;
    if (!document.querySelector('.header').classList.contains('header--main')) {
        const currentPathname = window.location.pathname;
        const currentDepth1 = currentPathname.split('/')[1];
        const currentDepth2 = currentPathname.split('/')[2];
        const currentNavDepth1Link = document.querySelector(`.nav .nav-list.depth-1 > .nav-list__item > .nav-list__item__inner > a[href*="${currentDepth1}"]`);
        const currentNavDepth2 = currentNavDepth1Link.nextElementSibling;
        const currentNavDepth2Link = currentNavDepth2.querySelector(`a[href*="${currentDepth1}/${currentDepth2.substring(0, 5)}"]`);
        const headerNavDepth1 = document.querySelector('.header .nav-box .nav-list.depth-1');
        const headerNavDepth1Select = headerNavDepth1.closest('.nav-item').querySelector('.nav-select');
        // const headerNavDepth1Link = headerNavDepth1.querySelectorAll('.nav-list__item a');
        const headerNavDepth2 = document.querySelector('.header .nav-box .nav-list.depth-2');
        const headerNavDepth2Select = headerNavDepth2.closest('.nav-item').querySelector('.nav-select');
        
        headerNavDepth2.innerHTML = currentNavDepth2.innerHTML;
        headerNavDepth1Select.innerHTML = currentNavDepth1Link.innerHTML;
        headerNavDepth2Select.innerHTML = currentNavDepth2Link.innerHTML;
        
        const headerNavCurrentDepth1Link = headerNavDepth1.querySelector(`a[href*="${currentDepth1}"]`);
        const headerNavCurrentDepth2Link = headerNavDepth2.querySelector(`a[href*="${currentDepth1}/${currentDepth2.substring(0, 5)}"]`);
        headerNavCurrentDepth1Link.classList.add('active');
        headerNavCurrentDepth2Link.classList.add('active');
    }
    
    const headerNavDepth1Links = document.querySelectorAll('.nav-list.depth-1 > .nav-list__item > .nav-list__item__inner > a');
    
    headerNavDepth1Links.forEach(link => {
        link.addEventListener('click', e => {
            if (window.innerWidth < 1025) {
                e.preventDefault();
                e.stopPropagation();
                
                for (let i = 0; i < headerNavDepth1Links.length; i++) {
                    headerNavDepth1Links[i].closest('.nav-list__item').classList.remove('active');
                }
                
                link.closest('.nav-list__item').classList.toggle('active');
            }
        });
    });
});

window.onload = e => {
    AOS.init();
    swiperPaginationNumber(introLocationSwiper, '.intro-location');
    swiperPaginationNumber(prdViewSwiper, '.prd-swiper');
    lettersAnime('.page-title--normal', 'word');
    lettersAnime('.page-title--line', 'word');
    lettersAnime('.page-title--banner');
}