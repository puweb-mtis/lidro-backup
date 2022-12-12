
const $cursor = document.querySelector('.cursor');
const checkClickable = (target) => {
    const checkNameArray = ['BUTTON', 'A', 'INPUT', 'SELECT'];
    let res = false;
    
    for (const checkName of checkNameArray) {
        if ( target.tagName === checkName || target.closest(`${checkName}`) ) {
            res = true;
        }
    }
    
    return res;
}

document.addEventListener('mousemove', e => {
    $cursor.style.transform = 'translate3d('+e.clientX+'px, '+e.clientY+'px, 0)';
    
    if ( checkClickable(e.target) ) {
        $cursor.classList.add('on');
    } else {
        $cursor.classList.remove('on');
    }
});

const pageOptions = {
    anchors: ['IL510', 'AL410', 'IL410', 'IL110CameraPlus', 'IL110', 'AL110'],
    afterLoad: function (anchorLink, index) {
        const realIndex = index - 1;
        const hash = window.location.hash === '' ? '#IL510' : window.location.hash;
        
        $('.prd-section-pagination-bullet').eq(realIndex).addClass('active');
        
        const $depth1Select = document.querySelector('.nav-list.depth-1').closest('.nav-item').querySelector('.nav-select');
        const $depth2Link = document.querySelector('.nav-list.depth-2 [href="' + hash + '"]');
        const $depth2List = $depth2Link.closest('.nav-list');
        const depth2ListName = $depth2List.getAttribute('data-nav-depth1')
        const $depth2Select = $depth2Link.closest('.nav-item').querySelector('.nav-select');
        
        if ( hash === '#IL110CameraPlus' ) {
            $depth2Select.innerText = 'IL110 Camera Plus';
        } else {
            $depth2Select.innerText = hash.replace('#', '');
        }
        
        switch (depth2ListName) {
            case 'rotation':
                $depth1Select.innerText = 'Rotation LiDAR';
                break;
            case 'spad':
                $depth1Select.innerText = 'SPAD LiDAR';
                break;
            case 'flash':
                $depth1Select.innerText = 'FLASH LiDAR';
                break;
        }
        
        document.querySelectorAll(`[data-nav-depth1]`).forEach($target => { $target.classList.add('d-none'); });
        document.querySelector('[data-nav-depth1="'+ depth2ListName +'"]').classList.remove('d-none');
    },
    onLeave: function (index, nextIndex, direction) {
        const realIndex = nextIndex - 1;
        
        $('.prd-section-pagination-bullet').eq(realIndex).addClass('active').siblings().removeClass('active');
    },
}

$(document).ready(function () {
    if ($(window).outerWidth() < 1025) {
        if ($('html').hasClass('fp-enabled')) {
            $.fn.fullpage.destroy('all');
        }
    } else {
        $('.fullpage').fullpage(pageOptions);
    }
});

var resizeTimer;
$(window).on('resize', function (e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function (e) {
        const width = $(this).outerWidth();
        
        if (width < 1025) {
            $.fn.fullpage.destroy('all');
        } else {
            $('.fullpage').fullpage(pageOptions);
        }
    }, 100);
});
