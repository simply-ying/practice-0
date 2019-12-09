$(document).ready(function(){
    let swiperCardmenu = new Swiper('.swiper-container--cardmenu',{
        slidesPerView: 1,
        speed: 800,
        mousewheel: true,
    });

    let swiperCardbody = new Swiper('.card__body', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        mousewheel: true,
        touchReleaseOnEdges: true,
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });
})