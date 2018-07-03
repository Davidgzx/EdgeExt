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
    let speed=ratio*pos.speed;//
    for (let dur = 0; dur < ratio * pos.distance; dur +=speed) {
        timer = timer + 1;
        t = setTimeout(fun, timer,speed);
    }
}
/**
 */
function scrollRight(speed) {
    window.scrollBy(speed, 0);
}
/**
 */
function scrollDown(speed) {
    window.scrollBy(0, speed);
}
/**
 */
function scrollUp(speed) {
    window.scrollBy(0, -speed);
}
/**
 */
function scrollLeft(speed) {
    window.scrollBy(-speed, 0);
}