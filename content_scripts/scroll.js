function Scroller(height) {
    this.duration = height / 16

    this.smoothScroll = function (fun, ) {
        let timer = 0;
        speed = this.duration / 100
        for (let dur = 0; dur <= this.duration; dur += speed) {
            timer = timer + 1;
            t = setTimeout(fun, timer, speed);
        }
    }
    /**
     */
    this.scrollRight = function (speed) {
        window.scrollBy(speed, 0);
    }
    /**
     */
    this.scrollDown = function (speed) {
        window.scrollBy(0, speed);
    }
    /**
     */
    this.scrollUp = function (speed) {
        window.scrollBy(0, -speed);
    }
    /**
     */
    this.scrollLeft = function (speed) {
        window.scrollBy(-speed, 0);
    }
    this.smoothScrollQuarter = function (fun) {
        let timer = 0;
        let distance = $(window).height();
        let speed = (distance / 100);
        for (let dur = 0; dur <= distance; dur += speed) {
            timer = timer + 1;
            t = setTimeout(fun, timer, speed);
        }
    }
}