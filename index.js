const slider = document.querySelector('.container .list_slide');
const items = document.querySelectorAll('.container .list_slide .slide');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const dots = document.querySelectorAll('.container .dots li');
const spans = document.querySelectorAll('.container .list_slide .slide span');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function () {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
};
prev.onclick = function () {
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
};
let refreshInterval = setInterval(() => {
    next.click();
}, 3000);
function reloadSlider() {
    // initialize
    const last_active_dot = document.querySelector(
        '.container .dots li.active'
    );
    const lastSpan = document.querySelector(
        '.container .list_slide .slide span.active'
    );

    slider.style.left = -items[active].offsetLeft + 'px';

    // spans active
    lastSpan.classList.remove('active');
    spans[active].classList.add('active');

    // dots active
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    // reset interval
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 3000);
}

dots.forEach((li, key) => {
    li.addEventListener('click', () => {
        active = key;
        reloadSlider();
    });
});
window.onresize = function (event) {
    reloadSlider();
};

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        let last_active_dot = document.querySelector(
            '.container .dots li.active'
        );
        last_active_dot.classList.remove('active');
        dot.classList.add('active');
        active = index;
        clearInterval(refreshInterval);
        reloadSlider();
    });
});
