let pos = {
    distance: 200,
    speed: 2,
};
/**
 * @param  {function} fun
 * @param  {number} ratio
 */
function smoothScroll(fun, ratio) {
    timer = 0;
    for (let dur = 0; dur < ratio * pos.distance; dur +=pos.speed) {
        timer = timer + 1/ratio;
        t = setTimeout(fun, timer);
    }
}
/**
 */
function scrollRight() {
    window.scrollBy(pos.speed, 0);
}
/**
 */
function scrollDown() {
    window.scrollBy(0, pos.speed);
}
/**
 */
function scrollUp() {
    window.scrollBy(0, -pos.speed);
}
/**
 */
function scrollLeft() {
    window.scrollBy(-pos.speed, 0);
}