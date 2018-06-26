var pos = {
    distance: 200,
    speed: 2,
};

function smoothScroll(fun) {
    timer = 0
    for (var dur = 0; dur < pos.distance; dur += pos.speed) {
        timer = timer + 1
        t = setTimeout(fun, timer)
    }


}

function scrollRight() {
    window.scrollBy(pos.speed, 0);
}

function scrollDown() {
    window.scrollBy(0, pos.speed);
}

function scrollUp() {
    window.scrollBy(0, -pos.speed);
}

function scrollLeft() {
    window.scrollBy(-pos.speed, 0);
}

